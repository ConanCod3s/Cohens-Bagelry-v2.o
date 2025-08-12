import {useState} from 'react';
import TextField from '@mui/material/TextField';

interface Props {
    userPhoneNumber?: string | null;
    setPhoneNumber: (number: string) => void;
}

export default function PhoneNumber({userPhoneNumber, setPhoneNumber}: Props) {
    const [error, setError] = useState<{ key: string; msg: string } | null>(null);

    const validatePhoneNumber = (phoneNumber: string) => {
        const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        return regex.test(phoneNumber);
    };

    const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const phoneNumber = event.target.value;
        if (!validatePhoneNumber(phoneNumber)) {
            setPhoneNumber('');
            setError({key: 'phone', msg: 'Please enter a valid phone number (e.g. 123-456-7890)'});
        } else {
            setPhoneNumber(phoneNumber);
            setError(null);
        }
    };

    return (
        <TextField
            label={userPhoneNumber ? userPhoneNumber : "Phone Number"}
            variant="outlined"
            name="phone"
            helperText={error?.key === 'phone' ? error.msg : ''}
            error={error?.key === 'phone'}
            onChange={handlePhoneNumberChange}
        />
    );
}
