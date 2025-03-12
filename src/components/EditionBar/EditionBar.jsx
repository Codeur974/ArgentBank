import styles from "./editionBar.module.scss";

export default function EditionBar() {
  return (
    <div>
      <h1 className={styles.editionBar__title}>
        Welcome back
        <br />
        Tony Jarvis!
      </h1>
      <button className={styles.editionBar__button}>Edit Name</button>
      <h2 className="sr-only">Accounts</h2>
    </div>
  );
}
