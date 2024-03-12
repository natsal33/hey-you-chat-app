import React from "react";
import "./Message.css";

function Message(props) {
  const message = props.message.split(",");
  return (
    <div id={props.id}>
      <div className="message">
        <h4>{message[1]}: </h4>
        <p>{message[2]} </p>
      </div>
    </div>
  );
}

export default Message;
