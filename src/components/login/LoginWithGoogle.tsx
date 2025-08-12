import {IconButton} from '@mui/material';
import {GoogleAuthProvider, signInWithRedirect} from 'firebase/auth';
import {auth} from '../../services/firebase/Calls';
import GoogleIcon from '@mui/icons-material/Google';

export default function GoogleLogin() {

    const handleLogin = () => {
        const provider = new GoogleAuthProvider();
        signInWithRedirect(auth, provider);
    };

    return (
        <IconButton color="primary" onClick={handleLogin}>
            <GoogleIcon/>
        </IconButton>
    );
}