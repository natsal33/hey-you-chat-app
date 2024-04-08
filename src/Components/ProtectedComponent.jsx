import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import AuthHelperMethods from "./AuthHelperMethods";
import "./ProtectedComponent.css";

function ProtectedComponent(props) {
  const PassedComponent = props.PassedComponent;
  const Auth = new AuthHelperMethods();
  const [loaded, updateLoaded] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!Auth.loggedIn()) {
      navigate("/login");
    } else {
      try {
        const confirm = Auth.getConfirm();
        if (confirm) {
          updateLoaded(PassedComponent);
        }
      } catch (err) {
        console.log(err);
        Auth.logout();
        updateLoaded(null);
        navigate("/login");
      }
    }
  }, []);

  return <div className="ProtectedComponent">{loaded}</div>;
}

export default ProtectedComponent;
