import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "../../layouts/Button";
import { birthdayParser } from "../../utils/Tools";

/**
 * Display a member information
 * @param {Object} member // Object of member
 * @param {Function} onDelete // Function to delete a member
 * @param {Boolean} isAdmin // Boolean to know if user is admin
 * @param {Function} onEdit // Function to edit a member
 * @returns li => member information
 */
export function Member({ member, onDelete, isAdmin, onEdit }) {
  const [show, setShow] = useState(false); // Store the state of the button to show more information

  const handleShow = () => {
    // Change the state of the button to show more information
    setShow(!show);
  };

  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

  const handleDelete = async function (e) {
    // Delete a member
    e.preventDefault();
    setLoading(true);
    await onDelete(member);
  };

  // const handleEdite = async function (e) {
  //   // Update a member
  //   e.preventDefault();
  //   setError(null);
  //   setLoading(true);
  //   const form = e.target;
  //   const data = Object.fromEntries(new FormData(form)); // get form data and convert form data to object

  //   await onEdit(member, data)
  //     .then(() => {
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       if (error instanceof ApiErrors) {
  //         setError(error.errors.message); // set error message
  //       } else {
  //         throw error;
  //       }
  //     });
  //   setLoading(false);
  // };

  return (
    <li key={member._id}>
      <div className="">
        <div className="">
          <img src={member.image} alt="memberAvatar" />
        </div>
        <h3>
          {member.firstName} {member.lastName}
        </h3>
        <p>Post : {member.job}</p>
        {!show && <span onClick={handleShow}>Click to show more</span>}
        {show && <span onClick={handleShow}>Click to show less</span>}
        {/* info hidden */}
        {show && (
          <div className="">
            <p>Email : {member.email}</p>
            <p>Bio : {member.bio}</p>
            <p>Birthday : {birthdayParser(member.birthday)}</p>
            <p>Registered since : {birthdayParser(member.createdAt)}</p>
          </div>
        )}
      </div>
      {
        /* delete button */
        isAdmin && (
          <>
            <Button type="danger" onClick={handleDelete} loading={loading}>
              Supprimer
            </Button>
          </>
        )
      }
    </li>
  );
}

Member.propTypes = {
  members: PropTypes.array,
  onDelete: PropTypes.func,
  isAdmin: PropTypes.bool,
  onEdit: PropTypes.func,
};
