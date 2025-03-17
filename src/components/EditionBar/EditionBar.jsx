import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditForm from "../Form/EditForm";
import styles from "./editionBar.module.scss";
import { showEditForm, hideEditForm, fetchUserData } from "../../utils/redux";

export default function EditionBar() {
  const dispatch = useDispatch();
  const isEditFormVisible = useSelector(
    (state) => state.user.isEditFormVisible
  );
  const { username, firstName, lastName } = useSelector(
    (state) => state.user.user
  );

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  const toggleEditForm = () => {
    if (isEditFormVisible) {
      dispatch(hideEditForm());
    } else {
      dispatch(showEditForm());
    }
  };

  return (
    <div>
      <h1 className={styles.editionBar__title}>
        Welcome back
        <br />
        {username ? username : `${firstName} ${lastName}`}!
      </h1>
      {!isEditFormVisible && (
        <button className={styles.editionBar__button} onClick={toggleEditForm}>
          Edit Name
        </button>
      )}
      <h2 className="sr-only">Accounts</h2>
      {isEditFormVisible && (
        <EditForm
          username={username}
          firstName={firstName}
          lastName={lastName}
          onCancel={toggleEditForm}
        />
      )}
    </div>
  );
}
