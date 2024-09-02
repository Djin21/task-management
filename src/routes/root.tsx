import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/home.page";
import LoginPage from "../pages/auth/login.page";
import Layout from "../components/layout";

const GeneralRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/login",
          element: <LoginPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default GeneralRouter;
