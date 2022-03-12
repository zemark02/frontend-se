import { GuestLayout } from "../../../component/guest-layout";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./changePass.module.css";
import { useState, useEffect } from "react";
import { LabelInput } from "../../../component/label-input";
import { Button } from "../../../component/button";
import axios from "axios";
import { message } from "antd";

const PASSWORD_REGEX = /^[\x00-\x7F]{8,20}$/;

const ChangePass = () => {
  let { userid } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (password !== "") {
      const result = PASSWORD_REGEX.test(password);
      if (!result) {
        setErrorMessage("*8-20 Characters");
      }
      if (password !== confirmPassword) {
        setErrorMessage("*Your passwords are not matched");
      } else {
        setErrorMessage("");
      }
    }
  }, [password, confirmPassword]);

  const handleSubmit = async () => {
    if (password === "" || confirmPassword === "") {
      setErrorMessage("Please fill the password");
    } else if (password !== confirmPassword) {
      setErrorMessage("*Your passwords are not matched");
    } else {
      setErrorMessage("");
      try {
        const response = await axios.patch(`/user/forgot-password/${userid}`, {
          password: password,
        });
        console.log(response);
        message.success("Your password is changed successfully");
        navigate("/login");
      } catch (err) {
        message.error("Server Error");
        console.log(err.response);
      }
    }
  };

  return (
    <GuestLayout page="SendEmail">
      <div className={styles.container}>
        <div>
          <h1>Create a new password</h1>
          {errorMessage !== "" && (
            <p className={styles.err_msg}>{errorMessage}</p>
          )}
        </div>
        <LabelInput
          props={"Password"}
          inputType={"password"}
          value={password}
          onChange={setPassword}
        />
        <LabelInput
          props={"Confirm Password"}
          inputType={"password"}
          value={confirmPassword}
          onChange={setConfirmPassword}
        />
        <div className={styles.button_container}>
          <Button text={"Confirm"} onClick={handleSubmit} />
        </div>
      </div>
    </GuestLayout>
  );
};

export default ChangePass;
