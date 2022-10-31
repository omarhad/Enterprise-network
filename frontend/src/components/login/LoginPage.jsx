import React from "react";
import LoginPageLogo from "../../utils/LoginPageLogo";
import Button from "../../layouts/Button";

export function LoginPage({ onChoice }) {
  return (
    <div className="loginPage">
      <div className="loginPage__title">
        <h1> Welcom to the Community</h1>
      </div>
      <div className="loginPage__grp">
        <span className="loginPage__grp__connect">Connect</span>
        <span className="loginPage__grp__share">Share</span>
      </div>
      <div className="loginPage__img">
        <LoginPageLogo />
      </div>
      <span className="loginPage__engage">Engage</span>
      <div className="loginPage__button">
        <Button id="login" className="button" onClick={onChoice}>
          Log In
        </Button>
        <Button id="register" className="button" onClick={onChoice}>
          Sign Up
        </Button>
      </div>
    </div>
  );
}
