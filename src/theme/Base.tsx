import { createTheme, ThemeOptions } from "@mui/material";

// Buffers for static components, all in vh
export const header: number = 80;
export const footer: number = 0;
export const workingWindow: number = window.innerHeight - (header + footer);

const typographySettings = {
    fontSize: 16,
    fontWeight: 400,
    fontFamily: ['Garamond', 'Merriweather', 'serif'].join(","),
};

// Component overrides
const componentOverrides = {
    MuiTypography: {
        styleOverrides: {
            root: {
                fontWeight: 900,  // This is a global override
            },
        },
    },
};

// Base theme settings
const BaseTheme: ThemeOptions = {
    typography: typographySettings,
    components: componentOverrides,
};

// Light theme configuration
const lightTheme = createTheme({
    ...BaseTheme,
    palette: {
        mode: "light",
        primary: {
            light: '#a98274',
            main: '#8b6f47',
            dark: '#5d4037',
        },
        secondary: {
            light: '#ffb04c',
            main: '#d84315',
            dark: '#bf360c',
        },
    },
});

// Dark theme configuration
const darkTheme = createTheme({
    ...BaseTheme,
    palette: {
        mode: "dark",
        primary: {
            light: '#5D4037',
            main: '#3E2723',
            dark: '#321911',
        },
        secondary: {
            light: '#FF8A65',
            main: '#D84315',
            dark: '#BF360C',
        },
        background: {
            default: '#3E2723',
            paper: '#4E342E',
        },
        text: {
            primary: '#FFFFFF',
            secondary: '#F5F5F5',
        },
    },
});

export { lightTheme, darkTheme };
