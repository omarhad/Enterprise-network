import React, { useState } from "react";
import SvgLogout from "../utils/icons/SvgLogout";
import { NavItem } from "./NavItem";

/**
 * Display the navbar
 * @param {Object} profil - The profil of the current user
 * @param {Function} onClick - The function to change the page
 * @returns nav => The navbar && The menu burger
 */
export default function Navbar({ profil, onPage, onLogout }) {
  // Function remove the token from the local storage and redirect to the login page
  const [showLinks, setShowLinks] = useState(false);

  const handelShowLinks = () => {
    setShowLinks(!showLinks);
  };

  const navBar = [
    // Elements of the navbar (pages)
    {
      id: "1",
      title: "Home",
      children: "Home",
    },
    {
      id: "2",
      title: "Members",
      children: "Members",
    },
    {
      id: "3",
      title: "Profil",
      children: `Welcome ${profil && profil.lastName}`,
    },
  ];

  return (
    <nav className={`main__header ${showLinks ? "show-nav" : "hide-nav"}`}>
      <div className="main__header__logo">
        <img src="./images/logo/logo-m.png" alt="logo" />
      </div>
      <ul className="navBar">
        {navBar.map((navBar) => (
          <div key={navBar.id} onClick={handelShowLinks}>
            <NavItem title={navBar.title} num={navBar.id} onPage={onPage}>
              <h5>{navBar.children}</h5>
            </NavItem>
          </div>
        ))}
        <li key="4" className="navItem slideInDown-4" onClick={onLogout}>
          <div className="navItem__link">
            <SvgLogout />
          </div>
        </li>
      </ul>
      <button className="navBar__burger" onClick={handelShowLinks}>
        <span className="navBar__burger--line"></span>
      </button>
    </nav>
  );
}
