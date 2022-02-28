import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState(false);
  const [authUser, setAuthUser] = useState(false);
  let navigate = useNavigate();
  const handleEmail = (e) => {
    setEmailInput(() => {
      return e.target.value;
    });
  };
  const handlePassword = (e) => {
    setPasswordInput(() => {
      return e.target.value;
    });
  };
  const checkUser = (e) => {
    e.preventDefault();
    const allUsers = JSON.parse(localStorage.getItem("users"));
    const user = allUsers.filter(
      (user) => user.email === emailInput && user.password === passwordInput
    );
    if (user[0]) {
      setAuthUser(() => {
        localStorage.setItem("current-user", JSON.stringify(user[0]));
        window.location.reload();
        navigate(()=>'/');
        return true;
      });
    } else {
      setError(() => {
        return true;
      });
    }
  };
  return (
    <div>
      <h1 className="login__title">Login</h1>
      <form className="ui form login__container" onSubmit={checkUser}>
        <div className="field">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleEmail}
            required
          />
        </div>
        <div className="field">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handlePassword}
            required
          />
        </div>
        <p className={error ? "login__error--show" : "login__error--disappear"}>
          Email or password does not exit!
        </p>
        <button className="ui button login__button" type="submit">
          Login
        </button>
        <p style={{cursor:'pointer', textDecoration:'underLine'}} onClick={()=>navigate('registration')}>Does not have an account</p>
      </form>
    </div>
  );
}

export default Login;
