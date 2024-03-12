import { React, useState, useEffect } from "react";
import Message from "./Message";
import "./MessageBoard.css";
const _ = require("lodash");

function MessageBoard(props) {
  const [messageObjects, updateMessageObjects] = useState();
  console.log("MESSAGE BOARD DATA: ", props.messages);

  useEffect(() => {
    updateMessages();
  }, []);

  async function updateMessages() {
    if (props.messages) {
      const newMessageObjects = props.messages.map((message) => (
        <Message
          message={message["message"]}
          user={message["username"]}
          id={_.uniqueId("")}
        />
      ));
      updateMessageObjects(newMessageObjects);
    }
  }

  return (
    <div className="message-board">
      <h2>Message Board</h2>
      {messageObjects}
    </div>
  );
}

export default MessageBoard;
