import EditionBar from "../../components/EditionBar/EditionBar";
import UserTransactionContainer from "../../components/UserTranction/UserTransactionContainer";

import styles from "./dashboard.module.scss";

export default function Dashboard() {
  return (
    <div className={styles.dashboard__container}>
      <EditionBar />
      <UserTransactionContainer />
    </div>
  );
}
