import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, setError } from "../../utils/redux";
import styles from "./form.module.scss";
import { FaUserCircle } from "react-icons/fa";

export default function Form() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { errors } = useSelector((state) => state.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.includes("@")) {
      dispatch(setError({ email: "Email invalide" }));
      return;
    }

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
          {errors?.email && <p className={styles.error}>{errors.email}</p>}
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
          {errors?.password && (
            <p className={styles.error}>{errors.password}</p>
          )}
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

        <button
          type="submit"
          className={styles.form__button}
          disabled={!email || !password}
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
