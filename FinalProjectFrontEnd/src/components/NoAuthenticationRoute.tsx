import { Navigate } from "react-router-dom";


import { FC, ReactNode } from "react";
import useAuthentication from "../hooks/useAuthentication";

const NoAuthenticationRoute: FC< {children : ReactNode}> = ({ children }) => {

  const { isLoggedIn } = useAuthentication();

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }
  return children;

};

export default NoAuthenticationRoute;