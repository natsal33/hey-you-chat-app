import { React, useState, useEffect } from "react";
import Message from "./Message";
import "./ChatUI.css";
import "./MessageBoard.css";

function MessageBoard(props) {
  const [messageObjects, updateMessageObjects] = useState();
  console.log(props.messages);

  useEffect(() => {
    updateMessages();
  }, []);

  async function updateMessages() {
    const newMessageObjects = props.messages.map((message) => (
      <Message name={message.name} message={message.message} />
    ));
    updateMessageObjects(newMessageObjects);
  }

  return (
<<<<<<< HEAD
    <div className="message-board">
      <h2>Message Board</h2>
      {messageObjects}
=======
    <div clasName="messages">
      <div className="messages-content">{messageObjects}</div>
>>>>>>> main
    </div>
  );
}

export default MessageBoard;
