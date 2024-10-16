import { IconButton } from '@mui/material';
import { GoogleAuthProvider, signInWithRedirect, signInWithPopup, setPersistence, browserSessionPersistence, getRedirectResult } from 'firebase/auth';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../services/firebase/Calls';
import GoogleIcon from '@mui/icons-material/Google';
import { useEffect } from 'react';

export default function GoogleLogin() {

    const handleLogin = () => {
        const provider = new GoogleAuthProvider();
        signInWithRedirect(auth, provider);
    };

    useEffect(() => {
        const checkRedirectResult = async () => {
            try {
                const result = await getRedirectResult(auth);
                if (result) {
                    // User signed in successfully
                    console.log('User signed in:', result.user);
                }
            } catch (error) {
                console.error('Error getting redirect result:', error);
            }
        };
        checkRedirectResult();
    }, [auth]);

    return (
        <IconButton color="primary" onClick={handleLogin}>
            <GoogleIcon />
        </IconButton>
    );
};