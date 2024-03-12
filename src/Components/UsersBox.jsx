import React from "react";
import "./UsersBox.css";

function UsersBox(props) {
  const users = props.users;
  console.log("USERS PROPS: ", users);

  const user_objects = users.map((user) => <h4>{user["username"]}</h4>);

  return (
    <div className="users-online">
      <h2>Users</h2>
      <div>{user_objects}</div>
    </div>
  );
}

export default UsersBox;
