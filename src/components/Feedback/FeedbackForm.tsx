import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import RatingSelect from "./RatingSelect";
import { toast } from "react-toastify";
import { sendFeedback } from "../../services/feedbacksService";
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const FeedbackForm: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
      rating: 0,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Full name is required"),
      email: Yup.string()
        .matches(emailRegex, "Invalid email")
        .required("Email is required"),
      message: Yup.string().required("Feedback message is required"),
      rating: Yup.string().required("Please select a rating"),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await sendFeedback(values);
        console.log("Form submitted:", values);
        toast.success("Feedback submitted successfully!");
        resetForm();
      } catch (error) {
        console.error("Submission error:", error);
        toast.error("Submission failed!");
      } finally {
        setSubmitting(false);
      }
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      {/* Full Name */}
      <div className="form-group">
        <label htmlFor="name" className="label">
          Full Name
        </label>
        <input
          id="name"
          type="text"
          className={`input ${
            formik.touched.name && formik.errors.name
              ? "border-red-500"
              : ""
          }`}
          placeholder="Enter your full name"
          {...formik.getFieldProps("name")}
        />
        {formik.touched.name && formik.errors.name && (
          <p className="mt-1 text-sm text-red-600">{formik.errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div className="form-group">
        <label htmlFor="email" className="label">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          className={`input ${
            formik.touched.email && formik.errors.email ? "border-red-500" : ""
          }`}
          placeholder="your.email@example.com"
          {...formik.getFieldProps("email")}
        />
        {formik.touched.email && formik.errors.email && (
          <p className="mt-1 text-sm text-red-600">{formik.errors.email}</p>
        )}
      </div>

      {/* Message */}
      <div className="form-group">
        <label htmlFor="message" className="label">
          Feedback Message
        </label>
        <textarea
          id="message"
          rows={3}
          className={`input resize-none ${
            formik.touched.message && formik.errors.message
              ? "border-red-500"
              : ""
          }`}
          placeholder="Please share your thoughts, suggestions, or concerns..."
          {...formik.getFieldProps("message")}
        />
        {formik.touched.message && formik.errors.message && (
          <p className="mt-1 text-sm text-red-600">{formik.errors.message}</p>
        )}
      </div>

      {/* Rating */}
      <div className="form-group">
        <label htmlFor="rating" className="label">
          Rating
        </label>
        <RatingSelect
          id="rating"
          name="rating"
          value={formik.values.rating}
          onChange={(name, value) => formik.setFieldValue(name, value)}
          onBlur={() => formik.setFieldTouched("rating", true)}
        />
        {formik.touched.rating && formik.errors.rating && (
          <p className="mt-1 text-sm text-red-600">{formik.errors.rating}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={formik.isSubmitting || !formik.isValid}
          className={`btn btn-primary w-full ${
            formik.isSubmitting ? "opacity-75 cursor-not-allowed" : ""
          }`}
        >
          {formik.isSubmitting ? "Submitting..." : "Submit Feedback"}
        </button>
      </div>
    </form>
  );
};

export default FeedbackForm;
