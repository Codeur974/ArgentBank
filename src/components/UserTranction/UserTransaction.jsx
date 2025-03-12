import styles from "./userTransaction.module.scss";

export default function UserTransaction({ title, amount, description }) {
  return (
    <div className={styles.user}>
      <div className={styles.user__content}>
        <h3 className={styles.user__content__title}>{title}</h3>
        <p className={styles.user__content__amount}>{amount}</p>
        <p className={styles.user__content__description}>{description}</p>
      </div>
      <div className={styles.user__button}>
        <button className={styles.user__button__cta}>View transactions</button>
      </div>
    </div>
  );
}
