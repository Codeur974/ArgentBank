import React from "react";
import HeroContent from "./Hero-content";
import styles from "./hero.module.scss";

export default function Hero({ imgSrc }) {
  return (
    <div className={styles.hero}>
      <img
        src={imgSrc}
        alt="image'une plante dans un pot de pièce"
        className={styles.hero__image}
      />
      <HeroContent
        title="Promoted Content "
        subtitles={["No fees.", "No minimum deposit.", "High interest rates."]}
        description="Open a savings account with Argent Bank today!"
      />
    </div>
  );
}
