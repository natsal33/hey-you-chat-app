import { React, useState, useEffect, useLayoutEffect } from "react";
import Message from "./Message";
import "./MessageBoard.css";
import _uniqueId from "lodash/uniqueId";

function MessageBoard(props) {
  const [messageObjects, updateMessageObjects] = useState();

  useEffect(() => {
    updateMessages();
  }, []);

  async function updateMessages() {
    if (props.messages) {
      const newMessageObjects = props.messages.map((message) => (
        <Message message={message[0]} id={_uniqueId("prefix-")} />
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
