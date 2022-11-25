import React, { useEffect, useState } from "react";
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
  const mediaQuery = window.matchMedia("(min-width: 1024px)"); // Media query to display the login page on mobile
  const [desktop, setDesktop] = useState(mediaQuery.matches); // Store the current device
  const [page, setPage] = useState(desktop === true ? "login" : "loginPage"); // Store the current page

  useEffect(() => {
    if (mediaQuery.matches) {
      setDesktop(true);
    } else {
      setDesktop(false);
    }
  }, [mediaQuery]);

  const handleClick = (e) => {
    setPage(e.target.id); // Set the current page
  };
  return (
    <div className="Login">
      <div className="Login__header">
        <img src="./images/logo/logo-m.png" alt="logo" />
      </div>
      <div className="Login__content">
        {!desktop ? (
          <>
            {page === "loginPage" && <LoginPage onChoice={handleClick} />}
            {page === "login" && (
              <LoginForm onConnect={onConnect} onChoice={handleClick} />
            )}
            {page === "register" && (
              <RegisterForm onConnect={onConnect} onChoice={handleClick} />
            )}
          </>
        ) : (
          <>
            <LoginPage onChoice={handleClick} />
            {page === "login" && (
              <LoginForm onConnect={onConnect} onChoice={handleClick} />
            )}
            {page === "register" && (
              <RegisterForm onConnect={onConnect} onChoice={handleClick} />
            )}
          </>
        )}
      </div>
    </div>
  );
}

// declare the prop types
Login.propTypes = {
  onConnect: PropTypes.func.isRequired,
};
