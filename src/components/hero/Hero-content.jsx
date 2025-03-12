import styles from "./Hero.module.scss";

export default function HeroContent({ title, subtitles, description }) {
  return (
    <div className={styles.hero__content}>
      <h2 className="sr-only">{title}</h2>
      {subtitles.map((subtitle, index) => (
        <p className={styles.hero__subtitle} key={index}>
          {subtitle}
        </p>
      ))}
      <p className={styles.hero__description}>{description}</p>
    </div>
  );
}
