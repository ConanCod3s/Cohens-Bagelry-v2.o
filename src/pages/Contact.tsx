import {Box} from "@mui/material";

export default function Contact() {

    const orderEmail = 'contact@cohensbagelry.com';
  
    return (
        <Box sx={{ alignContent: 'center' }}>
            <a href={`mailto:${orderEmail}`}>{orderEmail}</a>
        </Box>
    )}