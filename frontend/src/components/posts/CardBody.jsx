import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import SvgPlus from "../../utils/icons/SvgPlus";
import SvgMinus from "../../utils/icons/SvgMinus";
import Window from "../../layouts/Window";

/**
 * Function to display a post body
 * @param {Object} post - The post to display
 * @returns div => A post body
 */
export default function CardBody({ post, more }) {
  const [moreMessage, setMoreMessage] = React.useState(true);
  const [morePic, setMorePic] = React.useState(false);
  const [picture, setPicture] = React.useState(post.picture);
  const [minusClassName, setMinusClassName] = React.useState("");
  const [window, setWindow] = React.useState(false);
  const [picFullScreen, setPicFullScreen] = React.useState("");
  const user = JSON.parse(localStorage.getItem("user")); // Get the user information from localStorage

  useEffect(() => {
    if (morePic === true) {
      setPicture(post.picture);
      setMinusClassName("buttonMinus");
    } else {
      setPicture(post.picture.slice(0, 4));
      setMinusClassName("");
    }
  }, [morePic, post.picture]);
  let picClassName = "";

  if (picture.length > 1 && picture.length !== 3) {
    picClassName = "posts__card__body__pic--multiple";
  } else if (picture.length === 3) {
    picClassName = "posts__card__body__pic--multiple2";
  } else {
    picClassName = "posts__card__body__pic--single";
  }

  useEffect(() => {
    // Use effect capture the click outside the form
    document.addEventListener("click", handleClickOutside, true);
  }, []);

  const refOne = useRef(null);

  const handleClickOutside = (event) => {
    // Function to hide the form when the user click outside the form
    if (refOne.current && !refOne.current.contains(event.target)) {
      setMoreMessage("posts__card__body");
    }
  };

  const handleClick = () => {
    // Function to show the form when the user click on the button
    if (user.userId === post.posterId) {
      more();
    } else {
      setMorePic(!morePic);
    }
  };

  const handleFullScreen = (pic) => {
    // Function to show the form when the user click on the button
    setPicFullScreen(pic);
    setWindow(true);
  };

  return (
    <div
      className={
        moreMessage ? "posts__card__body" : "posts__card__body moreMessage"
      }
    >
      {post.message && (
        <div
          className="posts__card__body__message"
          ref={refOne}
          onClick={() => setMoreMessage(!moreMessage)}
        >
          {post.message}
        </div>
      )}

      {picture && (
        <div className="posts__card__body__pic">
          {picture.map((pic) => (
            <div className={picClassName} key={pic._id}>
              <img
                src={pic.pic}
                alt="post-pic"
                onClick={() => handleFullScreen(pic.pic)}
              />
            </div>
          ))}
          {post.picture.length > 4 && (
            <div
              className={
                morePic ? `${minusClassName}` : `${picClassName}--more`
              }
              onClick={handleClick}
            >
              {morePic ? (
                <SvgMinus />
              ) : (
                <>
                  <SvgPlus /> <p>{post.picture.length - 4}</p>
                </>
              )}
            </div>
          )}
        </div>
      )}
      {post.video && (
        <div className="posts__card__body__video">
          <iframe src={post.video} frameBorder="0" title={post._id}></iframe>
        </div>
      )}
      {window === true && (
        <Window setFullScreen={setWindow} picture={picFullScreen} />
      )}
    </div>
  );
}

CardBody.propTypes = {
  post: PropTypes.object.isRequired,
};
