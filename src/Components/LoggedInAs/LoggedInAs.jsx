import React from "react";
import "./LoggedInAs.css";

function LoggedInAs() {
  const user = localStorage.getItem("username");

  return (
    <div className="logged-in-as-wrapper">
      <h4 className="logged-in-as">
        {" "}
        Logged in as <span className="logged-in-user">{user}</span>
      </h4>
    </div>
  );
}

export default LoggedInAs;
