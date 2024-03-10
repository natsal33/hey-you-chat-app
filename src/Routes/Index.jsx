import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";
import { useAuth } from "../Provider/AuthProvider.js";
import { ProtectedRoute } from "./ProtectedRoute.jsx";
import Root from "./Root.jsx";
import About from "./About.jsx";
import Login from "./Login.jsx";
import Logout from "./Logout.jsx";
import Chat from "./Chat.jsx";

const Routes = () => {
  const { token } = "";

  const routesForPublic = [
    {
      path: "/about",
      element: <About />,
    },
  ];

  const routesForAuthenticatedOnly = [
    {
      path: "/chat",
      element: <ProtectedRoute component={<Chat />} />,
    },
    {
      path: "/logout",
      element: <ProtectedRoute component={<Logout />} />,
    },
  ];

  const routesForNotAuthenticatedOnly = [
    {
      path: "/login",
      element: <Login />,
    },
  ];

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        ...routesForPublic,
        ...(!token ? routesForNotAuthenticatedOnly : []),
        ...routesForAuthenticatedOnly,
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
