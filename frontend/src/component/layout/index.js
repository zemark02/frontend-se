import { Navbar } from "../navbar";
import styles from "./layout.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import axios from "axios";
import { AiFillWarning, AiFillCloseCircle } from "react-icons/ai";

export const Layout = ({ children, page }) => {
  const [islLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(async () => {
    if (page) {
      document.title = "PaintPLZ - " + page;
    }
    const token = localStorage.getItem("token");
    if (
      token.localStorage.getItem("role") === "ARTIST" ||
      token.localStorage.getItem("role") === "CUSTOMER"
    ) {
      if (token === null || token === undefined || token === "") {
        message.warning("Please Login");
        navigate("/login");
      } else {
        try {
          const response = await axios.get("/auth/isexpired", {
            withCredentials: true,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            },
          });
          if (response.data.jwtStatus) {
            localStorage.setItem("token", "");
            localStorage.setItem("role", "");
            localStorage.setItem("username", "");
            localStorage.setItem("userId", "");
            localStorage.setItem("userStatus", "");
            message.warning("Please Login");
            navigate("/login");
          } else if (!response.data.jwtStatus) {
            localStorage.setItem("userId", response.data.userId);
            localStorage.setItem("userStatus", response.data.status);
          }
        } catch (err) {
          localStorage.setItem("token", "");
          localStorage.setItem("role", "");
          localStorage.setItem("username", "");
          localStorage.setItem("userId", "");
          localStorage.setItem("userStatus", "");
          message.error("Server Error");
          navigate("/login");
          console.log(err.response);
        }
      }
    }
  }, []);

  return (
    <>
      <Navbar page={page} state={"logined"}></Navbar>
      <div className={styles.container}>
        {localStorage.getItem("userStatus") === "PENDING" && (
          <div className={styles.user_pending_status_container}>
            <AiFillWarning className={styles.pending_icon} />
            Waiting for your account verification from an admin.
          </div>
        )}
        {localStorage.getItem("userStatus") === "FAILED" && (
          <div className={styles.user_failed_status_container}>
            <AiFillCloseCircle className={styles.failed_icon} />
            <div>
              Your account verification is rejected by an admin. Please edit
              your account infromation at Setting page.
            </div>
          </div>
        )}
        {children}
      </div>
    </>
  );
};
