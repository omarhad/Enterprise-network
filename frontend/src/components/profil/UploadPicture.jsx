import React, { useState } from "react";
import Modal from "../../layouts/Modal";
import { FileUploader } from "../../utils/FileUploader";

/**
 * Function to upload picture user
 * @param {*} uploadPicture
 * @param {*} profil
 * @returns
 */
export function UploadPicture({ uploadPicture, profil, previewPic }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);

  const submitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", profil._id);
    formData.append("file", selectedFile);
    await uploadPicture(formData);
    previewPic = profil.image;
    setError(null);
  };

  return (
    <>
      <form action="" onSubmit={submitForm} className="uploadPic">
        <div className="uploadPic__content">
          <span>Change the picture</span>
          <FileUploader
            onFileSelectSuccess={(file) => setSelectedFile(file)}
            onFileSelectError={({ error }) => setError(error)}
            previewPic={previewPic}
          />
        </div>
      </form>
      {error && (
        <Modal>
          <p className="error">{error}</p>
        </Modal>
      )}
    </>
  );
}
