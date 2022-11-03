import React, { useState } from "react";
import { FileUploader } from "../../utils/FileUploader";

/**
 * Function to upload picture user
 * @param {*} uploadPicture
 * @param {*} profil
 * @returns
 */
export function UploadPicture({ uploadPicture, profil }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const submitForm = async () => {
    const formData = new FormData();
    formData.append("id", profil._id);
    formData.append("file", selectedFile);

    await uploadPicture(formData);
  };

  return (
    <form action="" onSubmit={submitForm} className="uploadPic">
      <div className="uploadPic__content">
        <span>Change the picture</span>
        <FileUploader
          onFileSelectSuccess={(file) => setSelectedFile(file)}
          onFileSelectError={({ error }) => alert(error)}
        />
      </div>
    </form>
  );
}
