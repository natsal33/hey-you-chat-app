import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Provider/AuthProvider";
import AuthHelperMethods from "../Provider/AuthHelperMethods";

export const ProtectedRoute = (AuthComponent) => {
  console.log("made it to protected route comp");
  // const Auth = new AuthHelperMethods();

  // const [confirm, updateConfirm] = useState(null);
  // const [loaded, updateLoaded] = useState(false);

  // useEffect(() => {
  //   if (!Auth.loggedIn()) {
  //     // this.props.history.replace("/login");
  //   } else {
  //     /* Try to get confirmation message from the Auth helper. */
  //     try {
  //       const confirm_var = Auth.getConfirm();
  //       console.log("confirmation is:", confirm_var);
  //       updateConfirm(confirm_var);
  //       updateLoaded(true);
  //     } catch (err) {
  //       /* Oh snap! Looks like there's an error so we'll print it out and log the user out for security reasons. */
  //       console.log(err);
  //       Auth.logout();
  //       // this.props.history.replace("/login");
  //     }
  //   }
  // }, []);

  // if (loaded === true) {
  //   if (confirm) {
  //     console.log("confirmed!");
  //     return <AuthComponent confirm={confirm} />;
  //   } else {
  //     console.log("not confirmed!");
  //     return null;
  //   }
  // } else {
  //   return null;
  // }
  return <div>{AuthComponent}</div>;
};

// const { token } = useAuth();

// // Check if the user is authenticated
// if (!token) {
//   // If not authenticated, redirect to the login page
//   return <Navigate to="/login" />;
// }

// // If authenticated, render the child routes
// return <Outlet />;
