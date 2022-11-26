import React, { useRef } from "react";

export function FileUploader({
  onFileSelectError,
  onFileSelectSuccess,
  previewPic,
}) {
  const fileInput = useRef(null);
  const [confirm, setConfirm] = React.useState(false);

  const handleFileInput = (e) => {
    e.preventDefault();
    // handle validations
    const file = e.target.files[0];
    if (file.size > 5000000)
      onFileSelectError({
        error: `File size cannot exceed more than 5MB`,
      });
    else {
      onFileSelectSuccess(file);
      previewPic(URL.createObjectURL(file));
      setConfirm(true);
    }
  };

  const handleFileUpload = (e) => {
    fileInput.current && fileInput.current.click();
    setConfirm(false);
  };

  return (
    <div className="file-uploader">
      <input type="file" onChange={handleFileInput} />
      <button onClick={handleFileUpload} className="button">
        {confirm ? "Confirmation" : "Upload"}
      </button>
    </div>
  );
}
