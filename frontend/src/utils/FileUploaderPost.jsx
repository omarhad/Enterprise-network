import React from "react";
import { useState } from "react";
import Button from "../layouts/Button";
import { SvgDelete } from "./icons/SvgDelete";
import SvgImage from "./icons/SvgImage";

export function FileUploaderPost({
  onChange,
  fill,
  deletePicPost,
  edit,
  className,
}) {
  const [showEdit, setShowEdit] = useState(edit);

  return (
    <div className="file-uploader__Post">
      {showEdit ? (
        <Button className="button" onClick={() => setShowEdit(false)}>
          Edit
        </Button>
      ) : (
        <>
          <SvgImage fill={fill} />
          <input
            className={
              className
                ? `file-uploader__Post__file ${className}`
                : "file-uploader__Post__file"
            }
            type="file"
            id="file"
            accept=".jpg, .jpeg, .png"
            onChange={onChange}
          />
          {deletePicPost && (
            <SvgDelete className={"button--delete"} onClick={deletePicPost} />
          )}
        </>
      )}
    </div>
  );
}
