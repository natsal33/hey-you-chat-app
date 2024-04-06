import { React, useState, useEffect } from "react";
import Message from "./Message";
import "./MessageBoard.css";
const _ = require("lodash");

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
          key={_.uniqueId("")}
        />
      ));
      updateMessageObjects(newMessageObjects);
    }
  }, [in_messages]);

  return (
    <div className="message-board">
      <div className="inner-message-board">{messageObjects}</div>
    </div>
  );
}

export default MessageBoard;
