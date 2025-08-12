import {useState} from 'react';
import {Button, Stack} from '@mui/material';
import {sendSignInLinkToEmail} from 'firebase/auth';
import {useSnackbar} from 'notistack';
import Email from '../forms/Email';
import {auth} from '../../services/firebase/Calls';
import {actionCodeSettings} from '../../utils/constants/Constants';

export default function LoginWithOnlyEmail() {
    const {enqueueSnackbar} = useSnackbar();
    const [email, setEmail] = useState('');

    const handleLogin = async () => {
        if (!email) {
            enqueueSnackbar('Please enter your email', {variant: 'warning'});
            return;
        }

        try {
            await sendSignInLinkToEmail(auth, email, actionCodeSettings);
            window.localStorage.setItem('emailForSignIn', email);
            enqueueSnackbar('Sign-in link sent. Check your email.', {variant: 'success'});
        } catch (error: any) {
            enqueueSnackbar(error.message, {variant: 'error'});
        }
    };

    return (
        <Stack spacing={2}>
            <Email userEmail={email} setEmail={setEmail}/>
            <Button variant="contained" onClick={handleLogin}>Send Link</Button>
        </Stack>
    );
}