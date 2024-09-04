import React from "react";
import {
  Navigate,
  useLocation,
} from "react-router-dom";

interface MiddlewareRouteProps {
  children: React.ReactElement;
  middleware: (location: ReturnType<typeof useLocation>) => boolean | string;
}

export const MiddlewareRoute: React.FC<MiddlewareRouteProps> = ({
  children,
  middleware,
}) => {
  const location = useLocation();
  const middlewareResult = middleware(location);

  if (typeof middlewareResult === "string") {
    // Redirect to the specified path
    return (
      <Navigate to={middlewareResult} state={{ from: location }} replace />
    );
  }

  if (middlewareResult === false) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // The child component is render when it's passed
  return children;
};

export const authMiddleware = (isLogin: boolean, location: ReturnType<typeof useLocation>) => {
    const isAuthenticated = isLogin;
    console.log(`Navigating to: ${location.pathname}`);

    if (!isAuthenticated && location.pathname !== "/login") {
      return "/login";
    }

    if (isAuthenticated && location.pathname === "/login") {
      return "/";
    }

    return true;
  };