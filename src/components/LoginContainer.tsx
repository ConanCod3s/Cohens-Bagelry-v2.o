import { useState } from "react";
import { Button, Stack, Switch, Typography, Divider, Grid } from "@mui/material";
import LoginWithEmail from "../components/login/LoginWithEmailAndPassword";
import SignUpWithEmail from "../components/signUp/SignUpWithEmail";
import { useUser } from '../services/providers/User';
import { signUserOut } from "../services/firebase/Calls";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import GoogleLogin from "../components/login/LoginWithGoogle";

export default function LoginContainer() {
    const { loggedIn } = useUser();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [loginSignup, setLoginSignup] = useState<boolean>(false);

    const handleLogout = async () => {
        try {
            await signUserOut();
            navigate('/');
            enqueueSnackbar('Successfully Logged out', { variant: 'success' });
        } catch (error) {
            enqueueSnackbar('Failed to log out', { variant: 'error' });
        }
    };

    const renderElement = loggedIn ? (
        <Button onClick={handleLogout} variant="contained" color="primary" sx={{ borderRadius: 0 }}>
            Logout
        </Button>
    ) : (
        <div style={{ padding: 10 }}>
            <Stack direction="row" alignItems="center" spacing={2} sx={{ justifyContent: 'center', mb: 3 }} >
                <Typography variant="caption">Login</Typography>
                <Switch
                    checked={loginSignup}
                    onChange={() => setLoginSignup(prev => !prev)}
                    aria-label={loginSignup ? "Switch to login" : "Switch to sign up"}
                />
                <Typography variant="caption">Sign Up</Typography>
            </Stack>
            {loginSignup ? <SignUpWithEmail /> : <LoginWithEmail />}
            <Divider> or </Divider>
            <Grid container justifyContent='space-around'>
                <GoogleLogin />
            </Grid>
        </div>
    );

    return renderElement;
}
