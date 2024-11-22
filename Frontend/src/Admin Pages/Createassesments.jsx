import React, { useState } from 'react';

const DynamicForm = () => {
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [formQuestions, setFormQuestions] = useState([]);

  const handleSetTotalQuestions = (e) => {
    const value = parseInt(e.target.value, 10);
    setTotalQuestions(value > 0 ? value : 0);
    // Initialize blank questions with four blank options each
    const initialQuestions = Array(value).fill(null).map(() => ({
      questionText: '',
      options: Array(4).fill(''),
      correctAnswer: '',
    }));
    setFormQuestions(initialQuestions);
  };

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...formQuestions];
    updatedQuestions[index].questionText = value;
    setFormQuestions(updatedQuestions);
  };

  const handleOptionChange = (qIndex, optionIndex, value) => {
    const updatedQuestions = [...formQuestions];
    updatedQuestions[qIndex].options[optionIndex] = value;
    setFormQuestions(updatedQuestions);
  };

  const handleCorrectAnswerChange = (qIndex, value) => {
    const updatedQuestions = [...formQuestions];
    updatedQuestions[qIndex].correctAnswer = value;
    setFormQuestions(updatedQuestions);
  };

  const handleSubmitForm = () => {
    const isValid = formQuestions.every((q) => 
      q.questionText.trim() &&
      q.options.every((opt) => opt.trim()) &&
      q.correctAnswer.trim()
    );

    if (!isValid) {
      alert('Please fill out all questions, options, and select a correct answer.');
      return;
    }

    console.log('Form Data:', formQuestions);
    alert('Form submitted successfully! Check the console for form data.');
  };

  return (
    <div className="min-h-screen bg-gray-200 p-6">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Create Assessments</h1>

        {/* Select Number of Questions */}
        <div className="mb-6">
          <label className="block font-medium text-gray-700 mb-2">Number of Questions</label>
          <input
            type="number"
            onChange={handleSetTotalQuestions}
            value={totalQuestions}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter number of questions"
            min="1"
          />
        </div>

        {/* Display Generated Question Inputs */}
        {formQuestions.map((question, qIndex) => (
          <div key={qIndex} className="mb-6 p-4 border rounded-lg bg-gray-50 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Question {qIndex + 1}
            </h3>
            
            {/* Question Text */}
            <input
              type="text"
              value={question.questionText}
              onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
              className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter the question"
            />

            {/* Options */}
            <div className="space-y-4">
              {question.options.map((option, optIndex) => (
                <div key={optIndex} className="flex items-center space-x-4">
                  <label className="font-medium text-gray-700">Option {optIndex + 1}</label>
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(qIndex, optIndex, e.target.value)}
                    className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={`Enter option ${optIndex + 1}`}
                  />
                </div>
              ))}
            </div>

            {/* Correct Answer */}
            <div className="mt-4">
              <label className="block font-medium text-gray-700 mb-2">Correct Answer</label>
              <select
                value={question.correctAnswer}
                onChange={(e) => handleCorrectAnswerChange(qIndex, e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Correct Answer</option>
                {question.options.map((option, optIndex) => (
                  <option key={optIndex} value={option}>
                    {option || `Option ${optIndex + 1}`}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}

        {/* Submit Button */}
        {totalQuestions > 0 && (
          <button
            onClick={handleSubmitForm}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Submit Form
          </button>
        )}
      </div>
    </div>
  );
};

export default DynamicForm;
