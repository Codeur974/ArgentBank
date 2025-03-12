import styles from "./form.module.scss";
import { FaUserCircle } from "react-icons/fa";

export default function Form() {
  return (
    <div className={styles.connexion}>
      <FaUserCircle className={styles.connexion__icon} />
      <h1>Sign In</h1>
      <form>
        <div className={styles.form__input__wrapper}>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" />
        </div>
        <div className={styles.form__input__wrapper}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" />
        </div>
        <div className={styles.form__input__remember}>
          <input type="checkbox" id="remember-me" />
          <label htmlFor="remember-me">Remember me</label>
        </div>

        <button className={styles.form__button}>Sign In</button>
      </form>
    </div>
  );
}
