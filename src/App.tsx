import Header from "./components/Header";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme } from "./theme/Base";
import CssBaseline from "@mui/material/CssBaseline";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
// import { useEffect } from "react";
// import { browserLocalPersistence, setPersistence } from "firebase/auth";
// import { auth } from './services/firebase/Calls';

export default function App() {

    // Using for log in with google Auth
    // useEffect(() => {
    //     const setupAuthPersistence = async () => {
    //         try {
    //             await setPersistence(auth, browserLocalPersistence);
    //             console.log('Persistence set to local storage');
    //         } catch (error) {
    //             console.error('Error setting persistence:', error);
    //         }
    //     };

    //     setupAuthPersistence();
    // }, []);

    return (
        <ThemeProvider theme={lightTheme}>
            <CssBaseline />
            <Header />
            <Box sx={{ overflow: 'auto', padding: 1 }}>
                <div id="recaptcha-widget" style={{ display: 'none' }}></div>
                <Outlet />
            </Box>
        </ThemeProvider>
    );
}
