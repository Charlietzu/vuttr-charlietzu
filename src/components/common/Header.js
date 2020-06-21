import React from "react";
import { Navbar } from "reactstrap";
import "./common.css";

/**
 * Header stateless component.
 */

const Header = () => {
  return (
    <Navbar className="navbar-expand-lg navbar-light navBar">
      <a className="navbar-brand" href="/">
        VUTTR
      </a>
    </Navbar>
  );
};

export default Header;
