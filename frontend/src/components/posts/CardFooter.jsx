import React from "react";

export default function CardFooter() {
  return (
    <div className="posts__card__footer">
      <div className="posts__card__footer__comments">
        <p>Comments</p>
        <i className="fa fa-commenting-o" aria-hidden="true"></i>
        <span>0</span>
      </div>
      <div className="posts__card__footer__like">
        <p>Likes</p>
        <i className="fa fa-thumbs-o-up" aria-hidden="true"></i>
        <span>0</span>
      </div>
    </div>
  );
}
