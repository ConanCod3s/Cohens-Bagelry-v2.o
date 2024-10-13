import { useState } from 'react';
import { Box, Button, LinearProgress } from "@mui/material";
import { useSnackbar } from 'notistack';
import { emailVerification, getCount, setFireBaseDoc, setUserProfile } from '../../services/firebase/Calls';
import { auth } from '../../services/firebase/Calls';
import { AvailableType } from '../../utils/constants/Types';
import dayjs from 'dayjs';
import { getToken } from 'firebase/app-check';
import { appCheck } from '../../services/firebase/AppCheck';

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

    // Ensure the passed time is a dayjs object
    const selectedTime = dayjs(time);
    const minTime = selectedTime.set('hour', 5).set('minute', 0).set('second', 0);
    const maxTime = selectedTime.set('hour', 10).set('minute', 0).set('second', 0);

    // Validate all the required fields before submitting
    const validateProps = () => {
        if (!firstName.trim()) {
            enqueueSnackbar('Please add a First name', { variant: 'error' });
        } else if (!email.trim()) {
            enqueueSnackbar('Email Is Missing, please add a valid email', { variant: 'error' });
        } else if (!phoneNumber.trim()) {
            enqueueSnackbar('An invalid, incomplete, or no phone number was added', { variant: 'warning' });
        } else if (totalQuantity <= 0) {
            enqueueSnackbar('Please select a quantity over 0', { variant: 'error' });
        } else if (selectedTime.isBefore(minTime) || selectedTime.isAfter(maxTime)) {
            enqueueSnackbar('Selected time is outside the valid range of 4 AM to 10 AM.', { variant: 'error' });
        } else {
            handleOrder();
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

                if (saveInfo) {
                    setUserProfile({
                        collectionName: 'customers',
                        docId: user.uid,
                        props: {
                            uid: user.uid,
                            phoneNumber,
                            firstName,
                            lastName,
                            email,
                        }
                    })
                    setFireBaseDoc({
                        collectionName: 'customers',
                        docId: user.uid,
                        props: {
                            uid: user.uid,
                            phoneNumber,
                            firstName,
                            lastName,
                            email,
                        }
                    });
                }

                const count = await getCount('orders');
                console.log('******costData', costData)
                // await setFireBaseDoc({
                //     props: {
                //         orderedByUid: uid,
                //         firstName,
                //         lastName,
                //         phoneNumber,
                //         orderId: `WO-${(count + 1).toString().padStart(4, '0')}`,
                //         day: dayjs(day).format('YYYY-MM-DD'),
                //         time: dayjs(time).format('HH:mm:ss'),
                //         email,
                //         costData,
                //         totalQuantity,
                //         selections: selections.map(obj => ({
                //             quantity: obj.quantity,
                //             value: obj.value,
                //             cost: obj.cost,
                //         })),
                //         token
                //     },
                //     collectionName: 'orders'
                // });
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
            ))
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