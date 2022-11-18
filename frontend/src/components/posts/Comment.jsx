import React from "react";
import PropTypes from "prop-types";
import { dateParser, timestampParser } from "../../utils/Tools";
import CardUpdate from "./CardUpdate";
import { Field } from "../../layouts/Field";
import Button from "../../layouts/Button";

export function Comment({
  comment,
  profil,
  members,
  isAdmin,
  commentDelete,
  commentUpdate,
  onChange,
  edit,
  setEdit,
}) {
  const posterComment = members.find((member) => {
    return member._id === comment.commenterId;
  });

  return (
    <>
      <div
        className={
          comment.commenterId === profil._id
            ? "card-comment__content__header mine"
            : "card-comment__content__header"
        }
      >
        <div className="card-comment__content__header__user">
          <img src={posterComment.image} alt="user-pic" />
          <h3>
            {posterComment.lastName} {posterComment.firstName}
          </h3>
        </div>
        {!edit && (
          <div className="card-comment__header__date">
            <span>{timestampParser(comment.timestamp)}</span>
          </div>
        )}
        {edit ? (
          <form onSubmit={() => commentUpdate(comment._id)}>
            <Field
              textarea="true"
              onChange={onChange}
              className="card-comment__content__form__input"
            />
            <Button className="button" type="submit">
              Comment
            </Button>
          </form>
        ) : (
          <div className="card-comment__content__header__message">
            {comment.text}
          </div>
        )}
      </div>
      {(isAdmin === true || posterComment._id === profil._id) && (
        <>
          <CardUpdate
            element={comment}
            handleDelete={() => commentDelete(comment._id)}
            handleEdit={() => commentUpdate(comment._id)}
            showEdit={() => setEdit(!edit)}
          />
        </>
      )}
    </>
  );
}

Comment.propTypes = {
  comment: PropTypes.object,
  profil: PropTypes.object,
  members: PropTypes.array,
  isAdmin: PropTypes.bool,
  commentDelete: PropTypes.func,
  commentUpdate: PropTypes.func,
  onChange: PropTypes.func,
  edit: PropTypes.bool,
  setEdit: PropTypes.func,
};
