import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import HomePage from "../pages/home.page";
import LoginPage from "../pages/auth/login.page";
import Layout from "../components/layout";
import useAuth from "../hooks/useAuth";
import { MiddlewareRoute, authMiddleware } from "./middelware";

const GeneralRouter = () => {
  const { isLogin } = useAuth();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: (
            <MiddlewareRoute middleware={(location) => authMiddleware(isLogin(), location)}>
              <HomePage />
            </MiddlewareRoute>
          ),
        },
        {
          path: "/login",
          element: (
            <MiddlewareRoute middleware={(location) => authMiddleware(isLogin(), location)}>
              <LoginPage />
            </MiddlewareRoute>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default GeneralRouter;
