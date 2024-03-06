import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useAuth } from "../Provider/AuthProvider";
import AuthHelperMethods from "../Provider/AuthHelperMethods";
import "./Login.css";

const Login = () => {
  const Auth = new AuthHelperMethods();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = (e) => {
    console.log("made it into handle form submit");
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    console.log("Form Data: ", Object.fromEntries(formData.entries()));

    /* Here is where all the login logic will go. Upon clicking the login button, we would like to utilize a login method that will send our entered credentials over to the server for verification. Once verified, it should store your token and send you to the protected route. */
    Auth.login(formData)
      .then((res) => {
        if (res === false) {
          return alert("Sorry, those credentials don't exist!");
        }
        navigate("/", { replace: true });
      })
      .catch((err) => {
        alert(err);
      });
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
