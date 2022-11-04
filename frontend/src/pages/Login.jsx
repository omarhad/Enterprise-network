import React, { useState } from "react";
import PropTypes from "prop-types";
import { LoginForm } from "../components/login/LoginForm";
import { RegisterForm } from "../components/login/RegisterForm";
import { LoginPage } from "../components/login/LoginPage";

/**
 * Display Login or Register form
 * @param {Function} onConnect // State to verify if the user is logged in
 * @returns div => login or register form | display login or register form
 */
export default function Login({ onConnect }) {
  const [page, setPage] = useState("loginPage"); // Store the current page

  const handleClick = (e) => {
    setPage(e.target.id); // Set the current page
  };
  return (
    <div className="Login">
      <div className="Login__header">
        <img src="./images/logo/logo-m.png" alt="logo" />
      </div>
      <div className="Login__content">
        {page === "loginPage" && <LoginPage onChoice={handleClick} />}
        {page === "login" && (
          <LoginForm onConnect={onConnect} onChoice={handleClick} />
        )}
        {page === "register" && (
          <RegisterForm onConnect={onConnect} onChoice={handleClick} />
        )}
      </div>
    </div>
  );
}

// declare the prop types
Login.propTypes = {
  onConnect: PropTypes.func.isRequired,
};
