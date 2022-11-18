import React from "react";
import PropTypes from "prop-types";
import Card from "../components/posts/Card";
import NewPost from "../components/posts/NewPost";
import { Loader } from "../layouts/Loader";
import { AllMembers } from "../components/members/ListMembers";
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
 * @param {Function} onUpdate // Function to edit a post
 * @param {Function} onUpload // Function to upload a file
 * @param {Function} deletePicPost // Function to delete a picture
 * @returns div => Component Home with all posts
 */
export default function Home({
  posts,
  members,
  profil,
  isAdmin,
  addPost,
  onDelete,
  onLike,
  addComment,
  commentDelete,
  commentUpdate,
  onUpdate,
  onUpload,
  deletePicPost,
  desktop,
}) {
  return (
    <>
      <div className="home">
        <NewPost profil={profil} addPost={addPost} posts={posts} />
        {posts === null ? (
          <Loader />
        ) : (
          <>
            <ul className="posts">
              {posts &&
                posts.map((post) => (
                  <Card
                    post={post}
                    key={post._id}
                    profil={profil}
                    isAdmin={isAdmin}
                    onDelete={onDelete}
                    onLike={onLike}
                    onUpdate={onUpdate}
                    addComment={addComment}
                    commentDelete={commentDelete}
                    commentUpdate={commentUpdate}
                    members={members}
                    onUpload={onUpload}
                    deletePicPost={deletePicPost}
                  />
                ))}
            </ul>
          </>
        )}
      </div>
      {desktop && (
        <AllMembers members={members} onDelete={onDelete} isAdmin={isAdmin} />
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
  onLike: PropTypes.func,
  addComment: PropTypes.func,
  commentDelete: PropTypes.func,
  members: PropTypes.array,
  commentUpdate: PropTypes.func,
  onUpdate: PropTypes.func,
  onUpload: PropTypes.func,
  deletePicPost: PropTypes.func,
};
