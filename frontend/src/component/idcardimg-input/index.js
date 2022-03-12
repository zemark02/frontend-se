import styles from "./idcardimg.module.css";

export const IdCardImgInput = ({ onChange, value }) => {
  return (
    <div className={styles.container}>
      <h1>Confirmation photo</h1>
      <div>Please upload your photo holding Citizen ID</div>
      <input
        type="file"
        accept=".JPEG, .JPG, .PNG"
        className={styles.file}
        name="filename"
        value={value}
        onChange={onChange}
      ></input>
    </div>
  );
};
