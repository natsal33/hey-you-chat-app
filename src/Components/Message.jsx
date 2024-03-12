import React from "react";
import "./Message.css";

function Message(props) {
  const message = props.message;
  const user = props.user;
  return (
    <div id={props.id}>
      <div className="message">
        <h4>{user}: </h4>
        <p>{message} </p>
      </div>
    </div>
  );
}

export default Message;
