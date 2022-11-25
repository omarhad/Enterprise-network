import React, { useState } from "react";
import PropTypes from "prop-types";
import { Field } from "../../layouts/Field";
import Button from "../../layouts/Button";
import { Comment } from "./Comment";

/**
 * Function to display a comment
 * @param {Object} post - The post to display
 * @param {Object} profil - The profil of the current user
 * @param {Function} commentDelete - The function to delete a comment
 * @param {Function} addComment - The function to edit a comment
 * @param {Boolean} isAdmin - The boolean to know if the current user is an admin
 * @param {Function} commentUpdate - The function to edit a comment
 * @param {Array} members - The array of all members
 * @returns div => A comment
 */
export function CardComment({
  post,
  members,
  profil,
  addComment,
  isAdmin,
  commentDelete,
  commentUpdate,
}) {
  const [text, setText] = useState("");
  const [comment, setComment] = useState("");
  const [edit, setEdit] = useState(false);

  const handleComment = async (e) => {
    e.preventDefault();
    if (text) {
      await addComment(post._id, { commenterId: profil._id, text: text });
      setText("");
    }
  };
  const handleDelete = async function (commentId) {
    // Function to delete a comment
    if (window.confirm("Are you sure you want to delete this post?")) {
      await commentDelete(post._id, {
        commentId: `${commentId}`,
        isAdmin: isAdmin,
        commenterId: profil._id,
      });
    }
  };

  const handleEdit = async function (commentId) {
    // Function to edit a comment
    await commentUpdate(post._id, {
      commentId: commentId,
      commenterId: profil._id,
      text: comment,
    });
    setEdit(false);
  };

  return (
    <div className="card-comment">
      {post.comments.map((comment) => {
        return (
          <div className="card-comment__content" key={comment._id}>
            <Comment
              comment={comment}
              members={members}
              profil={profil}
              commentDelete={handleDelete}
              commentUpdate={handleEdit}
              onChange={(e) => setComment(e.target.value)}
              isAdmin={isAdmin}
              edit={edit}
              setEdit={setEdit}
            />
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
  commentUpdate: PropTypes.func,
  members: PropTypes.array,
};
