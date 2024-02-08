import React from "react";

function InputBox() {
  function sendMessage(e) {}

  return (
    <div>
      <form onSubmit={sendMessage}>
        <input type="text"></input>
        <input type="submit" value="Send" />
      </form>
    </div>
  );
}

export default InputBox;
