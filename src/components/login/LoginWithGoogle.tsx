import { IconButton } from '@mui/material';
import { signInWithRedirect, signInWithPopup, setPersistence, browserSessionPersistence } from 'firebase/auth';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../../services/firebase/Calls';
import GoogleIcon from '@mui/icons-material/Google';

/**
 * 
 * I am having nothing but issues getting this to work with mobile devices
 * going to put it on the back burner for meow
 * 
 */

const GoogleLogin = () => {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const handleGoogleLogin = () => {
        if (isMobileOrPopupBlocked()) {
            signInWithRedirect(auth, googleProvider);
        } else {
            setPersistence(auth, browserSessionPersistence)
                .then(() => signInWithPopup(auth, googleProvider))
                .then((result) => {
                    const user = result.user;
                    if (user) {
                        enqueueSnackbar(`Welcome, ${user.displayName}!`, { variant: 'success' });
                        navigate('/Order');
                    }
                })
                .catch((error) => {
                    console.error('Error during popup sign-in:', error);
                    enqueueSnackbar(`Login failed: ${error.message}`, { variant: 'error' });
                });
        }
    };

    const isMobileOrPopupBlocked = () => {
        const userAgent = navigator.userAgent || navigator.vendor;
        return /android|iPad|iPhone|iPod/i.test(userAgent) || !window.open;
    };

    return (
        <IconButton color="primary" onClick={handleGoogleLogin}>
            <GoogleIcon />
        </IconButton>
    );
};

export default GoogleLogin;
