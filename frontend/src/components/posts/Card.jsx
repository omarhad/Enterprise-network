import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Button from "../../layouts/Button";
import { SvgDelete } from "../../utils/icons/SvgDelete";
import { isEmpty } from "../../utils/Tools";
import CardBody from "./CardBody";
import CardFooter from "./CardFooter";
import CardHeader from "./CardHeader";
import SvgVideo from "../../utils/icons/SvgVideo";
import SvgEdit from "../../utils/icons/SvgEdit";
import { Field } from "../../layouts/Field";
import { CardComment } from "./CardComment";

/**
 * Function to display a post
 * @param {Object} post - The post to display
 * @param {Object} profil - The profil of the current user
 * @param {Function} onDelete - The function to delete a post
 * @param {Function} profil - The profil of the current user
 * @param {Function} isAdmin - The function to check if the current user is an admin
 * @param {Function} onUpdate - The function to upload a file
 * @param {Function} addComment - The function to add a comment
 * @param {Function} commentDelete - The function to delete a comment
 * @returns li => A post
 */
export default function Card({
  post,
  profil,
  isAdmin,
  onDelete,
  onUpdate,
  onLike,
  addComment,
  commentDelete,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);
  const [isComment, setIsComment] = useState(false);
  const [msgPost, setMsgPost] = useState("");
  const user = JSON.parse(localStorage.getItem("user")); // Get the user information from localStorage

  useEffect(() => {
    !isEmpty(profil) && setIsLoading(false);
  }, [profil]);

  const handleDelete = async function (e) {
    // Function to delete a post
    // Delete a member
    e.preventDefault();
    setIsLoading(true);
    if (window.confirm("Are you sure you want to delete this post?")) {
      await onDelete(post._id, isAdmin, profil._id);
    }
    setIsLoading(false);
  };

  const updatePost = async (e) => {
    e.preventDefault();
    await onUpdate(post._id, { posterId: profil._id, message: msgPost });
    setIsUpdated(false);
  };

  return (
    <>
      <li className="posts__card" key={post._id}>
        {isLoading ? (
          <i className="fa fa-spinner fa-spin"></i>
        ) : (
          <>
            <CardHeader post={post} profil={profil} />
            {isUpdated === false && <CardBody post={post} />}
            {isUpdated && (
              <>
                <Field
                  textarea="true"
                  onChange={(e) => setMsgPost(e.target.value)}
                  defaultValue={post.message}
                  className="posts__card__body"
                />
                <div className="">
                  <Button className="button" onClick={updatePost}>
                    update
                  </Button>
                </div>
              </>
            )}
            <CardFooter
              post={post}
              profil={profil}
              onLike={onLike}
              onComment={() => setIsComment(!isComment)}
            />
          </>
        )}

        <div className="posts__card__upload">
          {
            /* delete button */
            (isAdmin || user.userId === post.posterId) && (
              <>
                <Button
                  className="button--delete"
                  type="danger"
                  onClick={handleDelete}
                  loading={isLoading}
                >
                  <SvgDelete />
                </Button>
              </>
            )
          }
          {user.userId === post.posterId && (
            <>
              {/* File uploader to upload picture */}
              <div onClick={() => setIsUpdated(!isUpdated)}>
                <SvgEdit className="button--edit" />
              </div>

              <SvgVideo className="button--video" />
            </>
          )}
        </div>
        {isComment && (
          <CardComment
            post={post}
            profil={profil}
            addComment={addComment}
            commentDelete={commentDelete}
            isAdmin={isAdmin}
          />
        )}
      </li>
      <div className="posts__separator"></div>
    </>
  );
}

Card.propTypes = {
  post: PropTypes.object.isRequired,
  profil: PropTypes.object,
  isAdmin: PropTypes.bool.isRequired,
  onDelete: PropTypes.func,
  onUpdate: PropTypes.func,
  onLike: PropTypes.func,
  addComment: PropTypes.func,
  commentDelete: PropTypes.func,
};
