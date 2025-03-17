import styles from "./button.module.scss";
const Buttons = ({ title, className, ...props }) => {
  return (
    <button className={`${styles.buttons} ${className}`} {...props}>
      {title}
    </button>
  );
};

export default Buttons;
