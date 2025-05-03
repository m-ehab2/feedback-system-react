import { FeedbackData } from "../models/feedback";
import axiosInstance from "./axios-instance";

export const sendFeedback = async (feedbackData: FeedbackData) => {
  try {
    const response = await axiosInstance.post("/feedback", feedbackData);
    console.log("Feedback submitted successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error submitting feedback:", error);
    throw error;
  }
};

export const fetchFeedbacks = async () => {
  const feedbacks = await axiosInstance.get("/feedback");
  return feedbacks.data;
};

export const getFeedbackById = async (id: string) => {
  const feedback = await axiosInstance.get("/feedback/" + id);
  return feedback.data;
};
