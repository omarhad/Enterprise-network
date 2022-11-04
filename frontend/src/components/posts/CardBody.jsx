import React from "react";

export default function CardBody({ post }) {
  const picture = post.picture;
  let picClassName = "";

  if (picture.length > 1) {
    picClassName = "posts__card__body__pic--multiple";
  } else {
    picClassName = "posts__card__body__pic--single";
  }

  return (
    <div className="posts__card__body">
      <p>{post.message}</p>

      {picture && (
        <div className="posts__card__body__pic">
          {picture.map((pic) => (
            <img
              className={picClassName}
              src={pic.pic}
              alt="post-pic"
              key={pic._id}
            />
          ))}
        </div>
      )}
      {post.video && (
        <div className="posts__card__body__video">
          <iframe src={post.video} frameBorder="0" title={post._id}></iframe>
        </div>
      )}
    </div>
  );
}
