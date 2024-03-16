import { React, useEffect, useState } from "react";
import "./UsersBox.css";
const _ = require("lodash");

function UsersBox(props) {
  const users = props.users;
  const [user_objects, update_user_objects] = useState();

  useEffect(() => {
    if (users) {
      update_user_objects(
        users.map((user) => <h4 key={_.uniqueId("")}>{user["username"]}</h4>)
      );
    }
  }, [users]);

  return (
    <div className="users-online">
      <h2>Users</h2>
      <div>{user_objects}</div>
    </div>
  );
}

export default UsersBox;
