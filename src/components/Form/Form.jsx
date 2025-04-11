import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../utils/redux";
import styles from "./form.module.scss";
import { FaUserCircle } from "react-icons/fa";
import Buttons from "../Buttons/Buttons";

export default function Form() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Appel de l'action loginUser
    const resultAction = await dispatch(
      loginUser({ email, password, rememberMe })
    );

    if (loginUser.fulfilled.match(resultAction)) {
      navigate("/dashboard");
    } else {
      console.error(
        "Failed to login:",
        resultAction.payload || resultAction.error
      );
    }
  };

  return (
    <div className={styles.connexion}>
      <FaUserCircle className={styles.connexion__icon} />
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.form__input__wrapper}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
          {error?.email && <p className={styles.error}>{error.email}</p>}
        </div>
        <div className={styles.form__input__wrapper}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          {error?.password && <p className={styles.error}>{error.password}</p>}
        </div>
        <div className={styles.form__input__remember}>
          <input
            type="checkbox"
            id="remember-me"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label htmlFor="remember-me">Remember me</label>
        </div>

        <Buttons
          type="submit"
          title={"Sign In"}
          className={styles.form__button}
          disabled={!email || !password}
        />
      </form>
    </div>
  );
}
