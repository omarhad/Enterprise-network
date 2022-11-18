import React, { useEffect, useLayoutEffect, useState } from "react";
import { useMembers } from "../hooks/members";
import { usePosts } from "../hooks/posts";
import { Loader } from "../layouts/Loader";
import Navbar from "../layouts/Navbar";
import Home from "./Home";
import Members from "./Members";
import Profil from "./Profil";

/**
 * Display the different pages
 * @param {Function} onConnect // State to verify if the user is logged in
 * @returns {JSX.Element} The pages to display
 */
export default function Pages({ onConnect }) {
  const mediaQuery = window.matchMedia("(min-width: 1024px)"); // Media query to display the login page on mobile
  const [desktop, setDesktop] = useState(mediaQuery.matches); // Store the current device
  const [page, setPage] = useState("Home"); // Store the current page

  useEffect(() => {
    if (mediaQuery.matches) {
      setDesktop(true);
    } else {
      setDesktop(false);
    }
  }, [mediaQuery]);

  const {
    members, // Response from API with all members
    profil, // Response from API with the current member
    fetchMembers, // Function to fetch all members
    deleteMember, // Function to delete a member
    editMembers, // Function to edit a member
    fetchMember, // Function to fetch the current member
    uploadPicture, // Function to upload picture user
  } = useMembers();

  const {
    // Response from API with all posts
    posts,
    fetchPosts,
    addPost,
    deletePost,
    updatePost,
    uploadPicPost,
    likePost,
    addComment,
    commentDelete,
    commentUpdate,
    deletePicPost,
  } = usePosts(); // Function to fetch all posts

  const user = JSON.parse(localStorage.getItem("user")); // Get the user information from localStorage

  useLayoutEffect(
    // Fetch list members when different pages are displayed
    function () {
      if (!profil || !members || !posts) {
        fetchMembers();
        fetchMember(user.userId);
        fetchPosts();
      }
    },
    [page, members, profil, user, posts, fetchMembers, fetchMember, fetchPosts]
  );

  if (!profil || !members || !posts) {
    return <Loader>Loading ...</Loader>;
  }

  // function to logout
  const onLogout = () => {
    localStorage.removeItem("user"); // Remove the user information from localStorage
    onConnect(false);
  };
  const admin = () => {
    // Function to know if user is admin
    if (members) {
      const member = members.find((member) => member._id === user.userId);
      return member.isAdmin;
    } else {
      return false;
    }
  };

  const userAdmin = admin(); // Store the result of the function admin

  let content = null; // Store the content of the page
  switch (page) {
    case "Home":
      content = (
        <Home
          posts={posts}
          members={members}
          profil={profil}
          isAdmin={userAdmin}
          addPost={addPost}
          onDelete={deletePost}
          onUpdate={updatePost}
          onUpload={uploadPicPost}
          onLike={likePost}
          addComment={addComment}
          commentDelete={commentDelete}
          commentUpdate={commentUpdate}
          deletePicPost={deletePicPost}
          desktop={desktop}
        />
      );
      break;
    case "Members":
      content = (
        <Members
          members={members}
          posts={posts}
          onDelete={deleteMember}
          onDeletePost={deletePost}
          isAdmin={userAdmin}
        />
      );
      break;
    case "Profil":
      content = (
        <Profil
          profil={profil}
          onEdit={editMembers}
          onDelete={deleteMember}
          uploadPicture={uploadPicture}
        />
      );
      break;
    default:
      content = (
        <Home
          posts={posts}
          members={members}
          profil={profil}
          isAdmin={userAdmin}
          addPost={addPost}
          onDelete={deletePost}
          onUpload={uploadPicPost}
          onLike={likePost}
          addComment={addComment}
          commentDelete={commentDelete}
          commentUpdate={commentUpdate}
          deletePicPost={deletePicPost}
        />
      );
      break;
  }

  return (
    <div className="main">
      <Navbar
        currentPage={page}
        onPage={setPage}
        profil={profil}
        onLogout={onLogout}
      />
      <div className="main__content">{content}</div>
    </div>
  );
}
