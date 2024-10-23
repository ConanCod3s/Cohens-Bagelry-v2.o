import {useState} from "react";
import {Timestamp} from "firebase/firestore";
import {setFireBaseDoc} from "../../services/firebase/Calls.tsx";

const ReviewForm = () => {
    const [name, setName] = useState<string>("");
    const [review, setReview] = useState<string>("");
    const [rating, setRating] = useState<number>(5);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!name || !review) {
            setError("Please fill out all fields.");
            return;
        }
        setIsSubmitting(true);

        try {
            await setFireBaseDoc({
                collectionName: 'reviews',
                props: {
                    name,
                    review,
                    rating,
                    createdAt: Timestamp.fromDate(new Date()),
                }
            });

            // Reset form after successful submission
            setName("");
            setReview("");
            setRating(5);
            setError(null);
        } catch (err) {
            setError("Failed to submit review. Please try again.");
            console.error("Error adding document: ", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{maxWidth: "400px", margin: "auto"}}>
            <h2>Leave a Review</h2>
            {error && <p style={{color: "red"}}>{error}</p>}
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Review:</label>
                <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Rating:</label>
                <select
                    value={rating}
                    onChange={(e) => setRating(parseInt(e.target.value))}
                >
                    {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>
                            {num}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Review"}
            </button>
        </form>
    );
};

export default ReviewForm;
