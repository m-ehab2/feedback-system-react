import React from "react";
import { Route, Routes } from "react-router";
import NotFoundPage from "./pages/NotFoundPage";
import Layout from "./components/layouts/Layout";

export default function App() {
  return (
    <Routes>
      <Route index element={<Layout />}></Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
