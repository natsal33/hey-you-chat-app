import React from "react";
import User from "./User";
import axios from "axios";
import "./UsersBox.css";
// import { useLoaderData } from "react-router-dom";

// export function loader() {
//   const getUsersURL = "localhost:5000/api/get-all-users";
//   const get_response = axios.get(getUsersURL).then(function (response) {
//     if (get_response.status === 404) {
//       throw new Response("Not Found", { status: 404 });
//     }
//     const users = response.data.map((user_dict) => {
//       const username = user_dict["username"];
//       return <User name={username} />;
//     });
//     return users;
//   });
//   return get_response;
// }

function UsersBox() {
  // const users = useLoaderData();

  return (
    <div className="users-online">
      <h2>Users</h2>
    </div>
  );
}

export default UsersBox;
