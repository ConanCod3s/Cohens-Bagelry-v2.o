import { Masonry } from '@mui/lab';
import { Fragment, useEffect, useState } from 'react';
import { CardMedia, CircularProgress, IconButton, Dialog } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { appImages, getAppImages } from '../services/firebase/Calls';

export default function Pictures() {
    const [isLoading, setLoading] = useState<boolean>(true);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                await getAppImages();
            } catch (error) {
                console.error("Failed to fetch images:", error);
            } finally {
                setLoading(false);
            }
        };

        if (appImages.length === 0) {
            fetchImages();
        } else {
            setLoading(false);
        }
    }, []);

    const handleImageClick = (image: string) => {
        setSelectedImage(image);
    };

    const handleClose = () => {
        setSelectedImage(null);
    };

    if (isLoading) return <CircularProgress sx={{ display: 'block', margin: 'auto' }} />;

    return (
        <Fragment>
            <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={1} >
                {appImages.map((image, sakuin) => (
                    <CardMedia
                        key={sakuin}
                        image={image}
                        component="img"
                        onClick={() => handleImageClick(image)}
                        sx={{
                            width: '100%',
                            height: 'auto',
                            objectFit: 'cover',
                            cursor: 'pointer'
                        }}
                    />
                ))}
            </Masonry>

            {/* Modal to show the expanded image */}
            <Dialog
                open={!!selectedImage}
                onClose={handleClose}
                PaperProps={{
                    style: { backgroundColor: 'transparent', boxShadow: 'none' }
                }}
                maxWidth="lg"
            >
                {selectedImage && (
                    <div style={{ position: 'relative' }}>
                        <IconButton
                            onClick={handleClose}
                            sx={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                color: 'white',
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            }}
                        >
                            <CloseIcon />
                        </IconButton>

                        <img
                            src={selectedImage}
                            alt="Expanded"
                            style={{
                                maxWidth: '90vw',
                                maxHeight: '90vh',
                                margin: 'auto',
                                display: 'block',
                                objectFit: 'contain'
                            }}
                        />
                    </div>
                )}
            </Dialog>
        </Fragment>
    );
}
