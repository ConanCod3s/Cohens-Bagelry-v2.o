import { useState } from 'react';
import { signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { Button, Stack } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useNavigate } from "react-router-dom";
import Email from '../forms/Email';
import PasswordForm from '../forms/Password';
import { auth } from '../../services/firebase/Calls';

export default function LoginWithEmail() {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState<string>('');
    const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

    const handleLogin = () => {
        if (!email || !password) {
            enqueueSnackbar('Please fill in all fields', { variant: 'warning' });
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                if (user.emailVerified) {
                    enqueueSnackbar('Logged In', { variant: 'success' });
                    navigate("/Order");
                } else {
                    enqueueSnackbar('Please verify your email before proceeding.', { variant: 'warning' });
                    sendEmailVerification(user)
                        .then(() => {
                            enqueueSnackbar('Verification email sent. Please check your inbox.', { variant: 'info' });
                        })
                        .catch((error) => {
                            enqueueSnackbar(`Error sending verification email: ${error.message}`, { variant: 'error' });
                        });
                }
            })
            .catch((error) => {
                enqueueSnackbar(error.message, { variant: 'error' });
            });
    };

    return (
        <Stack spacing={2}>
            <Email userEmail={email} setEmail={setEmail} />
            <PasswordForm
                password={password}
                setPassword={setPassword}
                errors={passwordErrors}
                setErrors={setPasswordErrors}
            />
            <Button variant="contained" onClick={handleLogin}>Submit</Button>
        </Stack>
    );
}