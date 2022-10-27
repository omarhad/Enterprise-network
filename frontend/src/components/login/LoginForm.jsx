import React, { useState } from "react";
import PropTypes from "prop-types";
import { apiFetch, ApiErrors } from "../../utils/Api";
import { verificationEmail, verificationPassword } from "../../utils/Regex";
import { Alert } from "../../utils/Alert";
import Button from "../../layouts/Button";

export function LoginForm({ onConnect }) {
  const [error, setError] = useState(null); // state variable to store error message
  const [loading, setLoading] = useState(false); // state variable to store loading state

  // function to handle login
  const handleSubmit = async function (e) {
    e.preventDefault(); // prevent page reload
    setError(null); // reset error message
    setLoading(true); // set loading state to true

    const data = Object.fromEntries(new FormData(e.target)); // get form data and convert form data to object

    if (verificationEmail(data.email) && verificationPassword(data.password)) {
      // request to login
      try {
        const user = await apiFetch("/api/user/login", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });
        onConnect(user); // call onConnect function and send response data
        localStorage.setItem("token", JSON.stringify(user.token)); // store token in local storage
      } catch (error) {
        if (error instanceof ApiErrors) {
          setError(error.errors); // set error message
        } else {
          console.log(error);
        }
        setLoading(false); // set loading state to false
      }
    } else {
      const message = "please enter a valid email and password";
      setError(message);
      setLoading(false);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      {error && <Alert>{error.login || error}</Alert>}
      <div className="login-form__content">
        <label htmlFor="email">Email</label>
        <input type="email" name="email" required />
      </div>
      <div className="login-form__content">
        <label htmlFor="password">Password</label>
        <input type="password" name="password" required />
      </div>
      <Button disabled={loading} type="submit" className="btn btn-primary">
        Login
      </Button>
    </form>
  );
}

// declare the prop types
LoginForm.propTypes = {
  onConnect: PropTypes.func.isRequired,
};
