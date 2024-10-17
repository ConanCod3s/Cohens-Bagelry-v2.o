// import Header from "./components/Header";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme } from "./theme/Base";
import CssBaseline from "@mui/material/CssBaseline";
// import { Outlet } from "react-router-dom";
// import { Box } from "@mui/material";

export default function App() {
    return (
        <ThemeProvider theme={lightTheme}>
            <CssBaseline />
            Closed (TBA)
            {/* <Header />
            <Box sx={{ overflow: 'auto', padding: 1 }} id='ouletBox'>
                <Outlet />
            </Box> */}
        </ThemeProvider>
    );
}
