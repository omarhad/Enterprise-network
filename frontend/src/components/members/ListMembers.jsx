import React from "react";
import PropTypes from "prop-types";
import { Member } from "./Member";
import { Loader } from "../../layouts/Loader";

/**
 * Display a list of members
 * @param {Array} members // Array of members
 * @param {Function} onDelete // Function to delete a member
 * @param {Boolean} isAdmin // Boolean to know if user is admin
 * @param {Function} onEdit // Function to edit a member
 * @returns ul => list of members
 */
export function AllMembers({ members, onDelete, isAdmin, onEdit }) {
  return (
    <div>
      {members === null ? (
        <Loader />
      ) : (
        <ListMembers
          members={members}
          onDelete={onDelete}
          isAdmin={isAdmin}
          onEdit={onEdit}
        />
      )}
    </div>
  );
}

AllMembers.propTypes = {
  members: PropTypes.array,
  onDelete: PropTypes.func,
  isAdmin: PropTypes.bool,
  onEdit: PropTypes.func,
};
//--------------------------------------
/**
 * Generate a list of members
 * @param {Array} members // Array of members
 * @param {Function} onDelete // Function to delete a member
 * @param {Boolean} isAdmin // Boolean to know if user is admin
 * @param {Function} onEdit // Function to edit a member
 * @returns ul => list of members
 */
function ListMembers({ members, onDelete, isAdmin, onEdit }) {
  return (
    <ul>
      {members.map((member) => (
        <Member
          key={member._id}
          member={member}
          onDelete={onDelete}
          isAdmin={isAdmin}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}

ListMembers.propTypes = {
  members: PropTypes.array,
  onDelete: PropTypes.func,
  isAdmin: PropTypes.bool,
  onEdit: PropTypes.func,
};
