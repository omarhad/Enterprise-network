import React from "react";
import PropTypes from "prop-types";
import { dateParser } from "../../utils/Tools";

/**
 * Function to display a post header
 * @param {Object} post - The post to display
 * @param {Object} profil - The profil of the current user
 * @returns div => A post header
 */
export default function CardHeader({ profil, post }) {
  return (
    <div className="posts__card__header">
      <div className="posts__card__header__user">
        <img src={profil.image} alt="user-pic" />
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

CardHeader.propTypes = {
  post: PropTypes.object.isRequired,
  profil: PropTypes.object.isRequired,
};
