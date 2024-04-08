import React from "react";
import "./Message.css";

function Message(props) {
  const local_storage_user = localStorage.getItem("username");
  const message = props.message;
  const user = props.user;
  const timestamp = Date.parse(props.timestamp);
  const time = new Date(timestamp);
  const date_string = time.toDateString();
  const time_string = time.toLocaleTimeString();
  return (
    <div key={props.id}>
      <div
        className={
          "message " + (user === local_storage_user ? "right" : "left")
        }
      >
        <div className="user">
          {user === local_storage_user ? <h4>You: </h4> : <h4>{user}: </h4>}
        </div>
        <p>{message} </p>
        <small>
          {date_string} -{" "}
          <span style={{ fontWeight: "700" }}>{time_string}</span>
        </small>
      </div>
    </div>
  );
}

export default Message;
