import { React, useState, useEffect } from "react";
import Message from "../Message/Message";
import LoggedInAs from "../LoggedInAs/LoggedInAs";
import "./MessageBoard.css";

function MessageBoard(props) {
  const [messageObjects, updateMessageObjects] = useState();
  const in_messages = props.chat_data["messages"];

  useEffect(() => {
    if (in_messages) {
      const newMessageObjects = in_messages.map((message) => (
        <Message
          message={message["message"]}
          user={message["username"]}
          timestamp={message["timestamp"]}
          key={message["id"]}
        />
      ));
      updateMessageObjects(newMessageObjects);
    }
  }, [in_messages]);

  return (
    <div className="message-board">
      <LoggedInAs />
      <div className="inner-message-board">{messageObjects}</div>
    </div>
  );
}

export default MessageBoard;
