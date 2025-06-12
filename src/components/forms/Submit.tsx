import {useState} from 'react';
import {Box, Button, LinearProgress} from "@mui/material";
import {useSnackbar} from 'notistack';
import {checkDocumentExists, getCount, setFireBaseDoc} from '../../services/firebase/Calls';
import dayjs, {Dayjs} from 'dayjs';
import {getToken} from 'firebase/app-check';
import {appCheck} from '../../services/firebase/AppCheck';
import {callVerifyRecaptcha} from '../../services/firebase/httpsCallables/VerifyRecaptcha';
import {AvailableType} from '../../utils/constants/Types';

interface Props {
    setSuccess: (value: boolean) => void,
    success: boolean,
    uid: string;
    day: Dayjs;
    time: Dayjs;
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
    const {enqueueSnackbar} = useSnackbar();
    const [submitting, setSubmitting] = useState<boolean>(false);

    const totalQuantity = selections.reduce((a, b) => a + b.quantity, 0);

    // DTG Stuff
    const selectedTime = dayjs(time);
    const formattedDay = dayjs(day).format('YYYY-MM-DD');
    const formattedTime = selectedTime.format('HH:mm:ss');
    const minTime = selectedTime.set('hour', 5).set('minute', 0).set('second', 0);
    const maxTime = selectedTime.set('hour', 10).set('minute', 0).set('second', 0);
    const minimumAllowedDate = dayjs().add(2, 'day').startOf('day');

    const validateProps = () => {
        const errors = [
            {condition: !firstName.trim(), message: 'Please add a First name'},
            {condition: !email.trim(), message: 'Email is missing, please add a valid email'},
            {condition: !phoneNumber.trim(), message: 'An invalid, incomplete, or no phone number was added'},
            {condition: totalQuantity <= 0, message: 'Please select a quantity over 0'},
            {
                condition: selectedTime.isBefore(minTime) || selectedTime.isAfter(maxTime),
                message: 'Selected time is outside the valid range of 5 AM to 10 AM.'
            },
            {
                condition: dayjs(day).isBefore(minimumAllowedDate, 'day'),
                message: 'Order date must be at least 2 days from today.'
            }
        ];

        for (const error of errors) {
            if (error.condition) {
                enqueueSnackbar(error.message, {variant: 'error'});
                return;
            }
        }

        handleOrder();
    };

    const makeCustomerProfile = async () => {
        checkDocumentExists({
            collectionName: 'customers',
            documentId: uid,
        }).then((exists) => {

            const userProfileData = {
                collectionName: 'customers',
                docId: uid,
                props: {uid, phoneNumber, firstName, lastName, email}
            };

            if (!exists) setFireBaseDoc(userProfileData);

        });

    };

    const handleOrder = async () => {
        setSubmitting(true);
        try {
            const token = (await getToken(appCheck, true)).token;
            if (!token) {
                enqueueSnackbar('Failed to validate reCAPTCHA', {variant: 'error'});
                setSubmitting(false);
                return;
            }

            const responseSuccess = await callVerifyRecaptcha(token);
            if (!responseSuccess) {
                enqueueSnackbar('reCAPTCHA validation failed', {variant: 'error'});
                setSubmitting(false);
                return;
            }

            makeCustomerProfile();

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
                    selections: selections.map(({quantity, value, cost}) => ({quantity, value, cost})),
                },
                collectionName: 'orders'
            });

            enqueueSnackbar('Ordered', {variant: 'success'});
            setSuccess(true);
        } catch (error) {
            enqueueSnackbar('Failed to place order', {variant: 'error'});
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Box sx={{width: '100%', textAlign: 'center'}}>
            <Button
                variant="contained"
                onClick={validateProps}
                // disabled={true}>
                disabled={success || submitting}>

                {submitting ? (
                    <Box sx={{width: '100%'}}>
                        <LinearProgress/>
                    </Box>
                ) : success ? 'Thank you for your order!' : 'Place Order'}
            </Button>
        </Box>
    );
}