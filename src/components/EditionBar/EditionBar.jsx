import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserData,
  hideEditForm,
  showEditForm,
} from "../../utils/UserReducer";
import Buttons from "../Buttons/Buttons";
import EditForm from "../Form/EditForm";
import styles from "./editionBar.module.scss";

export default function EditionBar() {
  const dispatch = useDispatch();

  const isEditFormVisible = useSelector(
    (state) => state.user.isEditFormVisible
  );
  const { userName, firstName, lastName } = useSelector(
    (state) => state.user.user
  );

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  const displayName = userName && userName !== "Utilisateur" ? userName : "";

  return (
    <div className={styles.editionBar__container}>
      <h1 className={styles.editionBar__title}>
        {isEditFormVisible ? (
          "Edit user infos"
        ) : (
          <>
            Welcome
            {displayName && (
              <>
                {" "}
                back
                <br />
                {displayName}
              </>
            )}
            !
          </>
        )}
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
