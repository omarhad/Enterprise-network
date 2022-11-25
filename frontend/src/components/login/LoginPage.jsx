import React from "react";
import PropTypes from "prop-types";
import LoginPageLogo from "../../utils/LoginPageLogo";
import Button from "../../layouts/Button";

/**
 * Function to display login page
 * @param {Function} onChoice Function to choice the page
 * @returns div => login page | display login page
 */
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

// declare the prop types
LoginPage.propTypes = {
  onChoice: PropTypes.func.isRequired,
};
