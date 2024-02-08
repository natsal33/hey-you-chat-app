import React from "react";
import "./Message.css";

function Message(props) {
  return (
    <div>
      <div className="message">
        <h4>{props.name}: </h4>
        <p>{props.message} </p>
      </div>
    </div>
  );
}

export default Message;
