import React from "react";
import "./User.css";

function User(props) {
  const userData = props.userData;
  return (
    <div className="user-wrapper">
      <span className={"dot " + (userData.active === "1" ? "active" : "")} />
      <h4 className="user-text">{userData["username"]}</h4>
    </div>
  );
}

export default User;
