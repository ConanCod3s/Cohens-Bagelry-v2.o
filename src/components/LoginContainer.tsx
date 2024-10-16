import { useState } from "react";
import { Button, Divider, Grid, Stack, Switch, Tooltip, Typography } from "@mui/material";
import LoginWithEmail from "../components/login/LoginWithEmailAndPassword";
import SignUpWithEmail from "../components/signUp/SignUpWithEmail";
import { useUser } from '../services/providers/User';
import { signUserOut } from "../services/firebase/Calls";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import GoogleLogin from "./login/LoginWithGoogle";

export default function LoginContainer() {
    const { userInfo, loggedIn } = useUser();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [loginSignup, setLoginSignup] = useState<boolean>(false);

    const handleLogout = async () => {
        try {
            await signUserOut();
            navigate('/');
            enqueueSnackbar('Successfully logged out', { variant: 'success' });
        } catch (error) {
            enqueueSnackbar('Failed to log out', { variant: 'error' });
        }
    };

    return (
        <Stack spacing={2} alignItems="center" justifyContent="center">

            {loggedIn ? (
                <Button
                    onClick={handleLogout}
                    variant="contained"
                    color="primary"
                    sx={{ borderRadius: 1 }}
                >
                    <Tooltip title={userInfo ? userInfo.email : ''} arrow>
                        <Typography>Logout</Typography>
                    </Tooltip>
                </Button>
            ) : (
                <>
                    <Stack direction="row" alignItems="center" spacing={2} sx={{ justifyContent: 'center', mb: 3 }}>
                        <Typography variant="caption">Login</Typography>
                        <Switch
                            checked={loginSignup}
                            onChange={() => setLoginSignup(prev => !prev)}
                            aria-label={loginSignup ? "Switch to login" : "Switch to sign up"}
                        />
                        <Typography variant="caption">Sign Up</Typography>
                    </Stack>
                    {loginSignup ? <SignUpWithEmail /> : <LoginWithEmail />}
                    <Divider />
                    <Grid container justifyContent='space-around'>
                        <GoogleLogin />
                    </Grid>
                </>
            )}
        </Stack>
    );
}
