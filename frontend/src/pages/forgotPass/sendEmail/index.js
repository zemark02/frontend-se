import { GuestLayout } from "../../../component/guest-layout";
import styles from "./sendEmail.module.css";
import { Button } from "../../../component/button";
import { Link } from "react-router-dom";

const SendEmail = () => {
  return (
    <GuestLayout page="SendEmail">
      <div className={styles.main}>
        <img src="../logo.png" className={styles.logoimg} />
        <div>
          <h5>We've sent you a recovery link via email.</h5>
        </div>
      </div>
    </GuestLayout>
  );
};

export default SendEmail;
