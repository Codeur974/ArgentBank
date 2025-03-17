import UserTransaction from "./UserTransaction";
import styles from "./userTransaction.module.scss";

export default function UserTransactionContainer() {
  return (
    <div className={styles.user__container}>
      <UserTransaction
        title="Argent Bank Checking (x8349)"
        amount="$2,082.79"
        description="Available Balance"
      />
      <UserTransaction
        title="Argent Bank Savings (x6712)"
        amount="$10,928.42"
        description="Available Balance"
      />
      <UserTransaction
        title="Argent Bank Credit Card (x8349)"
        amount="$184.30"
        description="Current Balance"
      />
    </div>
  );
}
