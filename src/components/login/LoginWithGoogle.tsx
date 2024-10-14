import { IconButton } from '@mui/material';
import { GoogleAuthProvider, signInWithRedirect, signInWithPopup, setPersistence, browserSessionPersistence } from 'firebase/auth';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../services/firebase/Calls';
import GoogleIcon from '@mui/icons-material/Google';

/**
 * GoogleLogin Component
 * Handles Google Sign-in with fallback to redirect for mobile or blocked popups.
 */

const googleProvider = new GoogleAuthProvider();

const GoogleLogin = () => {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const handleGoogleLogin = async () => {
        try {
            if (isMobileOrPopupBlocked()) {
                // Use redirect for mobile or blocked popups
                await signInWithRedirect(auth, googleProvider);
            } else {
                // Set session persistence and proceed with popup sign-in
                await setPersistence(auth, browserSessionPersistence);
                const result = await signInWithPopup(auth, googleProvider);
                const user = result.user;

                if (user) {
                    enqueueSnackbar(`Welcome, ${user.displayName}!`, { variant: 'success' });
                    navigate('/Order');
                }
            }
        } catch (error: any) {
            console.error('Error during Google sign-in:', error);
            enqueueSnackbar(`Login failed: ${error.message}`, { variant: 'error' });
        }
    };

    const isMobileOrPopupBlocked = (): boolean => {
        const userAgent = navigator.userAgent || navigator.vendor;
        const isMobile = /android|iPad|iPhone|iPod/i.test(userAgent);
        const isPopupBlocked = !window.open;
        return isMobile || isPopupBlocked;
    };

    return (
        <IconButton color="primary" onClick={handleGoogleLogin}>
            <GoogleIcon />
        </IconButton>
    );
};

export default GoogleLogin;
