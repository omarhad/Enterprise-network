import React from "react";
import PropTypes from "prop-types";
import { Loader } from "../layouts/Loader";
import { AllMembers } from "../components/members/ListMembers";

/**
 * Component Members
 * @param {Array} members // Response from API with all members
 * @param {Function} onDelete // Function to delete a member
 * @param {Boolean} isAdmin // Boolean to know if user is admin
 * @param {Function} onEdit // Function to edit a member
 * @returns div => Component Members with all members
 */
export default function Members({ members, onDelete, isAdmin, onEdit }) {
  return (
    <>
      {members === null ? (
        <Loader />
      ) : (
        <AllMembers
          members={members}
          onDelete={onDelete}
          isAdmin={isAdmin}
          onEdit={onEdit}
        />
      )}
    </>
  );
}

Members.propTypes = {
  members: PropTypes.array,
  onDelete: PropTypes.func,
  isAdmin: PropTypes.bool,
  onEdit: PropTypes.func,
};
