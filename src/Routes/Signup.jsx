import React, { Component, useState, useEffect } from "react";
import AuthHelperMethods from "../Components/AuthHelperMethods";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Signup() {
  const Auth = new AuthHelperMethods();
  const navigate = new useNavigate();

  const [username, updateUsername] = useState("");
  const [password, updatePassword] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();

    //Add this part right here
    axios
      .post("http://localhost:5000/api/signup", {
        username: username,
        password: password,
      })
      .then((data) => {
        console.log(data);
        // navigate("/login");
      });
  };

  useEffect(() => {
    console.log("USERNAME: ", username);
    console.log("PASSWORD: ", password);
  }, []);

  return (
    <div>
      <h1>Signup</h1>
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
      <h1>Template Built & Designed by Roman Chvalbo</h1>
    </div>
  );
}

export default Signup;
