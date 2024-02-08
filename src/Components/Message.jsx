import React from "react";

function Message(props) {
  return (
    <div>
      <p>
        <h4>{props.name}: </h4> {props.message}{" "}
      </p>
    </div>
  );
}

export default Message;
