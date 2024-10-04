import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { BottomNavigation, Tooltip } from "@mui/material";
import { Home, LightMode, NightlightRound, Email } from "@mui/icons-material";
import { footer } from "../theme/Base";

interface FooterProps {
    themeMode: boolean;
    swapThemeMode: (newMode: boolean) => void;
}

export default function Footer({ themeMode, swapThemeMode }: FooterProps) {
    const navigate = useNavigate();

    const handleEmailClick = () => {
        window.open("mailto:Contact@cohensbagelry.com?subject=Place Order");
    };

    return (
        <BottomNavigation
            sx={{
                height: footer,
                bottom: 0,
                width: '100%',
                position: 'fixed',
                justifyContent: 'space-between',
            }}
        >
            <Tooltip title="Home">
                <IconButton onClick={() => navigate("/")}>
                    <Home />
                </IconButton>
            </Tooltip>

            <Tooltip title="Contact@cohensbagelry.com">
                <IconButton onClick={handleEmailClick}>
                    <Email />
                </IconButton>
            </Tooltip>

            <Tooltip title={themeMode ? "Dark Mode" : "Light Mode"}>
                <IconButton onClick={() => swapThemeMode(!themeMode)}>
                    {themeMode ? <NightlightRound /> : <LightMode />}
                </IconButton>
            </Tooltip>
        </BottomNavigation>
    );
}