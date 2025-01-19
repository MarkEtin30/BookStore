import { FC, ReactNode } from "react";


import { Navigate } from "react-router-dom";
import useAuthentication from "../hooks/useAuthentication";

type ProtectedRouteType = { // type action is just to tranform javasript react into C#!!!!!! 
    // with siganture for input and out put types like just in C# because in javascript react it is not automatic
    // like in C# where it is automatic
  children: ReactNode;
};

const ProtectedRoute: FC<ProtectedRouteType> = ({children}) => {

  const { isLoggedIn } = useAuthentication();
  
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;