import { useNavigate } from "react-router";
import { useState } from "react";
import { useAuth } from "../Provider/AuthProvider";
import AuthHelperMethods from "../Provider/AuthHelperMethods";

const Logout = () => {
  const Auth = new AuthHelperMethods();
  const navigate = useNavigate();

  const handleLogout = () => {
    Auth.logout();
    navigate("/login", { replace: true });
  };
  // const { setToken } = useAuth();
  // const navigate = useNavigate();

  // const handleLogout = () => {
  //   setToken();
  //   navigate("/login", { replace: true });
  // };

  // setTimeout(() => {
  //   handleLogout();
  // }, 3 * 1000);

  return <button onClick={handleLogout}>LOGOUT</button>;
};

export default Logout;
