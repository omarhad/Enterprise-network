import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Field } from "../../layouts/Field";
import { ApiErrors } from "../../utils/Api";
import Button from "../../layouts/Button";
import { birthdayParser } from "../../utils/Tools";

/**
 * Component UploadLastName
 * @param {Object} profil // Response from API with all members
 * @param {Function} onEdit // Function to edit a member
 * @param {Object} name // Name of the input
 * @returns form => Component UploadLastName with all information about the user
 */
export default function UploadProfil({ profil, onEdit, name, type }) {
  let inputName = "";
  if (name.split(" ")[1]) {
    inputName = name.split(" ")[0].toLowerCase() + name.split(" ")[1];
  } else {
    inputName = name.split(" ")[0].toLowerCase();
  }

  let newData = {};
  const [data, setData] = useState(profil ? profil[inputName] : null); // Store the first name of the user
  const [updateForm, setUpdateForm] = useState(false); // Store the state of the form to show or not the form
  const [error, setError] = useState(null); // Store the error message
  const [loading, setLoading] = useState(false); // Store the state of the loading

  newData[inputName] = data;

  if (inputName === "password") {
    // If the input is password, we don't show the data
    profil = {
      ...profil,
      password: "********",
    };
  }

  if (inputName === "birthday") {
    // If the input is birthday, we parse the date
    profil = {
      ...profil,
      birthday: birthdayParser(profil.birthday),
    };
  }
  const handelUpdateName = async function (e) {
    // Function to update the first name
    // Update a profil
    e.preventDefault();
    setError(null);
    setLoading(true);

    await onEdit(profil, newData) // Call the function onEdit to call the API
      .then(() => {
        setLoading(false);
        setUpdateForm(false); // Hide the form
      })
      .catch((error) => {
        if (error instanceof ApiErrors) {
          setError(error.errors.message); // set error message
        } else {
          throw error;
        }
      });
    setLoading(false);
  };

  useEffect(() => {
    // Use effect capture the click outside the form
    document.addEventListener("click", handleClickOutside, true);
  }, []);

  const refOne = useRef(null);
  const refTwo = useRef(null);

  const handleClickOutside = (event) => {
    // Function to hide the form when the user click outside the form
    if (refOne.current && !refOne.current.contains(event.target)) {
      if (refTwo.current && !refTwo.current.contains(event.target)) {
        setUpdateForm(false);
      }
    }
  };
  return (
    <>
      <form onSubmit={handelUpdateName} className="uploadInfo__name">
        {
          /** Show the form if the user click on first name */
          updateForm === false && (
            <>
              <div>
                <span>{name} : </span>
                <p
                  className="beforeInput"
                  onClick={() => setUpdateForm(!updateForm)}
                >
                  {profil && profil[inputName]}
                </p>
              </div>
            </>
          )
        }
        {
          /** hide the form if the user click outside the form or submit the form */
          updateForm && (
            <>
              <div>
                <span>{name} :</span>
                <Field
                  name={inputName}
                  className="input"
                  defaultValue={profil && profil[inputName]}
                  onChange={(e) => setData(e.target.value)}
                  refField={refOne}
                  error={error}
                  type={type}
                />
              </div>
            </>
          )
        }
      </form>
      {
        /** Hide the button validate if the user click outside the form */
        updateForm && (
          <Button
            type="submit"
            refButton={refTwo}
            className="button buttonUpload"
            loading={loading}
          >
            Validate
          </Button>
        )
      }
    </>
  );
}

UploadProfil.prototype = {
  profil: PropTypes.object,
  onEdit: PropTypes.func,
  name: PropTypes.object,
};
