import React from "react";
import logo from "../../assets/images/logo.webp";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles["main-nav"]}>
        <div className={styles["main-nav-logo"]}>
          <img
            src={logo}
            alt="Logo"
            className={styles["main-nav-logo-image"]}
          />
        </div>
        <div>
          <Link className={styles["main-nav-item"]} to="./connexion">
            <FaUserCircle className={styles["icon-spacing"]} />
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
