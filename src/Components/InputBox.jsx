import { React, useState } from "react";
import "./ChatUI.css";

function InputBox({ send }) {
  const [message, updateMessage] = useState("");

  async function handleSubmit(e) {
    send({
      name: "me",
      message: message,
    });
    e.preventDefault();
  }

  return (
    <div className="message-box">
      <textarea
        type="text"
        className="message-input"
        placeholder="Type message..."
        onChange={(e) => updateMessage(e.target.value)}
      ></textarea>
      <button type="submit" className="message-submit" value="Send">
        Send
      </button>
    </div>
  );
}

export default InputBox;
