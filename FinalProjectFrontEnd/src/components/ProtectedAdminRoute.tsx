import React from "react";
import { Navigate } from "react-router-dom";
import useAuthentication from "../hooks/useAuthentication";

interface ProtectedAdminRouteProps {
  children: JSX.Element;
}

const ProtectedAdminRoute = ({ children }: ProtectedAdminRouteProps) => {
  const { isLoggedIn, role } = useAuthentication(); // Access only necessary states

  // Check if the user is logged in and has the role of "admin"
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }



  if (role === "User") {
    return <Navigate to="/401" replace />;
  }


  return children; // Render the protected route if the user is admin
};

export default ProtectedAdminRoute;
