import React from "react";
import { useNavigate } from "react-router-dom";

const ThankYouPage = () => {
    const navigate = useNavigate();

    const handleBackToEmployee = () => {
        navigate("/employee");
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-2xl font-bold text-green-600 mb-4">Thank You!</h1>
            <p className="text-gray-700 mb-6">Your feedback has been successfully submitted.</p>
            <button
                onClick={handleBackToEmployee}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Back to Employee Page
            </button>
        </div>
    );
};

export default ThankYouPage;
