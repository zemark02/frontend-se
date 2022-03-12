import React, { useState } from "react";
import styles from "./datepicker.module.css";
function DatePick() {
  const [deadline, setDeadline] = useState();
  return (
    <div className={styles.container}>
      {" "}
      <input
        className={styles.input_date}
        type="date"
        onChange={(e) => setDeadline(e.target.value)}
      />
    </div>
  );
}

export default DatePick;
