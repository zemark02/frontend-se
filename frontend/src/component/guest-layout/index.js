import styles from "./guestlayout.module.css";
import { useEffect } from "react";
import { Navbar } from "../navbar";

export const GuestLayout = ({ children, page }) => {
  useEffect(() => {
    if (page) {
      document.title = "PaintPLZ - " + page;
    }
  }, []);

  return (
    <div className={styles.container}>
      <Navbar page={page} state={"guest"}></Navbar>
      <div className={styles.body}>{children}</div>
    </div>
  );
};
