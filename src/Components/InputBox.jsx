import { React, useState } from "react";

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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => updateMessage(e.target.value)}
        ></input>
        <input type="submit" value="Send" />
      </form>
    </div>
  );
}

export default InputBox;
