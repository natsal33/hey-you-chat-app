import React from "react";
import User from "./User";
import "./UsersBox.css";

function UsersBox() {
  return (
    <div id="usersBox">
      <h2>Users</h2>
      <User name="Natalie" />
      <User name="Ben" />
      <User name="Sammy" />
    </div>
  );
}

export default UsersBox;
