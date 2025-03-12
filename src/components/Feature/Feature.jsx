import styles from "./Feature.module.scss";

export default function Feature({ title, imgSrc, subtitles, description }) {
  return (
    <div className={styles.feature}>
      <h2 className="sr-only">{title}</h2>
      <div className={styles.feature__item}>
        <img
          src={imgSrc}
          alt="Feature"
          className={styles.feature__item__icon}
        />
        <h3 className={styles.feature__item__subtitles}>{subtitles}</h3>
        <p className={styles.feature__item__description}>{description}</p>
      </div>
    </div>
  );
}
