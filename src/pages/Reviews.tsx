import {useEffect, useState} from "react";
import {getCollection} from "../services/firebase/Calls";
import ReviewForm from "../components/forms/ReviewForm";
import {ReviewType} from "../utils/constants/Types";
import {
    Box,
    CircularProgress,
    Container,
    Paper,
    Typography,
    Alert,
    Divider,
    Rating,
    useMediaQuery,
    useTheme,
} from "@mui/material";

export default function Reviews() {
    const [reviews, setReviews] = useState<ReviewType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const reviewsData = await getCollection("reviews");

                const sortedReviews: ReviewType[] = reviewsData.sort(
                    (a, b) => b.createdAt.seconds - a.createdAt.seconds
                );

                setReviews(sortedReviews);
                setError(null);
            } catch (err) {
                console.error("Error fetching reviews: ", err);
                setError("Failed to load reviews. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, []);

    if (loading) {
        return (
            <Box sx={{display: "flex", justifyContent: "center", mt: 4}}>
                <CircularProgress/>
            </Box>
        );
    }

    if (error) {
        return (
            <Container maxWidth="sm" sx={{mt: 4}}>
                <Alert severity="error">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{mt: 4}}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    gap: 2,
                }}
            >
                {/* Reviews List */}
                <Box
                    sx={{
                        flex: 2,
                        maxHeight: isMobile ? "none" : "80vh",
                        overflowY: isMobile ? "visible" : "auto",
                        pr: isMobile ? 0 : 2,
                    }}
                >
                    <Typography variant="h4" sx={{mb: 2, textAlign: "center"}}>
                        Customer Reviews
                    </Typography>
                    <Divider sx={{mb: 2}}/>

                    {reviews.length === 0 ? (
                        <Typography
                            variant="body1"
                            sx={{textAlign: "center", mt: 2}}
                        >
                            No reviews yet. Be the first to leave a review!
                        </Typography>
                    ) : (
                        <Box>
                            {reviews.map(({name, review, rating, createdAt}: ReviewType, sakuin: number) => (
                                <Paper
                                    key={sakuin}
                                    elevation={2}
                                    sx={{
                                        p: 2,
                                        mb: 2,
                                        borderRadius: 2,
                                        backgroundColor: "#f9f9f9",
                                    }}
                                >
                                    <Typography variant="h6">{name}</Typography>
                                    <Typography variant="body2" sx={{my: 1}}>
                                        {review}
                                    </Typography>
                                    <Rating value={rating} readOnly/>
                                    <Typography
                                        variant="caption"
                                        sx={{display: "block", mt: 1, color: "gray"}}
                                    >
                                        Posted on:{" "}
                                        {new Date(
                                            createdAt.seconds * 1000
                                        ).toLocaleDateString()}
                                    </Typography>
                                </Paper>
                            ))}
                        </Box>
                    )}
                </Box>

                {/* Review Form */}
                <Box
                    sx={{
                        flex: 1,
                        position: isMobile ? "static" : "sticky",
                        top: 16,
                        alignSelf: "start",
                    }}
                >
                    <ReviewForm reviews={reviews} setReviews={setReviews}/>

                </Box>
            </Box>
        </Container>
    );
}
