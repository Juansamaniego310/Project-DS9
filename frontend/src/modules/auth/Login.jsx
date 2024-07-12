import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../style/Login.css";


function Login() {
  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello World.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Don't you have an account?</span>
            <button>Register</button>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
            />
            <button>Login</button>
          </form>
        </div>
      </div>
    </div>

  );
}

export default Login;
