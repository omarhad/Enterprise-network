import React, { useState } from "react";
import PropTypes from "prop-types";

import { Field } from "../../layouts/Field";
import { SvgDelete } from "../../utils/icons/SvgDelete";
import { dateParser } from "../../utils/Tools";
import Button from "../../layouts/Button";

/**
 * Function to display a comment
 * @param {Object} post - The post to display
 * @param {Object} profil - The profil of the current user
 * @param {Function} commentDelete - The function to delete a comment
 * @param {Function} addComment - The function to edit a comment
 * @param {Boolean} isAdmin - The boolean to know if the current user is an admin
 * @returns div => A comment
 */
export function CardComment({
  post,
  profil,
  addComment,
  isAdmin,
  commentDelete,
}) {
  const [text, setText] = useState("");

  const handleComment = async (e) => {
    e.preventDefault();
    if (text) {
      await addComment(post._id, { commenterId: profil._id, text });
      setText("");
    }
  };
  const handleDelete = async function (commentId) {
    console.log(commentId);
    // Function to delete a comment
    if (window.confirm("Are you sure you want to delete this post?")) {
      await commentDelete(post._id, {
        commentId: `${commentId}`,
        isAdmin,
        commenterId: profil._id,
      });
    }
  };

  return (
    <div className="card-comment">
      {post.comments.map((comment) => {
        return (
          <div className="card-comment" key={comment._id}>
            <div
              className={
                comment.commenterId === profil._id
                  ? "card-comment__header mine"
                  : "card-comment__header"
              }
            >
              <div className="card-comment__header__user">
                <img src={profil.image} alt="user-pic" />
                <h3>
                  {profil.lastName} {profil.firstName}
                </h3>
              </div>
              <div className="card-comment__header__date">
                <span>{dateParser(post.createdAt)}</span>
              </div>
              <div className="card-comment__header__message">
                {comment.text}
              </div>
            </div>
            {(isAdmin || comment.commenterId === profil._id) && (
              <>
                <div
                  className="button--delete"
                  onClick={() => handleDelete(comment._id)}
                >
                  <SvgDelete />
                </div>
              </>
            )}
          </div>
        );
      })}
      <form className="card-comment__form" onSubmit={handleComment}>
        <Field
          textarea="true"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="card-comment__form__input"
        />
        <Button className="button button--comment" type="submit">
          Comment
        </Button>
      </form>
    </div>
  );
}
CardComment.propTypes = {
  post: PropTypes.object.isRequired,
  profil: PropTypes.object.isRequired,
  addComment: PropTypes.func,
  isAdmin: PropTypes.bool,
  commentDelete: PropTypes.func,
};
