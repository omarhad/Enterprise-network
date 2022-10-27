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

  const { members, fetchMembers, deleteMember } = useMembers();

  let content = null; // Store the content of the page
  switch (page) {
    case "Home":
      content = <Home />;
      break;
    case "Members":
      content = <Members members={members} onDelete={deleteMember} />;
      break;
    case "Profil":
      content = <Profil />;
      break;
    default:
      content = <Home />;
      break;
  }

  useEffect(
    // Fetch list members when member page
    function () {
      if (page === "Members") {
        fetchMembers();
      }
    },
    [page]
  );

  return (
    <>
      <Navbar currentPage={page} onClick={setPage} />
      {content}
    </>
  );
}
