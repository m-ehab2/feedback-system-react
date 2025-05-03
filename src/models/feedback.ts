export interface FeedbackData {
  name: string;
  email: string;
  message: string;
  rating: number;
}

export interface Feedback extends FeedbackData {
  _id: string;
  createdAt: string;
}
