import { Box, Divider, Typography } from "@mui/material";

export default function About() {
    function daysSinceBirth(): number {
        const dob = new Date('2024-04-11');
        const currentDate = new Date();
        const timeDifference = currentDate.getTime() - dob.getTime();
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        return daysDifference;
    }

    return (
        <Box sx={{ justifyContent: 'space-around', textAlign: 'center', paddingBottom: 5 }}>
            <Typography variant="h4">Our Story: From Code to Crust</Typography>
            <Box sx={{ height: 25, width: '100%' }} />
            <Typography>
                At Cohen's Bagelry, every bagel carries with it a story—a story that began in a Jewish household just outside of San Francisco,
                where the aroma of fresh bagels and sourdough filled the air. Growing up, I was immersed in my family's deep love for quality bread.
                Visits to my grandparents were always special, highlighted by the finest bagels and bialys brought from New York—a testament to their
                commitment to authenticity and tradition.
                <br />
                <br />
                Life, however, took an unexpected turn. At 18, I enlisted in the military, where I learned the discipline and dedication that would
                shape my future. After my time in the service, I transitioned into a career as a software engineer. Yet, amid all the lines of code
                and the rigor of military life, the memory of those perfect bagels from my childhood stayed with me.
                <br />
                <br />
                Eventually, I made a bold decision: to leave behind the world of software engineering and the structure of the military to pursue my
                true passion—baking. By combining the precision of engineering with the perseverance instilled through military service, I set out to
                create bagels that aren't just food, but an experience.
                <br />
                <br />
                At Cohen's Bagelry, we honor those cherished memories and traditions by using only the finest ingredients and time-honored techniques.
                Our bagels are hand-rolled, boiled, and baked to perfection, just like those that graced the tables of my childhood. Every bite is a
                connection to the past, crafted with the same love and care that my grandparents demanded from their New York bagels.
                <br />
                <br />
                Alongside our bagels, I’ve embarked on another journey—raising a sourdough culture from scratch. His name is Winston, and as of today,
                he’s {daysSinceBirth()} days old!
                <br />
                <br />
                So please, join us on this journey from code to crust, and savor the flavors that have been generations in the making.
            </Typography>
            <br />
            <Divider />
            <br />
            <Typography variant="h6">
                Welcome to Cohen's Bagelry, where every bagel taste like home.
            </Typography>
            <Box sx={{ height: 25, width: '100%' }} />
        </Box>
    );
};
