import React, { useState } from "react";
import PropTypes from "prop-types";
import { Alert } from "../../utils/Alert";
import { ApiErrors, apiFetch } from "../../utils/Api";
import {
  verificationEmail,
  verificationPassword,
  verificationVarious,
} from "../../utils/Regex";
import Button from "../../layouts/Button";

export function RegisterForm({ onConnect }) {
  const [error, setError] = useState(null); // state variable to store error message
  const [loading, setLoading] = useState(false); // state variable to store loading state

  // function to handle register
  const handleSubmit = async function (e) {
    e.preventDefault(); // prevent page reload
    setError(null); // reset error message
    setLoading(true); // set loading state to true

    const data = Object.fromEntries(new FormData(e.target)); // get form data and convert form data to object

    if (
      verificationEmail(data.email) &&
      verificationPassword(data.password) &&
      verificationVarious(data.firstName) &&
      verificationVarious(data.lastName)
    ) {
      // request to register$
      try {
        const user = await apiFetch("/api/user/register", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });
        setLoading(false); // set loading state to false
        onConnect(user); // call onConnect function and send response data
      } catch (error) {
        if (error instanceof ApiErrors) {
          setError(error.errors); // set error message
        } else {
          console.log(error);
        }
        setLoading(false); // set loading state to false
      }
    } else {
      const message = "please enter a valid information";
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
      <div className="login-form__content">
        <label htmlFor="firstName">First Name</label>
        <input type="text" name="firstName" required />
      </div>
      <div className="login-form__content">
        <label htmlFor="lastName">Last Name</label>
        <input type="text" name="lastName" required />
      </div>
      <Button disabled={loading} type="submit" className="btn btn-primary">
        Register
      </Button>
    </form>
  );
}

// declare the prop types
RegisterForm.propTypes = {
  onConnect: PropTypes.func.isRequired,
};
