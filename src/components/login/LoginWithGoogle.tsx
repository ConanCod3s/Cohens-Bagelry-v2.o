import { getAuth, signInWithRedirect, GoogleAuthProvider, getRedirectResult } from "firebase/auth";
import { useEffect } from "react";
import { Button } from "@mui/material";

export default function GoogleLogin() {
    const auth = getAuth();

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
        <Button variant="contained" color="primary" onClick={handleLogin}>
            Login with Google
        </Button>
    );
};