import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Card from "../components/posts/Card";
import NewPost from "../components/posts/NewPost";
import { Loader } from "../layouts/Loader";
/**
 * Component Home
 * @param {Object} posts // Response from API with all posts
 * @param {Object} profil // Response from API with all members
 * @param {Function} addPost // Function to add a post
 * @param {Function} onDelete // Function to delete a post
 * @param {Boolean} isAdmin // State to verify if the user is logged in
 * @param {Function} onUpdate // Function to upload a file
 * @param {Function} getPost // Function to fetch all posts
 * @param {Function} addComment // Function to add a comment
 * @param {Function} commentDelete // Function to delete a comment
 * @param {Function} onLike // Function to like a post
 * @returns div => Component Home with all posts
 */
export default function Home({
  posts,
  profil,
  isAdmin,
  addPost,
  onDelete,
  onUpdate,
  onLike,
  getPost,
  addComment,
  commentDelete,
}) {
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(5);

  const loadMore = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >
      document.documentElement.scrollHeight
    ) {
      setLoading(true);
    }
  };

  useEffect(() => {
    if (loading) {
      getPost();
      setLoading(false);
      setCount(count + 5);
    }

    window.addEventListener("scroll", loadMore);
    return () => window.removeEventListener("scroll", loadMore);
  }, [loading, count, getPost]);

  return (
    <>
      <NewPost profil={profil} addPost={addPost} posts={posts} />
      {posts === null ? (
        <Loader />
      ) : (
        <ul className="posts">
          {posts &&
            posts.map((post) => (
              <Card
                post={post}
                key={post._id}
                profil={profil}
                isAdmin={isAdmin}
                onDelete={onDelete}
                onUpdate={onUpdate}
                onLike={onLike}
                addComment={addComment}
                commentDelete={commentDelete}
              />
            ))}
        </ul>
      )}
    </>
  );
}

Home.propTypes = {
  posts: PropTypes.array,
  isAdmin: PropTypes.bool,
  profil: PropTypes.object,
  addPost: PropTypes.func,
  onDelete: PropTypes.func,
  onUpdate: PropTypes.func,
  onLike: PropTypes.func,
  getPost: PropTypes.func,
  addComment: PropTypes.func,
  commentDelete: PropTypes.func,
};
