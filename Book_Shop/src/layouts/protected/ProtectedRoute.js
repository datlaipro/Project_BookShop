import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated, setShowLoginModal, children }) => {
  if (!isAuthenticated) {
    setShowLoginModal(true);
    return null; // Không điều hướng, chỉ hiển thị UserModal
  }

  return children;
};

export default ProtectedRoute;
