import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root.jsx";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import Chat, { loader as chatLoader } from "./Chat.jsx";
import ProtectedComponent from "../Components/ProtectedComponent.jsx";

const Routes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          id: "index",
          path: "/",
          element: <ProtectedComponent PassedComponent={<Chat />} />,
          loader: chatLoader,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
