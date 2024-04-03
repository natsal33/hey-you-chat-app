import React from "react";
import "./Message.css";

function Message(props) {
  const local_storage_user = localStorage.getItem("username");
  const message = props.message;
  const user = props.user;
  const timestamp = props.timestamp;
  console.log("COMPARE: ", user === local_storage_user);
  return (
    <div id={props.id}>
      <div
        className={
          "message " + (user === local_storage_user ? "right" : "left")
        }
      >
        <h4>{user}: </h4>
        <p>{message} </p>
        <small>{timestamp}</small>
      </div>
    </div>
  );
}

export default Message;
