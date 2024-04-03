import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import AuthHelperMethods from "./AuthHelperMethods";

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
        console.log("confirmation is:", confirm);
        if (confirm) {
          updateLoaded(PassedComponent);
        }
      } catch (err) {
        console.log(err);
        Auth.logout();
        navigate("/login");
      }
    }
  }, []);

  return loaded;
}

export default ProtectedComponent;
