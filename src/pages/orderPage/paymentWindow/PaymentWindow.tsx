import { Stack, TextField } from '@mui/material';
import PhoneNumber from '../../../components/forms/PhoneNumber';
import Submit from '../../../components/forms/Submit';
import Email from '../../../components/forms/Email';
import DateTimeForPickup from '../../../components/forms/DateTime';
import dayjs from 'dayjs';
import { AvailableType } from '../../../utils/constants/Types';

interface PaymentWindowProps {
    email: string;
    setEmail: (value: string) => void;
    firstName: string;
    setFirstName: (value: string) => void;
    lastName: string;
    setLastName: (value: string) => void;
    phoneNumber: string;
    setPhoneNumber: (value: string) => void;
    uid: string;
    selections: AvailableType[];
    costData: {
        cost: number,
        fee: number,
        totalCost: number,
    };
    day: dayjs.Dayjs;
    setDay: (value: dayjs.Dayjs) => void;
    time: dayjs.Dayjs;
    setTime: (value: dayjs.Dayjs) => void;
    success: boolean;
    setSuccess: (value: boolean) => void;
}

export default function PaymentWindow({
    email,
    setEmail,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    phoneNumber,
    setPhoneNumber,
    uid,
    selections,
    costData,
    day,
    setDay,
    time,
    setTime,
    success,
    setSuccess,
}: PaymentWindowProps) {

    return (
        <Stack spacing={2} justifyContent="center">
            <TextField
                id="first-name"
                label="First Name"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
            />
            <TextField
                id="last-name"
                label="Last Name"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
            />
            <PhoneNumber userPhoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} />
            <Email userEmail={email} setEmail={setEmail} />
            <DateTimeForPickup defaultValue={day} setDay={setDay} setTime={setTime} />
            <Submit
                setSuccess={setSuccess}
                success={success}
                uid={uid}
                day={day}
                time={time}
                selections={selections}
                email={email}
                phoneNumber={phoneNumber}
                firstName={firstName}
                lastName={lastName}
                costData={costData}
            />
        </Stack>
    );
}
