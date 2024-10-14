import { useState } from 'react';
import { Box, Button, LinearProgress } from "@mui/material";
import { useSnackbar } from 'notistack';
import { emailVerification, getCount, setFireBaseDoc, setUserProfile } from '../../services/firebase/Calls';
import { auth } from '../../services/firebase/Calls';
import dayjs from 'dayjs';
import { getToken } from 'firebase/app-check';
import { appCheck } from '../../services/firebase/AppCheck';
import { callVerifyRecaptcha } from '../../services/firebase/httpsCallables/VerifyRecaptcha';
import { AvailableType } from '../../utils/constants/Types';

interface Props {
    setSuccess: (value: boolean) => void,
    success: boolean,
    saveInfo: boolean,
    uid: string;
    day: any;
    time: any;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    selections: AvailableType[];
    costData: {
        cost: number,
        fee: number,
        totalCost: number,
    };
}

export default function Submit({
    setSuccess,
    success,
    saveInfo,
    uid,
    day,
    time,
    firstName,
    lastName,
    email,
    phoneNumber,
    selections,
    costData
}: Props) {
    const { enqueueSnackbar } = useSnackbar();
    const [submitting, setSubmitting] = useState<boolean>(false);

    const totalQuantity = selections.reduce((a, b) => a + b.quantity, 0);

    // DTG Stuff
    const selectedTime = dayjs(time);
    const formattedDay = dayjs(day).format('YYYY-MM-DD');
    const formattedTime = selectedTime.format('HH:mm:ss');
    const minTime = selectedTime.set('hour', 5).set('minute', 0).set('second', 0);
    const maxTime = selectedTime.set('hour', 10).set('minute', 0).set('second', 0);

    const validateProps = () => {
        const errors = [
            { condition: !firstName.trim(), message: 'Please add a First name' },
            { condition: !email.trim(), message: 'Email is missing, please add a valid email' },
            { condition: !phoneNumber.trim(), message: 'An invalid, incomplete, or no phone number was added' },
            { condition: totalQuantity <= 0, message: 'Please select a quantity over 0' },
            { condition: selectedTime.isBefore(minTime) || selectedTime.isAfter(maxTime), message: 'Selected time is outside the valid range of 4 AM to 10 AM.' }
        ];

        for (const error of errors) {
            if (error.condition) {
                enqueueSnackbar(error.message, { variant: 'error' });
                return;
            }
        }

        handleOrder();
    };

    const saveUserProfile = async () => {
        if (saveInfo) {
            const userProfileData = {
                collectionName: 'customers',
                docId: uid,
                props: { uid, phoneNumber, firstName, lastName, email }
            };
            await setUserProfile(userProfileData);
            await setFireBaseDoc(userProfileData);
        }
    };

    const handleOrder = async () => {
        const user = auth.currentUser;

        if (user?.emailVerified) {
            setSubmitting(true);
            try {
                const token = (await getToken(appCheck, true)).token;
                if (!token) {
                    enqueueSnackbar('Failed to validate reCAPTCHA', { variant: 'error' });
                    setSubmitting(false);
                    return;
                }

                const responseSuccess = await callVerifyRecaptcha(token);
                if (!responseSuccess) {
                    enqueueSnackbar('reCAPTCHA validation failed', { variant: 'error' });
                    setSubmitting(false);
                    return;
                }

                await saveUserProfile();

                const count = await getCount('orders');
                await setFireBaseDoc({
                    props: {
                        orderStatus: 'Pending',
                        orderedByUid: uid,
                        firstName,
                        lastName,
                        phoneNumber,
                        orderId: `WO-${(count + 1).toString().padStart(4, '0')}`,
                        day: formattedDay,
                        time: formattedTime,
                        email,
                        costData,
                        totalQuantity,
                        selections: selections.map(({ quantity, value, cost }) => ({ quantity, value, cost })),
                    },
                    collectionName: 'orders'
                });

                enqueueSnackbar('Ordered', { variant: 'success' });
                setSuccess(true);
            } catch (error) {
                enqueueSnackbar('Failed to place order', { variant: 'error' });
            } finally {
                setSubmitting(false);
            }
        } else {
            enqueueSnackbar('Please verify your email before placing an order.', { variant: 'warning' });
            await emailVerification().then(() => (
                enqueueSnackbar('Verification email has been sent!', { variant: 'success' })
            ));
        }
    };

    return (
        <Box sx={{ width: '100%', height: 35, textAlign: 'center' }}>
            <Button
                variant="contained"
                onClick={validateProps}
                disabled={success || submitting}>
                {submitting ? (
                    <Box sx={{ width: '100%' }}>
                        <LinearProgress />
                    </Box>
                ) : success ? 'Thank you for your order!' : 'Place Order'}
            </Button>
        </Box>
    );
}