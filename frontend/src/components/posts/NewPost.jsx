import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ApiErrors } from "../../utils/Api";
import { NewPostPreview } from "./NewPostPreview";
import { NewPostAction } from "./NewPostAction";

/**
 * Function to add a new post
 * @param {Object} profil - The profil of the current user
 * @param {Function} addPost - The function to add a post
 * @returns div => A form to add a new post
 */
export default function NewPost({ profil, addPost }) {
  const [error, setError] = useState(null); // state variable to store error message
  const [loading, setLoading] = useState(false); // state variable to store loading state
  const [showForm, setShowForm] = useState(true); // state variable to store showForm state
  const [message, setMessage] = useState("");
  const [postPicture, setPostPicture] = useState(null);
  const [video, setVideo] = useState("");
  const [file, setFile] = useState();

  // Function to handle the submit of the form
  const handleSubmit = async () => {
    setError(null); // reset error message
    setLoading(true); // set loading state to true

    if (message || postPicture || video) {
      const data = new FormData(); // create a new FormData object
      data.append("posterId", profil._id); // add the posterId to the FormData object
      data.append("message", message); // add the message to the FormData object
      if (video) {
        data.append("video", video); // add the video to the FormData object
      }
      if (file) {
        data.append("file", file); // add the file to the FormData object
      }
      try {
        await addPost(data); // call the addPost function
        cancelPost(); // call the cancelPost function
      } catch (error) {
        if (error instanceof ApiErrors) {
          let err = error.errors.message; // get error type
          setError(err); // set error message
        }
      }
      setLoading(false); // set loading state to false
    } else {
      alert("Please enter a message or upload a picture or video");
      setLoading(false); // set loading state to false
    }
  };

  const cancelPost = () => {
    // Function to cancel the post clear the form
    setMessage("");
    setPostPicture("");
    setVideo("");
    setFile("");
  };

  const handlePicture = (e) => {
    // Function to handle the picture

    const file = e.target.files[0];
    if (file.size > 5000000) setError(`File size cannot exceed more than 5MB`);
    else {
      setPostPicture(URL.createObjectURL(file)); // set the postPicture state variable
      setFile(file); // set the file state variable
      setLoading(false); // set loading state to false
    }
    setVideo(""); // dasable the video preview
  };

  // listen the scroll event to hide the form when the user scroll down
  useEffect(() => {
    const handleShowForm = () => {
      if (window.scrollY > 100) {
        setShowForm(false);
      } else {
        setShowForm(true);
      }
    };
    window.addEventListener("scroll", handleShowForm);
    return () => {
      window.addEventListener("scroll", handleShowForm);
    };
  }, [showForm]);

  // listen the input event to handle the video preview
  useEffect(() => {
    const handleVideo = () => {
      let findLink = message.split(" ");
      for (let i = 0; i < findLink.length; i++) {
        if (
          findLink[i].includes("https://www.yout") ||
          findLink[i].includes("https://yout")
        ) {
          let embed = findLink[i].replace("watch?v=", "embed/");
          setVideo(embed.split("&")[0]);
          findLink.splice(i, 1);
          setMessage(findLink.join(" "));
          setPostPicture("");
        }
      }
    };
    handleVideo();
  }, [profil, video, message]);

  return (
    <div className="newPost">
      <form
        className={showForm ? `newPost--form` : `newPost--form scrolled`}
        onSubmit={handleSubmit}
      >
        <textarea
          className={
            showForm
              ? "newPost--form__content"
              : "newPost--form__content scrolled__content"
          }
          name="newpost"
          id="newpost"
          placeholder="What's on your mind ?"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        {postPicture || video.length > 20 ? (
          <NewPostPreview
            postPicture={postPicture}
            video={video}
            file={file}
            previewImage={
              showForm
                ? "newPost--form__preview--image"
                : "newPost--form__preview--image scrolled__content"
            }
            previewVideo={
              showForm
                ? "newPost--form__preview--video"
                : "newPost--form__preview--video scrolled__content"
            }
          />
        ) : null}
        {error && <p className="error">{error}</p>}
        <NewPostAction
          setShowForm={
            showForm === false
              ? (e) => {
                  e.preventDefault();
                  setShowForm(true);
                  window.scroll(0, 0);
                }
              : undefined
          }
          loading={loading}
          handleSubmit={handleSubmit}
          showForm={showForm}
          message={message}
          postPicture={postPicture}
          video={video}
          cancelPost={cancelPost}
          handlePicture={handlePicture}
          setVideo={() => setVideo("")}
        />
      </form>
    </div>
  );
}

NewPost.propTypes = {
  profil: PropTypes.object,
  addPost: PropTypes.func,
};
