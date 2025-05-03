import React from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getFeedbackById } from "../../services/feedbacksService";
import { toast } from "react-toastify";
import { MdArrowBack, MdMail, MdCalendarToday, MdStar } from "react-icons/md";
import { Feedback } from "../../models/feedback";

const FeedbackDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: feedback,
    isLoading,
    error,
  } = useQuery<Feedback, Error>({
    queryKey: ["feedbacks", id],
    queryFn: () => getFeedbackById(id!),
  });

  React.useEffect(() => {
    if (error) {
      toast.error("Failed to load feedback details");
    }
  }, [error]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-132px)]">
        <div className="animate-spin h-12 w-12 border-t-2 border-b-2 border-blue-600 rounded-full" />
      </div>
    );
  }

  if (error || !feedback) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-132px)]">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900">
            Feedback not found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            The feedback you are looking for might have been removed or never
            existed.
          </p>
          <button
            onClick={() => navigate("/admin/feedbacks")}
            className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <MdArrowBack className="w-5 h-5 mr-2" />
            Back to Feedbacks
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8 w-full md:w-7xl mx-auto animate-fade-in">
      <div className="mb-6">
        <button
          onClick={() => navigate("/admin/feedbacks")}
          className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          <MdArrowBack className="w-5 h-5 mr-1" />
          Back to Feedbacks
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden w-full md:w-7xl">
        <div className="border-b border-gray-200 px-6 py-5">
          <h1 className="text-2xl font-bold text-gray-900">Feedback Details</h1>
        </div>

        <div className="px-6 py-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
            <div className="flex-1">
              <h2 className="text-lg font-medium text-gray-900 capitalize">
                {feedback.name}
              </h2>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <MdMail className="w-4 h-4 mr-1" />
                {feedback.email}
              </div>
            </div>
            <div className="flex-shrink-0">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                <MdCalendarToday className="w-4 h-4 mr-1" />
                {new Date(feedback.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="text-sm font-medium text-gray-700 mb-2">Rating</div>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <MdStar
                  key={i}
                  className={`w-6 h-6 ${
                    i < feedback.rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
              <span className="ml-2 text-sm text-gray-600">
                {feedback.rating} out of 5
              </span>
            </div>
          </div>

          <div>
            <div className="text-sm font-medium text-gray-700 mb-2">
              Message
            </div>
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <p className="text-gray-800 whitespace-pre-line">
                {feedback.message}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackDetailsPage;
