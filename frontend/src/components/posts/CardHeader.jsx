import React from "react";
import PropTypes from "prop-types";
import { dateParser } from "../../utils/Tools";

/**
 * Function to display a post header
 * @param {Object} post - The post to display
 * @param {Object} posterPost - The profil of the current user
 * @returns div => A post header
 */
export default function CardHeader({ posterPost, post }) {
  return (
    <div className="posts__card__header">
      <div className="posts__card__header__user">
        <img src={posterPost.image} alt="user-pic" />
        <h3>
          {posterPost.lastName} {posterPost.firstName}
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
  posterPost: PropTypes.object.isRequired,
};
