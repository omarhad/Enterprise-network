import React, { useState } from "react";
import Button from "../../layouts/Button";
import { ApiErrors } from "../../utils/Api";

export default function NewPost({ profil, addPost, onLoad }) {
  const [error, setError] = useState(null); // state variable to store error message
  const [loading, setLoading] = useState(false); // state variable to store loading state

  let newData = {};

  const handleSubmit = async function (e) {
    e.preventDefault(); // prevent page reload
    setError(null); // reset error message
    setLoading(true); // set loading state to true

    const data = Object.fromEntries(new FormData(e.target)); // get form data and convert form data to object
    newData = {
      message: data.newpost,
      posterId: profil._id,
    };

    try {
      await addPost(newData);
    } catch (error) {
      if (error instanceof ApiErrors) {
        let err = error.errors.message; // get error type
        setError(err); // set error message
      }
    }
    setLoading(false); // set loading state to false
  };

  return (
    <div className="newPost">
      {error && <p className="error">{error}</p>}
      <form className="newPost--form" onSubmit={handleSubmit}>
        <textarea
          className="newPost--form__content"
          name="newpost"
          id="newpost"
          placeholder="What's on your mind ?"
        />
        <Button loading={loading} className="newPost__button" onClick={onLoad}>
          Submit
        </Button>
      </form>
    </div>
  );
}
