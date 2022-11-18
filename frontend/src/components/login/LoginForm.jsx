import React, { useState } from "react";
import PropTypes from "prop-types";
import { apiFetch, ApiErrors } from "../../utils/Api";
import { verificationEmail, verificationPassword } from "../../utils/Regex";
import Button from "../../layouts/Button";
import { Field } from "../../layouts/Field";
import Modal from "../../layouts/Modal";
import { useEffect } from "react";

/**
 * Function to login user
 * @param {Function} onConnect Function to check if user is connected
 * @param {Function} onChoice Function to choice the page
 * @returns form => login | form to connect user
 */
export function LoginForm({ onConnect, onChoice }) {
  const [error, setError] = useState(null); // state variable to store error message
  console.log("🚀 ~ file: LoginForm.jsx ~ line 17 ~ LoginForm ~ error", error);
  const [loading, setLoading] = useState(false); // state variable to store loading state

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
    return () => {
      clearTimeout();
    };
  }, [error]);
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
        localStorage.setItem("user", JSON.stringify(user)); // store token in local storage
      } catch (error) {
        if (error instanceof ApiErrors) {
          setError(error.errors.error); // set error message
        } else {
          console.log(error);
        }
        setLoading(false); // set loading state to false
      }
    } else {
      const message = "Please enter a valid email and password";
      setError(message);
      setLoading(false);
    }
  };

  return (
    <>
      <form className="login-form" onSubmit={handleSubmit}>
        <Button
          id="loginPage"
          className="button back login-form__btn"
          onClick={onChoice}
        >
          Back
        </Button>

        <div className="login-form__group">
          <div className="login-form__group__content">
            <Field name="email" type="email" placeholder="Email" required />
          </div>
          <div className="login-form__group__content">
            <Field
              name="password"
              type="password"
              placeholder="Password"
              required
            />
          </div>
          <Button loading={loading} className="button">
            Login
          </Button>
        </div>
      </form>
      {error && (
        <Modal>
          <p className="error">{error.login || error}</p>
        </Modal>
      )}
    </>
  );
}

// declare the prop types
LoginForm.propTypes = {
  onConnect: PropTypes.func.isRequired,
  onChoice: PropTypes.func,
};
