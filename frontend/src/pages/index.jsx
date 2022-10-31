import React, { useEffect, useState } from "react";
import { useMembers } from "../hooks/members";
import Navbar from "../layouts/Navbar";
import Home from "./Home";
import Members from "./Members";
import Profil from "./Profil";

/**
 * Display the different pages
 * @returns {JSX.Element} The pages to display
 */
export default function Pages() {
  const [page, setPage] = useState("home"); // Store the current page

  const {
    members, // Response from API with all members
    profil, // Response from API with the current member
    fetchMembers, // Function to fetch all members
    deleteMember, // Function to delete a member
    editMembers, // Function to edit a member
    fetchMember, // Function to fetch the current member
  } = useMembers();

  const user = JSON.parse(localStorage.getItem("user")); // Get the user information from localStorage
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
      content = <Home />;
      break;
    case "Members":
      content = (
        <Members
          members={members}
          onDelete={deleteMember}
          isAdmin={userAdmin}
        />
      );
      break;
    case "Profil":
      content = (
        <Profil profil={profil} onEdit={editMembers} onDelete={deleteMember} />
      );
      break;
    default:
      content = <Home />;
      break;
  }

  useEffect(
    // Fetch list members when member page
    function () {
      if (page === "Members" || page === "Profil") {
        fetchMembers();
        fetchMember(user.userId);
      }
    },
    [page, fetchMembers, fetchMember, user.userId]
  );

  return (
    <>
      <Navbar currentPage={page} onClick={setPage} />
      {content}
    </>
  );
}
