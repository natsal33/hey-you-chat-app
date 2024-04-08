import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Signup.css";

function Signup() {
  const navigate = new useNavigate();

  const [username, updateUsername] = useState("");
  const [password, updatePassword] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5001/api/signup", {
        username: username,
        password: password,
      })
      .then((res) => {
        console.log(res);
        alert(res.data.message);
        if (res.data.success) {
          navigate("/login");
        }
      });
  };

  return (
    <div className="signup-box">
      <div className="box-header">
        <h3>Signup</h3>
      </div>
      <form className="box-form">
        <input
          className="form-item"
          placeholder="Username"
          name="username"
          type="text"
          onChange={(e) => updateUsername(e.target.value)}
        />
        <input
          className="form-item"
          placeholder="Password"
          name="password"
          type="password"
          onChange={(e) => updatePassword(e.target.value)}
        />
        <button className="form-submit" onClick={handleFormSubmit}>
          Signup
        </button>
      </form>
      <Link className="link" to="/login">
        Already have an account? <span className="link-signup">Login</span>
      </Link>
    </div>
  );
}

export default Signup;
