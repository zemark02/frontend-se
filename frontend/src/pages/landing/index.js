import { GuestLayout } from "../../component/guest-layout";
import styles from "./landing.module.css";
import { Button } from "../../component/button";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <GuestLayout>
      <div className={styles.main}>
        <img src="logo.png" className={styles.logoimg} />
        <div className={styles.frame}>
          <Link to="/login">
            <Button text="Login" />
          </Link>
          <Link to="/register">
            <Button text="Register" />
          </Link>
        </div>
      </div>
    </GuestLayout>
  );
};

export default Landing;
