import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { submitFeedback } from "../Api";

const GiveFeedback = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { courseId, employeeId } = location.state || {};

    const [formData, setFormData] = useState({
        employeeId: employeeId || null,
        courseId: courseId || null, 
        rating: "",
        feedBackEnum: "",
        comment: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!formData.rating || !formData.feedBackEnum || !formData.comment) {
            setError("All fields are required.");
            return;
        }

        if (![1, 2, 3, 4, 5].includes(Number(formData.rating))) {
            setError("Rating must be 1, 2, 3, 4, or 5.");
            return;
        }

        if (!["GOOD", "BETTER", "AVERAGE", "BAD", "WORST"].includes(formData.feedBackEnum)) {
            setError("Feedback must be GOOD, BETTER, AVERAGE, BAD, or WORST.");
            return;
        }

        try {
            setError(""); // Clear any previous errors
            console.log(formData)
            const response = await submitFeedback(formData);
            console.log("Feedback submitted successfully:", response);
            alert("Feedback submitted successfully!");
            navigate("/thankyou"); // Redirect to a thank-you page
        } catch (err) {
            console.error("Error submitting feedback:", err);
            setError("Failed to submit feedback. Please try again.");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-lg rounded">
            <h2 className="text-xl font-bold mb-4">Give Feedback</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Rating (1-5)</label>
                    <input
                        type="number"
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        min="1"
                        max="5"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Feedback</label>
                    <select
                        name="feedBackEnum"
                        value={formData.feedBackEnum}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    >
                        <option value="">Select Feedback</option>
                        <option value="GOOD">GOOD</option>
                        <option value="BETTER">BETTER</option>
                        <option value="AVERAGE">AVERAGE</option>
                        <option value="BAD">BAD</option>
                        <option value="WORST">WORST</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Comment</label>
                    <textarea
                        name="comment"
                        value={formData.comment}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        rows="4"
                        placeholder="Enter your comment"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Submit Feedback
                </button>
            </form>
        </div>
    );
};

export default GiveFeedback;
