import styles from "./outlineButton.module.css";

export const OutlineButton = ({ text, onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {text}
    </button>
  );
};
