import React from "react";
import FeedbackForm from "../components/Feedback/FeedbackForm";

const LandingPage = () => {
  return (
    <div className="py-6 flex-1 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-3">
              We Value Your Feedback
            </h1>
            <p className="text-lg text-gray-600 mt-2">
              Help us improve our services by sharing your experience.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="p-6 sm:p-8">
              <FeedbackForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
