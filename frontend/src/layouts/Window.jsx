import React from "react";
import { SvgClose } from "../utils/icons/SvgClose";

export default function Window({ picture, setFullScreen }) {
  return (
    <div className="window">
      <div className="button--close" onClick={() => setFullScreen(false)}>
        <SvgClose />
      </div>
      <div className="window-content">
        <img src={picture} alt="post-pic" />
      </div>
    </div>
  );
}
