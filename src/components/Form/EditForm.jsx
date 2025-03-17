import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUsername } from "../../utils/redux";
import styles from "./editForm.module.scss";
import Buttons from "../Buttons/Buttons";

export default function EditForm({
  username = "",
  firstName = "",
  lastName = "",
  onCancel,
}) {
  const dispatch = useDispatch();
  const [newUsername, setNewUsername] = useState(username);

  const handleUsernameChange = (e) => {
    setNewUsername(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUsername(newUsername));
    onCancel();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.form__inputs}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={newUsername}
          onChange={handleUsernameChange}
        />
      </div>
      <div className={styles.form__inputs}>
        <label htmlFor="firstName">First Name</label>
        <input type="text" id="firstName" value={firstName} readOnly />
      </div>
      <div className={styles.form__inputs}>
        <label htmlFor="lastName">Last Name</label>
        <input type="text" id="lastName" value={lastName} readOnly />
      </div>
      <div className={styles.form__buttons}>
        <Buttons title={"Save"} type="submit" className={styles.form__button} />

        <Buttons
          title={"Cancel"}
          type="button"
          className={styles.form__button}
          onClick={onCancel}
        />
      </div>
    </form>
  );
}
