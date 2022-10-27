import React from "react";

export default function Navbar({ currentPage, onClick }) {
  // Function remove the token from the local storage and redirect to the login page
  const logout = () => {
    localStorage.removeItem("token");
  };

  const navClass = function (page) {
    // Function to add the class active to the link of the nav link
    let className = "navbar__nav__item";
    if (page === currentPage) {
      className += " active";
    }
    return className;
  };

  return (
    <nav className="">
      <a href="#Home" onClick={() => onClick("Home")}>
        Logo
      </a>
      <ul className="navbar__nav">
        <li className={navClass("members")}>
          <a
            className="navbar__nav__item--link"
            href="#Members"
            onClick={() => onClick("Members")}
          >
            Members
          </a>
        </li>
        <li className={navClass("profil")}>
          <a
            className="navbar__nav__item--link"
            href="#Profil"
            onClick={() => onClick("Profil")}
          >
            Profil
          </a>
        </li>
        <li className={navClass("logout")}>
          <a className="navbar__nav__item--link" href="/" onClick={logout}>
            Logout
          </a>
        </li>
      </ul>
    </nav>
  );
}
