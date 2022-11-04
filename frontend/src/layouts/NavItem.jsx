import React from "react";

export function NavItem({ num, title, children, onPage }) {
  return (
    <li className={`navItem slideInDown-${num}`}>
      <a
        className="navItem__link "
        href={`#${title}`}
        onClick={() => onPage(`${title}`)}
      >
        {children}
      </a>
    </li>
  );
}
