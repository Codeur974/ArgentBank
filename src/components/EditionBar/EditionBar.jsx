import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditForm from "../Form/EditForm";
import styles from "./editionBar.module.scss";
import { showEditForm, hideEditForm, fetchUserData } from "../../utils/redux";
import Buttons from "../Buttons/Buttons";

export default function EditionBar() {
  const dispatch = useDispatch();

  // Accès à l'état Redux
  const isEditFormVisible = useSelector(
    (state) => state.user.isEditFormVisible
  );
  const { userName, firstName, lastName } = useSelector(
    (state) => state.user.user
  );

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  // Détermine le nom à afficher
  const displayName =
    userName !== "Utilisateur" && userName
      ? userName
      : `${firstName} ${lastName}`.trim();

  return (
    <div className={styles.editionBar__container}>
      <h1 className={styles.editionBar__title}>
        Welcome back
        <br />
        {displayName}!
      </h1>

      {!isEditFormVisible && (
        <Buttons
          title={"Edit Name"}
          className={styles.editionBar__button}
          onClick={() => dispatch(showEditForm())}
        />
      )}

      <h2 className="sr-only">Accounts</h2>

      {isEditFormVisible && (
        <EditForm
          username={userName}
          firstName={firstName}
          lastName={lastName}
          onCancel={() => dispatch(hideEditForm())}
        />
      )}
    </div>
  );
}
