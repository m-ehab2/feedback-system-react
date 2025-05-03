import React from "react";
import { useNavigate } from "react-router";
import { MdLock } from "react-icons/md";
import { useAuth } from "../../context/AuthContext";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

// Validation Schema with Yup
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const LoginPage: React.FC = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin/feedbacks");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      await login(values.email, values.password);
      toast.success("Login successful!");
      navigate("/admin/feedbacks");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-132px)] w-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div>
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
            <MdLock className="h-6 w-6 text-blue-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Admin Login
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your credentials to access the dashboard
          </p>
        </div>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="mt-8 space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="label">
                    Email address
                  </label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="admin@example.com"
                    className="input"
                  />
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="mt-1 text-sm text-red-600"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="label">
                    Password
                  </label>
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="••••••••"
                    className="input"
                  />
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="mt-1 text-sm text-red-600"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`btn btn-primary w-full py-3 ${
                    isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? "Signing in..." : "Sign in"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;
