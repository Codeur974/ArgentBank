import React from "react";
import logo from "../../assets/images/logo.webp";
import styles from "./Header.module.scss";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../utils/redux";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const handleSignOut = () => {
    dispatch(logout());
    navigate("/connexion");
  };

  const storedUser =
    JSON.parse(localStorage.getItem("user")) ||
    JSON.parse(sessionStorage.getItem("user"));
  const displayName =
    user.username ||
    (storedUser && storedUser.username) ||
    `${user.firstName} ${user.lastName}`;

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
          {isAuthenticated ? (
            <div className={styles.nav__buttons}>
              <span className={styles.main__nav__item}>
                <FaUserCircle className={styles["icon-spacing"]} />
                {displayName}
              </span>
              <button
                className={styles.main__nav__item}
                onClick={handleSignOut}
              >
                <FaSignOutAlt className={styles["icon-spacing"]} />
                Sign Out
              </button>
            </div>
          ) : (
            <button className={styles.main__nav__item} to="/connexion">
              <FaUserCircle className={styles["icon-spacing"]} />
              Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
