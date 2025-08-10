import {Box, Button, Typography} from '@mui/material';
import {useNavigate} from "react-router-dom";

export default function PageNotFound() {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                textAlign: 'center',
                backgroundColor: '#f5f5f5',
                padding: 2,
            }}
            role="alert"
        >
            <Typography
                variant="h1"
                sx={{
                    fontSize: '6rem',
                    fontWeight: 'bold',
                    color: '#ff7043',
                    margin: 0,
                }}
            >
                404
            </Typography>
            <Typography
                variant="h4"
                sx={{
                    marginY: 2,
                    color: '#ff7043',
                }}
            >
                Uh-oh! You're in a whole lot of trouble.
            </Typography>
            <Typography
                variant="h6"
                sx={{
                    marginBottom: 2,
                    color: '#757575',
                }}
            >
                The page you're looking for doesn't exist. Maybe it's time for a bagel break?
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/')}
            >
                Go Back Home
            </Button>
        </Box>
    );
}