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
export function Preview({
  postPicture,
  video,
  previewImage,
  previewVideo,
  setId,
  refPicture,
  ...props
}) {
  console.log("🚀 ~ file: Preview.jsx ~ line 21 ~ video", video);

  return (
    <div className={props.className}>
      {postPicture !== [] &&
        postPicture.map((picture) => (
          <div className="preview__content" key={picture._id}>
            <img src={picture.pic} alt="preview" className={previewImage} />
            <div
              className="button--edit button--edit__picture"
              onClick={() => setId(picture._id)}
            >
              {props.children}
            </div>
          </div>
        ))}
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

Preview.propTypes = {
  postPicture: PropTypes.array,
  video: PropTypes.string,
  previewImage: PropTypes.string,
  previewVideo: PropTypes.string,
};
