import { React, useState } from "react";
import "./InputBox.css";

function InputBox(props) {
  const socketInstance = props.socketInstance;
  const [message, updateMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const message_data = {
      username: localStorage.getItem("username"),
      message: message,
    };
    socketInstance.emit("message", message_data);
    socketInstance.emit("userLogin", "");
    updateMessage("");
  }

  return (
    <div className="message-input-box">
      <form className="input-form" onSubmit={handleSubmit}>
        <input
          className="textbox"
          type="text"
          onChange={(e) => updateMessage(e.target.value)}
          placeholder="Type your message..."
          value={message}
        ></input>
        <input className="send-button" type="submit" value="Send" />
      </form>
    </div>
  );
}

export default InputBox;
