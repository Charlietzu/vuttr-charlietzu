import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const activeStyle = { color: "#F15B2A" };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">
        VUTTR
      </a>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <span className="nav-link">
            <NavLink to="/" activeStyle={activeStyle} exact>
              Tools
            </NavLink>
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
