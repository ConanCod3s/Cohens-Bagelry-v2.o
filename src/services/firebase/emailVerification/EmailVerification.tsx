import {createUserWithEmailAndPassword, sendEmailVerification} from "firebase/auth";
import {auth} from '../Calls';
import {enqueueSnackbar} from 'notistack';

export default function handleSignUp(email: string, password: string) {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            sendEmailVerification(user)
                .then(() => {
                    enqueueSnackbar('Verification email sent. Please check your inbox.', {variant: 'info'});
                })
                .catch((error) => {
                    enqueueSnackbar(`Error sending verification email: ${error.message}`, {variant: 'error'});
                });
        })
        .catch((error) => {
            enqueueSnackbar(`Sign up failed: ${error.message}`, {variant: 'error'});
        });
};
