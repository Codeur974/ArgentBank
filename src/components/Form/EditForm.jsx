import styles from "./editForm.module.scss";

export default function EditForm() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Edit user info</h2>

      <form className={styles.form}>
        <div className={styles.form__inputs}>
          <label className={styles.form__inputs__label}>User name: </label>
          <input />
        </div>
        <div className={styles.form__inputs}>
          <label className={styles.form__inputs__label}>First name: </label>
          <input />
        </div>
        <div className={styles.form__inputs}>
          <label className={styles.form__inputs__label}>Last name: </label>
          <input />
        </div>

        <div>
          <button>Save</button>
          <button>Cancel</button>
        </div>
      </form>
    </div>
  );
}
