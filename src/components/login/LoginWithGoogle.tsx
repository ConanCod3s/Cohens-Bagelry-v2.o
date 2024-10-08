import { IconButton } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { GoogleOAuthProvider } from "@react-oauth/google";
import { loginWithGoogleRedirect, handleFirebaseRedirectResult } from '../../services/firebase/AuthService';

const GoogleLogin = () => {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    useEffect(() => {
        handleFirebaseRedirectResult()
            .then((result) => {
                if (result?.user) {
                    enqueueSnackbar(`Welcome, ${result.user.displayName}!`, { variant: 'success' });
                    navigate('/Order');
                }
            })
            .catch((error) => {
                enqueueSnackbar(`Error during login: ${error.message}`, { variant: 'error' });
            });
    }, [enqueueSnackbar, navigate]);

    const handleGoogleLogin = () => {
        enqueueSnackbar("Redirecting for login...", { variant: 'info' });
        loginWithGoogleRedirect()
            .catch((error) => {
                enqueueSnackbar(`Error setting persistence: ${error.message}`, { variant: 'error' });
            });
    };

    return (
        <GoogleOAuthProvider clientId="your-client-id-here">
            <IconButton onClick={handleGoogleLogin}>
                <img src="path-to-google-icon.svg" alt="Google Login" style={{ width: '24px', height: '24px' }} />
            </IconButton>
        </GoogleOAuthProvider>
    );
};

export default GoogleLogin;
