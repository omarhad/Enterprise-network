import React from "react";
import PropTypes from "prop-types";

/**
 * Function to display a preview of the post
 * @param {String} postPicture - The url of the post picture
 * @param {String} video - The url of the video
 * @param {String} previewImage - The class name of the preview image
 * @param {String} previewVideo - The class name of the preview video
 * @returns
 */
export function NewPostPreview({
  postPicture,
  video,
  previewImage,
  previewVideo,
}) {
  return (
    <div className="newPost--form__preview">
      {postPicture && (
        <img src={postPicture} alt="post" className={previewImage} />
      )}
      {video && (
        <iframe
          src={video}
          alt="post"
          className={previewVideo}
          title={video}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
}

NewPostPreview.propTypes = {
  postPicture: PropTypes.string,
  video: PropTypes.string,
  previewImage: PropTypes.string,
  previewVideo: PropTypes.string,
};
