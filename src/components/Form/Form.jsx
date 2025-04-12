import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../utils/UserReducer";
import Buttons from "../Buttons/Buttons";
import styles from "./form.module.scss";

export default function Form() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const resultAction = await dispatch(
      loginUser({ email, password, rememberMe })
    );

    if (loginUser.fulfilled.match(resultAction)) {
      navigate("/dashboard");
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

        {error && <p className={styles.error}>{error}</p>}

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
