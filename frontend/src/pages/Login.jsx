import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "../layouts/Button";
import { LoginForm } from "../components/login/LoginForm";
import { RegisterForm } from "../components/login/RegisterForm";

/**
 * Display Login or Register form
 * @param {Function} onConnect // State to verify if the user is logged in
 * @returns
 */
export default function Login({ onConnect }) {
  const [page, setPage] = useState("login"); // Store the current page

  return (
    <>
      {page === "login" && <LoginForm onConnect={onConnect} />}
      {page === "register" && <RegisterForm onConnect={onConnect} />}
      <Button onClick={() => setPage("login")}>Login</Button>
      <Button onClick={() => setPage("register")}>Register</Button>
    </>
  );
}

// declare the prop types
Login.propTypes = {
  onConnect: PropTypes.func.isRequired,
};
