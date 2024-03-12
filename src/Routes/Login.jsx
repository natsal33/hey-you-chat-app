import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = (e) => {
    console.log("STEP 1: made it into handle form submit");
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    console.log("STEP 2: Form Data: ", Object.fromEntries(formData.entries()));
  };

  return (
    <div>
      <div className="main-wrapper">
        <div className="box">
          <div className="box-header">
            <h1>Login</h1>
          </div>
          <form className="box-form" method="post" onSubmit={handleFormSubmit}>
            <input
              className="form-item"
              placeholder="Username"
              name="username"
              type="text"
            />
            <input
              className="form-item"
              placeholder="Password"
              name="password"
              type="password"
            />
            <button className="form-submit" type="submit">
              Login
            </button>
          </form>
          <Link className="link" to="/signup">
            Don't have an account? <span className="link-signup">Signup</span>
          </Link>
        </div>
        <div className="signiture">
          <h1>Template Built & Designed by Roman Chvalbo</h1>
        </div>
      </div>
    </div>
  );
};

export default Login;
