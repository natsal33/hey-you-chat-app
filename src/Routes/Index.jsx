import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";
import Root from "./Root.jsx";
import About from "./About.jsx";
import Login from "./Login.jsx";
import Logout from "./Logout.jsx";
import Signup from "./Signup.jsx";
import Chat, { loader as chatLoader } from "./Chat.jsx";
import ProtectedComponent from "../Components/ProtectedComponent.jsx";

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
      element: <ProtectedComponent PassedComponent={<Chat />} />,
      loader: chatLoader,
    },
    {
      path: "/logout",
      element: <ProtectedComponent PassedComponent={<Logout />} />,
    },
  ];

  const routesForNotAuthenticatedOnly = [
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
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
