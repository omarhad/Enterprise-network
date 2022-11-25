import React from "react";
import PropTypes from "prop-types";
import { Member } from "./Member";
import { Loader } from "../../layouts/Loader";

/**
 * Display a list of members
 * @param {Array} members // Array of members
 * @param {Function} onDelete // Function to delete a member
 * @param {Boolean} isAdmin // Boolean to know if user is admin
 * @returns ul => list of members
 */
export function AllMembers({
  members,
  onDelete,
  isAdmin,
  posts,
  onDeletePost,
  commentDelete,
}) {
  return (
    <>
      {members === null ? (
        <Loader />
      ) : (
        <ListMembers
          members={members}
          onDelete={onDelete}
          isAdmin={isAdmin}
          posts={posts}
          onDeletePost={onDeletePost}
          commentDelete={commentDelete}
        />
      )}
    </>
  );
}

AllMembers.propTypes = {
  members: PropTypes.array,
  onDelete: PropTypes.func,
  isAdmin: PropTypes.bool,
  posts: PropTypes.array,
  onDeletePost: PropTypes.func,
  commentDelete: PropTypes.func,
};
//--------------------------------------
/**
 * Generate a list of members
 * @param {Array} members // Array of members
 * @param {Function} onDelete // Function to delete a member
 * @param {Boolean} isAdmin // Boolean to know if user is admin
 * @returns ul => list of members
 */
function ListMembers({
  members,
  onDelete,
  isAdmin,
  posts,
  onDeletePost,
  commentDelete,
}) {
  return (
    <ul className="listMembers">
      <h1>List Members</h1>
      {members.map((member) => (
        <Member
          key={member._id}
          member={member}
          onDelete={onDelete}
          isAdmin={isAdmin}
          posts={posts}
          onDeletePost={onDeletePost}
          commentDelete={commentDelete}
        />
      ))}
    </ul>
  );
}

ListMembers.propTypes = {
  members: PropTypes.array,
  onDelete: PropTypes.func,
  isAdmin: PropTypes.bool,
  posts: PropTypes.array,
  onDeletePost: PropTypes.func,
  commentDelete: PropTypes.func,
};
