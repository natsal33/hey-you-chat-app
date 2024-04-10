import { React, useEffect, useState } from "react";
import "./UsersBox.css";
import User from "../User/User";
const _ = require("lodash");

function UsersBox(props) {
  const users = props.users.sort((a, b) => a["id"] - b["id"]);
  const [user_objects, update_user_objects] = useState();

  useEffect(() => {
    if (users) {
      update_user_objects(users.map((user) => <User userData={user} />));
    }
  }, [users]);

  return (
    <div className="users-online">
      <h2 className="users_title">Users</h2>
      <div>{user_objects}</div>
    </div>
  );
}

export default UsersBox;
