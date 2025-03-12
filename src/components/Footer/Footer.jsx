import React from "react";
import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <p className={styles.footer__text}>Copyright 2020 Argent Bank</p>
    </div>
  );
}
