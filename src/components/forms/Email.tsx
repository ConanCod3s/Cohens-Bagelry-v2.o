import {useState} from 'react';
import {TextField} from '@mui/material';

interface Props {
    userEmail?: string | null;
    setEmail: (email: string) => void;
}

export default function Email({userEmail, setEmail}: Props) {
    const [error, setError] = useState<{ key: string; msg: string } | null>(null);

    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    return (
        <TextField
            label={userEmail ? userEmail : "Email"}
            variant="outlined"
            error={!!(error && error.key === 'email')}
            helperText={error && error.key === 'email' ? error.msg : ''}
            onChange={(event) => {
                const email = event.target.value;
                if (!validateEmail(email)) {
                    setEmail('');
                    setError({key: 'email', msg: 'Please enter a valid email address'});
                } else {
                    setEmail(email);
                    setError(null);
                }
            }}
        />
    );
}
