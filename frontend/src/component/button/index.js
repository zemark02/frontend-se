import styles from "./button.module.css";

export const Button = ({ color, text, onClick, resize }) => {
  return (
    <button
      className={resize ? styles.botton_resize : styles.button}
      style={{ backgroundColor: color ? color : "#00CD90" }}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
