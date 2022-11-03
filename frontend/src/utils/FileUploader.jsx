import React, { useRef } from "react";

export function FileUploader({ onFileSelectError, onFileSelectSuccess }) {
  const fileInput = useRef(null);

  const handleFileInput = (e) => {
    e.preventDefault();
    // handle validations
    const file = e.target.files[0];
    if (file.size > 9909024)
      onFileSelectError({ error: "File size cannot exceed more than 1MB" });
    else onFileSelectSuccess(file);
  };

  return (
    <div className="file-uploader">
      <input type="file" onChange={handleFileInput} />
      <button
        onClick={(e) => fileInput.current && fileInput.current.click()}
        className="button"
      >
        Upload
      </button>
    </div>
  );
}
