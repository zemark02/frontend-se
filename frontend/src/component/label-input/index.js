import styles from "./labelinput.module.css";

export const LabelInput = ({
  props,
  inputType,
  placeholder,
  pattern,
  value,
  onChange,
  onFocus,
  width,
}) => {
  return (
    <div
      className={styles.container}
      style={{ width: width ? width : "305px" }}
    >
      <label>{props}</label>

      {onFocus ? (
        <input
          type={inputType}
          placeholder={placeholder}
          pattern={pattern}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => onFocus(true)}
        ></input>
      ) : (
        <input
          type={inputType}
          placeholder={placeholder}
          pattern={pattern}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus ? onFocus(true) : void 0}
        ></input>
      )}
    </div>
  );
};
