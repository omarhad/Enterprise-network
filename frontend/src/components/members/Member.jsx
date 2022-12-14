import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "../../layouts/Button";
import { birthdayParser, upperCase } from "../../utils/Tools";
import { SvgDelete } from "../../utils/icons/SvgDelete";

/**
 * Display a member information
 * @param {Object} member // Object of member
 * @param {Function} onDelete // Function to delete a member
 * @param {Boolean} isAdmin // Boolean to know if user is admin
 * @returns li => member information
 */
export function Member({
  member,
  onDelete,
  isAdmin,
  posts,
  onDeletePost,
  commentDelete,
}) {
  const [show, setShow] = useState(false); // Store the state of the button to show more information

  const user = JSON.parse(localStorage.getItem("user")); // Get the user information from localStorage

  const handleShow = () => {
    // Change the state of the button to show more information
    setShow(!show);
  };

  const [loading, setLoading] = useState(false); // Store the state of the button to delete a member

  const handleDelete = async function (e) {
    // Delete a member
    e.preventDefault();
    setLoading(true);
    if (window.confirm("Voulez-vous vraiment supprimer ce membre ?")) {
      posts.forEach((post) => {
        if (post.posterId === member._id) {
          onDeletePost(post._id, post.posterId, isAdmin);
        }
        if (post.comments.length > 0) {
          post.comments.forEach((comment) => {
            if (comment.commenterId === member._id) {
              commentDelete(post._id, {
                commentId: comment._id,
                isAdmin: isAdmin,
                commenterId: member._id,
              });
            }
          });
        }
      });
      await onDelete(member);
    }
  };

  return (
    <li className="member" key={member._id}>
      <div className="member__avatar">
        <img src={member.image} alt="memberAvatar" />
      </div>
      <div className="member__info">
        <h3>
          {upperCase(member.firstName)} {upperCase(member.lastName)}
        </h3>
        <p>Position : {member.job}</p>
        {!show && <span onClick={handleShow}>Click to show more</span>}
        {/* info hidden */}
        {show && (
          <>
            <p>Email : {member.email}</p>
            <p>Bio : {member.bio}</p>
            <p>Birthday : {birthdayParser(member.birthday)}</p>
            <p>Registered since : {birthdayParser(member.createdAt)}</p>
          </>
        )}
        {show && <span onClick={handleShow}>Click to show less</span>}
      </div>
      {
        /* delete button */
        isAdmin && member._id !== user.userId && (
          <>
            <Button
              className="button--delete"
              type="danger"
              onClick={handleDelete}
              loading={loading}
            >
              <SvgDelete className={"button--delete"} />
            </Button>
          </>
        )
      }
    </li>
  );
}

Member.propTypes = {
  member: PropTypes.object.isRequired,
  onDelete: PropTypes.func,
  isAdmin: PropTypes.bool,
  posts: PropTypes.array,
  onDeletePost: PropTypes.func,
  commentDelete: PropTypes.func,
};
