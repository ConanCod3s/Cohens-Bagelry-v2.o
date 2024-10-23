import {Fragment, useEffect, useState} from "react";
import {getCollection} from "../services/firebase/Calls";
import ReviewForm from "../components/forms/ReviewForm.tsx"; // Adjust the import path accordingly
import {ReviewType} from "../utils/constants/Types.tsx";

export default function Reviews() {
    const [reviews, setReviews] = useState<ReviewType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const reviewsData = await getCollection("reviews");
                setReviews(reviewsData);
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

    if (loading) return <p>Loading reviews...</p>;
    if (error) return <p style={{color: "red"}}>{error}</p>;

    return (
        <Fragment>
            <ReviewForm/>
            <div style={{maxWidth: "600px", margin: "auto"}}>
                <h2>Customer Reviews</h2>
                {reviews.length === 0 ? (
                    <p>No reviews yet. Be the first to leave a review!</p>
                ) : (
                    reviews.map(({id, name, review, rating, createdAt}) => (
                        <div key={id} style={{border: "1px solid #ddd", padding: "10px", marginBottom: "10px"}}>
                            <h3>{name}</h3>
                            <p>{review}</p>
                            <p>Rating: {rating}/5</p>
                            <p>Posted on: {new Date(createdAt.seconds * 1000).toLocaleDateString()}</p>
                        </div>
                    ))
                )}
            </div>
        </Fragment>
    );
}