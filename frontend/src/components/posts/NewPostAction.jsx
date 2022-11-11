import React from "react";
import PropTypes from "prop-types";
import Button from "../../layouts/Button";
import { isEmpty } from "../../utils/Tools";
import { FileUploaderPost } from "../../utils/FileUploaderPost";

/**
 * Function to display a action button of the new post
 *@param {Function} handleSubmit - The function to handle the submit of the form
 *@param {Function} setShowForm - The function to set the showForm state
 *@param {Boolean} showForm - The showForm state
 *@param {Boolean} loading - The loading state
 *@param {String} message - The message state
 *@param {String} postPicture - The postPicture state
 *@param {String} video - The video state
 *@param {Function} setVideo - The function to set the video state
 *@param {Function} cancelPost - The function to cancel the post clear the form
 *@returns div => A action button of the new post
 */
export function NewPostAction({
  handleSubmit, // function to handle the submit of the form
  setShowForm, // function to set the showForm state
  loading, // state variable to store loading state
  showForm, // state variable to store showForm state
  message, // state variable to store message state
  postPicture, // state variable to store postPicture state
  video, // state variable to store video state
  cancelPost, // function to cancel the post clear the form
  handlePicture, // function to handle the picture
  setVideo, // function to set the video state
}) {
  return (
    <div className="newPost--form__actions" onClick={setShowForm}>
      <Button
        className="button button--newPost"
        onClick={handleSubmit}
        loading={loading}
      >
        {showForm ? "Submit" : "New Post "}
      </Button>
      {message || postPicture || video.length > 20 ? (
        <Button
          type="submit"
          className="button button--newPost"
          onClick={cancelPost}
        >
          Cancel post
        </Button>
      ) : null}
      {isEmpty(video) && (
        <FileUploaderPost onChange={(e) => handlePicture(e)} />
      )}
      {video && (
        <Button className="button button--newPost" onClick={setVideo}>
          Delete video
        </Button>
      )}
    </div>
  );
}

NewPostAction.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  setShowForm: PropTypes.func,
  loading: PropTypes.bool.isRequired,
  showForm: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  postPicture: PropTypes.string,
  video: PropTypes.string.isRequired,
  cancelPost: PropTypes.func.isRequired,
  handlePicture: PropTypes.func.isRequired,
  setVideo: PropTypes.func.isRequired,
};
