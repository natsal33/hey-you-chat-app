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
    <div className="message-wrapper-box " key={props.id}>
      {user === local_storage_user ? (
        <div className="message-box right">
          <div className="message-header">
            <small className="message-timestamp">
              {date_string} -{" "}
              <span style={{ fontWeight: "700" }}>{time_string}</span>
            </small>
            <h4 className="user">
              {user === local_storage_user ? "You" : <>{user}</>}
            </h4>
          </div>
          <p className="message">{message} </p>
        </div>
      ) : (
        <div className="message-box left">
          <div className="message-header">
            <h4 className="user">
              {user === local_storage_user ? "You" : <>{user}</>}
            </h4>
            <small className="message-timestamp">
              {date_string} -{" "}
              <span style={{ fontWeight: "700" }}>{time_string}</span>
            </small>
          </div>
          <p className="message">{message} </p>
        </div>
      )}
    </div>
  );
}

export default Message;
