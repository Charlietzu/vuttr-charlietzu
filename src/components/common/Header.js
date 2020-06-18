import React from "react";
import styles from "./Styles";
import { Navbar } from "reactstrap";

const Header = () => {
  const activeStyle = { color: "#F15B2A" };

  return (
    <Navbar style={styles.navBar} className="navbar-expand-lg navbar-light">
      <a className="navbar-brand" href="/">
        VUTTR
      </a>
    </Navbar>
  );
};

export default Header;
