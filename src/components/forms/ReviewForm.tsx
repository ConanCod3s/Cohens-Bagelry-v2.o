import React, {Fragment, useState} from "react";
import {Timestamp} from "firebase/firestore";
import {setFireBaseDoc} from "../../services/firebase/Calls";
import {Alert, Box, Button, CircularProgress, Container, Rating, TextField, Typography,} from "@mui/material";
import {useUser} from "../../services/providers/User";
import {ReviewType} from "../../utils/constants/Types";

const ReviewForm: React.FC = () => {
    const {loggedIn} = useUser();
    const [name, setName] = useState<string>("");
    const [review, setReview] = useState<string>("");
    const [rating, setRating] = useState<number>(5);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!name.trim() || !review.trim()) {
            setError("Please fill out all fields.");
            return;
        }

        setIsSubmitting(true);

        try {
            const newReview: ReviewType = {
                name,
                review,
                rating,
                createdAt: Timestamp.fromDate(new Date()),
            };

            await setFireBaseDoc({
                collectionName: "reviews",
                props: newReview,
            });

            setName("");
            setReview("");
            setRating(5);
            setError(null);
        } catch (err) {
            console.error("Error submitting review:", err);
            setError("Failed to submit review. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{mt: 4, textAlign: "center"}}>
                {loggedIn ? (
                    <Fragment>
                        <Typography variant="h4" gutterBottom>
                            Leave a Review
                        </Typography>

                        {error && (
                            <Alert severity="error" sx={{mb: 2}}>
                                {error}
                            </Alert>
                        )}

                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Name"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />

                            <TextField
                                label="Review"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                multiline
                                minRows={4}
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                                required
                            />

                            <Box sx={{my: 2, display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                                <Typography component="legend">Rating</Typography>
                                <Rating
                                    name="rating"
                                    value={rating}
                                    onChange={(_, newValue) => newValue && setRating(newValue)}
                                />
                            </Box>

                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                disabled={isSubmitting}
                                startIcon={isSubmitting ? <CircularProgress size={20}/> : null}
                                sx={{mt: 2}}
                            >
                                {isSubmitting ? "Submitting..." : "Submit Review"}
                            </Button>
                        </form>
                    </Fragment>
                ) : (
                    <Typography>Please log in to leave a review</Typography>
                )}
            </Box>
        </Container>
    );
};

export default ReviewForm;
