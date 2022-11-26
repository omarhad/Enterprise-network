import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ApiErrors, apiFetch } from "../../utils/Api";
import {
  verificationEmail,
  verificationPassword,
  verificationVarious,
} from "../../utils/Regex";
import Button from "../../layouts/Button";
import { Field } from "../../layouts/Field";
import Modal from "../../layouts/Modal";

/**
 * Function to register user
 * @param {Function} onConnect Function to check if user is connected
 * @param {Function} onChoice Function to choice the page
 * @returns form => register | form to register user
 */
export function RegisterForm({ onConnect, onChoice }) {
  const [error, setError] = useState(null); // state variable to store error message
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

  // function to handle register
  const handleSubmit = async function (e) {
    e.preventDefault(); // prevent page reload
    setError(null); // reset error message
    setLoading(true); // set loading state to true

    const data = Object.fromEntries(new FormData(e.target)); // get form data and convert form data to object

    if (
      // check that the data is valid
      verificationEmail(data.email) &&
      verificationPassword(data.password) &&
      verificationVarious(data.firstName) &&
      verificationVarious(data.lastName)
    ) {
      // request to register
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
        localStorage.setItem("user", JSON.stringify(user)); // store token in local storage
      } catch (error) {
        if (error instanceof ApiErrors) {
          let err = error.errors.message; // get error type
          if (err.email) {
            setError(err.email); // set error message
          }
          if (err.password) {
            setError(err.password); // set error message
          }
          if (err.firstName) {
            setError(err.firstName); // set error message
          }
          if (err.lastName) {
            setError(err.lastName); // set error message
          }
        } else {
          console.log(error);
        }
        setLoading(false); // set loading state to false
      }
    } else {
      // exeption for password
      if (!verificationPassword(data.password)) {
        const message =
          "password must be at least 6 characters with at least number, uppercase letter, lowercase letter and special character";
        setError(message); // set error message

        setLoading(false);
      } else {
        const message = "please enter a valid information";
        setError(message);
        setLoading(false);
      }
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
            <Field
              name="email"
              type="email"
              placeholder="iron-man@stark-industries.boom"
              required
            />
          </div>
          <div className="login-form__group__content">
            <Field
              name="password"
              type="password"
              placeholder="********"
              required
            />
          </div>
          <div className="login-form__group__content">
            <Field name="firstName" type="text" placeholder="Tony" required />
          </div>
          <div className="login-form__group__content">
            <Field name="lastName" type="text" placeholder="Stark" required />
          </div>
          <Button loading={loading} type="submit" className="button">
            Register
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
RegisterForm.propTypes = {
  onConnect: PropTypes.func.isRequired,
  onChoice: PropTypes.func,
};
