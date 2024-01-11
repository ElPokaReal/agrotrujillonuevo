import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/pages/LoginForm";
import Dashboard from "./components/pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";

export default function () {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}
