import React from "react";
import SvgEdit from "./icons/SvgEdit";

export function FileUploaderPost({ onChange }) {
  return (
    <div className="file-uploader__Post">
      <SvgEdit />
      <input
        className="file-uploader__Post__file"
        type="file"
        id="file"
        accept=".jpg, .jpeg, .png"
        onChange={onChange}
      />
      {/* <button
        onClick={(e) => fileInput.current && fileInput.current.click()}
        className="button"
      >
        Upload
      </button> */}
    </div>
  );
}
