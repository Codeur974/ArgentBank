import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditForm from "../Form/EditForm";
import styles from "./editionBar.module.scss";
import { showEditForm, hideEditForm, fetchUserData } from "../../utils/redux";
import Buttons from "../Buttons/Buttons";

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
    <div className={styles.editionBar__container}>
      <h1 className={styles.editionBar__title}>
        Welcome back
        <br />
        {username ? username : `${firstName} ${lastName}`}!
      </h1>
      {!isEditFormVisible && (
        <div className={styles.editionBar__button}>
          <Buttons
            title={"Edit Name"}
            className={styles.editionBar__button}
            onClick={toggleEditForm}
          />
        </div>
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
