import {Typography} from "@mui/material";

export default function Information() {

    const additionalInformation: string[] = [
        'Prices may vary as the recipes are refined.',
        'Cash is preferred, but Venmo is available during pickup if needed.',
        'Since this is a passion project, pickups are only available during my free time, between 5 AM and 10 AM.',
        'It takes 2 days to prepare a loaf of sourdough or a batch of bagels, so orders must be placed at least 2 days in advance.',
        'An additional fee is applied to round up to the nearest dollar for easier transactions and to help cover unforeseen costs.',
        'Email: contact@cohensbagelry.com',
    ];

    return (
        <div>
            <h3>Helpful Information!</h3>
            <ul>
                {additionalInformation.map((item, sakuin) => (
                    <li key={sakuin}>{item}</li>
                ))}
            </ul>
            <Typography
                variant="subtitle2"
                sx={{textAlign: 'center', opacity:'.5'}}>
                This site is protected by reCAPTCHA and the Google <br/>
                <a href={"https://policies.google.com/privacy"}> Privacy Policy</a> and <a href={'https://policies.google.com/terms'}>Terms of Service</a> apply.
            </Typography>

        </div>
    );
}
