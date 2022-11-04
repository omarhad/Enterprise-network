import React from "react";
import { dateParser } from "../../utils/Tools";

export default function CardHeader({ profil, post }) {
  return (
    <div className="posts__card__header">
      <div className="posts__card__header__user">
        <img src="" alt="user-pic" />
        <h3>
          {profil.lastName} {profil.firstName}
        </h3>
      </div>
      <div className="posts__card__header__date">
        <span>{dateParser(post.createdAt)}</span>
      </div>
    </div>
  );
}
