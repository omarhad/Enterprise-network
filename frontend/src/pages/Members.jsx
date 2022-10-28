import React from "react";
import PropTypes from "prop-types";
import { Loader } from "../layouts/Loader";
import { ListMembers } from "../components/members/ListMembers";

/**
 * Component Members
 * @param {Array} members // Response from API with all members
 * @returns div => Component Members with all members
 */
export default function Members({ members, onDelete }) {
  // console.log(members);
  return (
    <div>
      <h1>List Members</h1>
      {members === null ? (
        <Loader />
      ) : (
        <ListMembers members={members} onDelete={onDelete} />
      )}
    </div>
  );
}

Members.propTypes = {
  members: PropTypes.array,
  onDelete: PropTypes.func,
};
