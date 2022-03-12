import { Navbar } from "../navbar";
import styles from "./adminlayout.module.css";
import { useEffect } from "react";

export const AdminLayout = ({ children, page }) => {
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
