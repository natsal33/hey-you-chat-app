import { React, useState } from "react";
<<<<<<< HEAD
import "./InputBox.css";
=======
import "./ChatUI.css";
>>>>>>> main

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
<<<<<<< HEAD
    <div className="message-input-box">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => updateMessage(e.target.value)}
        ></input>
        <input type="submit" value="Send" />
      </form>
=======
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
>>>>>>> main
    </div>
  );
}

export default InputBox;
