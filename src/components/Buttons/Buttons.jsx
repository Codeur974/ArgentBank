import styles from "./button.module.scss";

export default function Buttons({ title }) {
  return <div className={styles.Buttons}>{title}</div>;
}
