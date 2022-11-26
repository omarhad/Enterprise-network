import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Button from "../../layouts/Button";
import { isEmpty } from "../../utils/Tools";
import CardBody from "./CardBody";
import CardFooter from "./CardFooter";
import CardHeader from "./CardHeader";
import { Field } from "../../layouts/Field";
import { CardComment } from "./CardComment";
import CardUpdate from "./CardUpdate";
import { Preview } from "./Preview";
import { FileUploaderPost } from "../../utils/FileUploaderPost";
import Modal from "../../layouts/Modal";
import { ApiErrors } from "../../utils/Api";

/**
 * Function to display a post
 * @param {Object} post - The post to display
 * @param {Object} profil - The profil of the current user
 * @param {Function} onDelete - The function to delete a post
 * @param {Function} isAdmin - The function to check if the current user is an admin
 * @param {Function} onUpdate - The function to upload a file
 * @param {Function} onLike - The function to like a post
 * @param {Function} addComment - The function to add a comment
 * @param {Function} commentDelete - The function to delete a comment
 * @param {Function} commentUpdate - The function to edit a comment
 * @param {Function} onUpload - The function to upload a file
 * @param {Array} members - The array of all members
 * @param {Function} deletePicPost - The function to delete a picture
 * @returns li => A post
 */
export default function Card({
  post,
  members,
  profil,
  isAdmin,
  onDelete,
  onLike,
  addComment,
  commentDelete,
  onUpdate,
  commentUpdate,
  onUpload,
  deletePicPost,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);
  const [isComment, setIsComment] = useState(false);
  const [error, setError] = useState(null); // state variable to store error message
  const [msgPost, setMsgPost] = useState("");
  const [postPicture, setPostPicture] = useState(post.picture);
  const [video, setVideo] = useState(post.video);
  const [file, setFile] = useState();
  const user = JSON.parse(localStorage.getItem("user")); // Get the user information from localStorage
  const [pictId, setPicId] = useState("");

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
    return () => {
      clearTimeout();
    };
  }, [error]);

  useEffect(() => {
    !isEmpty(members) && setIsLoading(false);
  }, [members]);

  const posterPost = members.find((member) => member._id === post.posterId);

  const picture = post.picture;

  useEffect(() => {
    if (post.picture) {
      setPostPicture(post.picture);
    }
  }, [post.picture]);

  let picClassName = "";

  if (picture.length > 1 || postPicture.length > 1) {
    picClassName = "posts__card__body__pic--multiple";
  } else {
    picClassName = "posts__card__body__pic--single";
  }

  const handleDelete = async function (e) {
    // Function to delete a post
    // Delete a member
    e.preventDefault();
    setIsLoading(true);
    try {
      if (window.confirm("Are you sure you want to delete this post?")) {
        await onDelete(post._id, isAdmin, profil._id);
      }
    } catch (error) {
      if (error instanceof ApiErrors) {
        setError(error.errors.error); // set error message
      } else {
        console.log(error);
      }
    }
    setIsLoading(false);
  };

  const handleDeletePic = async function (e) {
    // Function to delete a picture
    // Delete a member
    e.preventDefault();
    setIsLoading(true);
    try {
      if (pictId !== "") {
        await deletePicPost(post._id, {
          picId: pictId,
          posterId: posterPost._id,
        });

        setIsUpdated(false);
      }
    } catch (error) {
      if (error instanceof ApiErrors) {
        setError(error.errors.error); // set error message
      } else {
        console.log(error);
      }
    }
    setIsLoading(false);
  };

  const handlePicture = (e) => {
    // Function to handle the picture

    const file = e.target.files[0];

    if (file.size > 5000000) setError(`File size cannot exceed more than 5MB`);
    else {
      for (let i = 0; i < postPicture.length; i++) {
        if (postPicture[i]._id === pictId) {
          postPicture[i].pic = URL.createObjectURL(file);
        }
      }
      if (pictId === "") {
        setPostPicture([{ pic: URL.createObjectURL(file) }]);
      } else {
        setPostPicture(postPicture); // set the postPicture state variable
      }
      setFile(file); // set the file state variable
      setIsLoading(false); // set loading state to false
    }
    setVideo(""); // dasable the video preview
  };

  const updatePost = async (e) => {
    e.preventDefault();
    await onUpdate(post._id, {
      posterId: profil._id,
      message: msgPost,
      video: video,
    });
    setIsUpdated(false);
  };

  const cancelPost = () => {
    // Function to cancel the post clear the form
    setMsgPost(post.message);
    setPostPicture(post.picture);
    setVideo(post.video);
    setFile(null);
    setIsUpdated(false);
  };

  const uploadPost = async (e) => {
    // Function to upload a post
    e.preventDefault();
    setIsLoading(true);
    const data = new FormData(); // create a new FormData object
    data.append("posterId", profil._id);
    data.append("file", file);
    data.append("picId", pictId);
    await onUpload(post._id, data);
    setIsLoading(false);
    if (pictId === "") {
      setIsUpdated(false);
    }
    setFile(null);
    setPostPicture([post.picture]);
  };

  useEffect(() => {
    const handleVideo = () => {
      let findLink = msgPost.split(" ");
      for (let i = 0; i < findLink.length; i++) {
        if (
          findLink[i].includes("https://www.yout") ||
          findLink[i].includes("https://yout")
        ) {
          let embed = findLink[i].replace("watch?v=", "embed/");
          if (post.picture.length > 0) {
            setError("You can't add a video and a picture");
            return;
          }
          setVideo(embed.split("&")[0]);
          findLink.splice(i, 1);
          setMsgPost(findLink.join(" "));
          setPostPicture([]);
        }
      }
    };
    handleVideo();
  }, [profil, video, msgPost, post.picture]);

  return (
    <>
      <li className="posts__card">
        {isLoading ? (
          <i className="fa fa-spinner fa-spin"></i>
        ) : (
          <>
            <CardHeader post={post} posterPost={posterPost} />
            {isUpdated === false && (
              <CardBody post={post} more={() => setIsUpdated(!isUpdated)} />
            )}
            {isUpdated && (
              <>
                <Field
                  textarea="true"
                  onChange={(e) => setMsgPost(e.target.value)}
                  defaultValue={post.message}
                  className="posts__card__body"
                  placeholder="What's on your mind?"
                />
                {(postPicture.length > 0 || video !== "") && (
                  <Preview
                    postPicture={postPicture}
                    video={video}
                    previewImage={picClassName}
                    previewVideo="posts__card__body__video"
                    className="posts__card__body__pic preview"
                    setId={setPicId}
                  >
                    <FileUploaderPost
                      onChange={(e) => handlePicture(e)}
                      deletePicPost={handleDeletePic}
                      edit={true}
                    />
                  </Preview>
                )}
              </>
            )}
            <CardFooter
              post={post}
              profil={profil}
              onLike={onLike}
              onComment={() => setIsComment(!isComment)}
            />

            {isUpdated && (
              <div className="posts__card__updated">
                {file ? (
                  <Button className="button" onClick={uploadPost}>
                    Update a picture
                  </Button>
                ) : (
                  <>
                    {!video && (
                      <Button className="button button__addPic">
                        <FileUploaderPost
                          onChange={(e) => handlePicture(e)}
                          fill="#fff"
                          className="uploaderPost"
                        />
                        Add
                      </Button>
                    )}

                    <Button className="button" onClick={updatePost}>
                      Update
                    </Button>
                  </>
                )}

                <Button className="button" onClick={cancelPost}>
                  Cancel
                </Button>
              </div>
            )}
          </>
        )}

        <div className="posts__card__upload">
          {
            /* delete button */
            (isAdmin === true ||
              (user.userId === post.posterId && !isUpdated)) && (
              <>
                <CardUpdate
                  element={post}
                  handleDelete={handleDelete}
                  onUpdate={onUpdate}
                  showEdit={() => setIsUpdated(!isUpdated)}
                  editor={user.userId === post.posterId}
                />
              </>
            )
          }
        </div>
        {isComment && (
          <CardComment
            post={post}
            members={members}
            profil={profil}
            addComment={addComment}
            commentDelete={commentDelete}
            commentUpdate={commentUpdate}
            isAdmin={isAdmin}
          />
        )}
      </li>
      <div className="posts__separator"></div>
      {error && (
        <Modal>
          <p className="error">{error}</p>
        </Modal>
      )}
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
  commentUpdate: PropTypes.func,
  onUpload: PropTypes.func,
  members: PropTypes.array,
  deletePicPost: PropTypes.func,
};
