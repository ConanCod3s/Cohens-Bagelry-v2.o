import { useState, useEffect, Fragment } from 'react';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import { getURL, getAppImages, appImages } from '../services/firebase/Calls';

const IMAGE_URL = "gs://cohens-bagelry-8c701.appspot.com/Step_1.jpg";
const IMAGE_INTERVAL = 5000; // Interval time in milliseconds

export default function SimpleFade() {
    const [img, setImg] = useState<any>(null);
    const [activeIndex, setActiveIndex] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const imageUrl = await getURL(IMAGE_URL);
                setImg(imageUrl);

                if (appImages.length === 0) {
                    await getAppImages();
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveIndex((prevIndex) =>
                prevIndex === appImages.length - 1 ? 0 : prevIndex + 1
            );
        }, IMAGE_INTERVAL);

        return () => clearInterval(timer);
    }, [appImages.length]);

    return (
        <Fragment>
            {appImages.length === 0 ? (
                <Box
                    src={img}
                    component="img"
                    sx={(theme) => ({
                        height: '60vh',
                        maxWidth: '80vw',
                        borderRadius: "10px",
                        boxShadow: `0px 0px 5px 1px black`,
                        border: `1px solid ${theme.palette.primary.main}`,
                    })}
                />
            ) : (
                appImages.map((image, sakuin) => (
                    <Fade
                        key={sakuin}
                        in={sakuin === activeIndex}
                        timeout={{ enter: 1000, exit: 1000 }}
                    >
                        <Box
                            src={image}
                            component="img"
                            sx={(theme) => ({
                                height: '60vh',
                                maxWidth: '80vw',
                                borderRadius: "10px",
                                boxShadow: `0px 0px 5px 1px black`,
                                border: `1px solid ${theme.palette.primary.main}`,
                                display: sakuin === activeIndex ? "block" : "none",
                            })}
                        />
                    </Fade>
                ))
            )}
        </Fragment>
    );
}
