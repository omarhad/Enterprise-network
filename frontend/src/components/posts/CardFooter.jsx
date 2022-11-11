import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import SvgLike from "../../utils/icons/SvgLike";

/**
 * Function to display a post footer
 * @param {Object} post - The post to display
 * @param {Object} profil - The profil of the current user
 * @param {Function} onLike - The function to like a post
 * @param {Function} onComment - The function to comment a post
 * @returns div => A post footer
 */
export default function CardFooter({ post, profil, onLike, onComment }) {
  const [like, setLike] = useState(false);
  useEffect(() => {
    if (post.likers.includes(profil._id)) {
      setLike(true);
    }
  }, [profil._id, post.likers, like]);

  const handleLike = async () => {
    await onLike(post._id, { likerId: profil._id });
    setLike(!like);
  };

  return (
    <div className="posts__card__footer">
      <div className="posts__card__footer__comments" onClick={onComment}>
        <span>{post.comments.length}</span>
      </div>
      <div className="posts__card__footer__like">
        <SvgLike
          className="posts__card__footer__like__icon"
          fill="#c12000"
          like={like}
          onClick={handleLike}
        />
        <span>{post.likers.length}</span>
      </div>
    </div>
  );
}

CardFooter.propTypes = {
  post: PropTypes.object.isRequired,
  profil: PropTypes.object.isRequired,
  onLike: PropTypes.func,
  onComment: PropTypes.func,
};
