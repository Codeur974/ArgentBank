import React from "react";
import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.webp";
import { logout } from "../../utils/UserReducer";
import styles from "./Header.module.scss";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector((state) => state.user);

  const handleSignOut = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleSignIn = () => {
    navigate("/connexion");
  };

  const displayName = user && user.userName ? user.userName : "user";

  return (
    <div className={styles.header}>
      <div className={styles["main-nav"]}>
        <div className={styles["main-nav-logo"]}>
          <img
            src={logo}
            alt="Logo"
            className={styles["main-nav-logo-image"]}
            onClick={handleSignOut}
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
            <button className={styles.main__nav__item} onClick={handleSignIn}>
              <FaUserCircle className={styles["icon-spacing"]} />
              Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
