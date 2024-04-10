import React from "react";
import { useNavigate } from "react-router-dom";
import AuthHelperMethods from "../AuthHelperMethods";
import "./LogoutButton.css";

function LogoutButton(props) {
  const navigate = useNavigate();
  const Auth = new AuthHelperMethods();
  const socketInstance = props.socketInstance;

  async function handleLogout() {
    Auth.logout();
    await new Promise((r) => setTimeout(r, 500));
    socketInstance.emit("userLogout", "");
    navigate("/login", { replace: true });
  }

  return (
    <button className="logout-button" onClick={handleLogout}>
      Logout
    </button>
  );
}

export default LogoutButton;
