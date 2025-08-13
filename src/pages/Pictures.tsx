import { Masonry } from "@mui/lab";
import { useEffect, useState } from "react";
import { CardMedia, CircularProgress, Dialog, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { getAppImages } from "../services/firebase/Calls";

export default function Pictures() {
    const [isLoading, setLoading] = useState(true);
    const [images, setImages] = useState<string[]>([]);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;
        setLoading(true);

        getAppImages()
            .then((imgs) => {
                if (mounted) setImages(imgs);
            })
            .catch((err) => console.error("Failed to fetch images:", err))
            .finally(() => {
                if (mounted) setLoading(false);
            });

        return () => {
            mounted = false;
        };
    }, []);

    if (isLoading) return <CircularProgress sx={{ display: "block", margin: "auto" }} />;

    return (
        <>
            <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={1}>
                {images.map((image, index) => (
                    <CardMedia
                        key={index}
                        image={image}
                        component="img"
                        onClick={() => setSelectedImage(image)}
                        sx={{ width: "100%", height: "auto", objectFit: "cover", cursor: "pointer" }}
                    />
                ))}
            </Masonry>

            <Dialog
                open={Boolean(selectedImage)}
                onClose={() => setSelectedImage(null)}
                PaperProps={{ style: { backgroundColor: "transparent", boxShadow: "none" } }}
                maxWidth="lg"
            >
                {selectedImage && (
                    <div style={{ position: "relative" }}>
                        <IconButton
                            onClick={() => setSelectedImage(null)}
                            sx={{
                                position: "absolute",
                                top: 10,
                                right: 10,
                                color: "white",
                                backgroundColor: "rgba(0, 0, 0, 0.5)",
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                        <img
                            src={selectedImage}
                            alt="Expanded"
                            style={{
                                maxWidth: "90vw",
                                maxHeight: "90vh",
                                margin: "auto",
                                display: "block",
                                objectFit: "contain",
                            }}
                        />
                    </div>
                )}
            </Dialog>
        </>
    );
}
