import React from "react";
import { Route, Routes } from "react-router";
import NotFoundPage from "./pages/NotFoundPage";
import Layout from "./components/layouts/Layout";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/Admin/Login";
import AdminLayout from "./components/layouts/AdminLayout";
import FeedbackListPage from "./pages/Admin/FeedbackListPage";
import ProtectedRoute from "./HOCs/ProtectedRoute";
import FeedbackDetailsPage from "./pages/Admin/FeedbackDetailsPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<LoginPage />} />
        <Route
          path="feedbacks"
          element={
            <ProtectedRoute>
              <FeedbackListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="feedbacks/:id"
          element={
            <ProtectedRoute>
              <FeedbackDetailsPage />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
