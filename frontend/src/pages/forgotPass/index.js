import { GuestLayout } from "../../component/guest-layout";
import styles from "./forgotPass.module.css";
import { Button } from "../../component/button";
import { useNavigate } from "react-router-dom";
import { LabelInput } from "../../component/label-input";
import { useState, useEffect } from "react";
import axios from "axios";

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const ForgotPass = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    if (email !== "") {
      const result = EMAIL_REGEX.test(email);
      if (!result) {
        setErrorMessage("*only email is allowed");
      } else {
        setErrorMessage("");
      }
    }
  }, [email]);

  const handleSubmit = async () => {
    if (email === "") {
      setErrorMessage("*Please input your email.");
    } else if (errorMessage === "") {
      try {
        await axios.post("/user/forgot-password", {
          email: email,
        });
        navigate("/forgotPass/sendEmail");
      } catch (err) {
        console.log(err.response);
      }
    }
  };
  return (
    <GuestLayout page="ForgotPass">
      <div className={styles.main}>
        <h1>Forgot your password?</h1>
        <LabelInput
          props={"Email_Address"}
          inputType={"email"}
          value={email}
          onChange={setEmail}
        ></LabelInput>
        {errorMessage !== "" && (
          <p className={styles.error_message}>{errorMessage}</p>
        )}
        <div className={styles.button_container}>
          <Button text="Send Request" onClick={handleSubmit} />
        </div>
      </div>
    </GuestLayout>
  );
};

export default ForgotPass;
