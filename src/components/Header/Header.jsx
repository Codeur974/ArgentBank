import React from "react";
import logo from "../../assets/images/logo.webp";
import styles from "./Header.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
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
            <>
              <span className={styles["main-nav-item"]}>
                <FaUserCircle className={styles["icon-spacing"]} />
                {user?.username}
              </span>
              <button
                className={styles["main-nav-item"]}
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link className={styles["main-nav-item"]} to="/connexion">
              <FaUserCircle className={styles["icon-spacing"]} />
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
