import { GuestLayout } from "../../component/guest-layout";
import styles from "./register.module.css";
import { Button } from "../../component/button";
import { LabelInput } from "../../component/label-input";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { IdCardImgInput } from "../../component/idcardimg-input";
import { MdAppRegistration } from "react-icons/md";

const CUSTOMER_URL = "/customer";
const ARTIST_URL = "/artist";
const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,50}$/;
const PASSWORD_REGEX = /^[\x00-\x7F]{8,20}$/;
const CITIZENID_REGEX = /^[0-9]{13}$/;
const NAME_REGEX = /^[a-zA-Z]{3,50}$/;
const SURNAME_REGEX = /^[a-zA-Z]{3,50}$/;
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const Register = () => {
  const errRef = useRef();
  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [citizenId, setCitizenId] = useState("");
  const [validCitizenId, setValidCitizenId] = useState(false);
  const [citizenIdFocus, setCitizenIdFocus] = useState(false);

  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);

  const [surname, setSurname] = useState("");
  const [validSurname, setValidSurname] = useState(false);
  const [surnameFocus, setSurnameFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [userTypeError, setUserTypeError] = useState(false);

  const [userType, setUserType] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [citizenIdError, setCitizenIdError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const [imageEmpty, setImageEmpty] = useState(true);
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const result = USERNAME_REGEX.test(username);
    setValidUsername(result);
    setUsernameError(false);
  }, [username]);
  useEffect(() => {
    const result = PASSWORD_REGEX.test(password);
    setValidPassword(result);
  }, [password]);
  useEffect(() => {
    const result = CITIZENID_REGEX.test(citizenId);
    setValidCitizenId(result);
    setCitizenIdError(false);
  }, [citizenId]);
  useEffect(() => {
    const result = NAME_REGEX.test(name);
    setValidName(result);
  }, [name]);
  useEffect(() => {
    const result = SURNAME_REGEX.test(surname);
    setValidSurname(result);
  }, [surname]);
  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
    setEmailError(false);
  }, [email]);
  useEffect(() => {
    if (userType === "customer" || userType === "artist") {
      setUserTypeError(false);
    }
  }, [userType]);

  const onImageChange = (e) => {
    console.log(e.target.files[0]);
    setImage({ file: e.target.files[0] });
    if (e.target && e.target.files[0]) {
      setImageEmpty(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setUsernameFocus(true);
    setPasswordFocus(true);
    setCitizenIdFocus(true);
    setNameFocus(true);
    setSurnameFocus(true);
    setEmailFocus(true);

    if (userType === "") {
      setUserTypeError(true);
    }

    if (
      validName &&
      validSurname &&
      validCitizenId &&
      validUsername &&
      validPassword &&
      userType !== ""
    ) {
      try {
        if (userType === "artist" && !imageEmpty) {
          const data = JSON.stringify({
            username: username,
            password: password,
            citizenId: citizenId,
            firstname: name,
            lastname: surname,
            email: email,
          });
          const formData = new FormData();
          formData.append("data", data);
          formData.append("image", image.file);
          const response = await axios.post(ARTIST_URL, formData, {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
          });
        } else if (userType === "customer") {
          const data = JSON.stringify({
            username: username,
            password: password,
            citizenId: citizenId,
            firstname: name,
            lastname: surname,
            email: email,
          });
          await axios.post(CUSTOMER_URL, data, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          });
        }
        message.success(
          "Successfully Registered",
          [2],
          (onclose = () => navigate("/login"))
        );
      } catch (error) {
        const err = error.response.data.message;
        if (
          err?.includes("Username is already in use") ||
          err?.includes("Email is already in use") ||
          err?.includes("Citizen ID is already registered") ||
          err?.includes("email must be an email")
        ) {
          if (err?.includes("Username is already in use")) {
            setUsernameError(true);
          }
          if (err?.includes("Email is already in use")) {
            setEmailError(true);
          }
          if (err?.includes("Citizen ID is already registered")) {
            setCitizenIdError(true);
          }
          if (err?.includes("email must be an email")) {
            setValidEmail(false);
          }
        } else {
          console.log(error);
          message.error("Server Error");
        }
      }
    }
  };

  return (
    <GuestLayout page="Register">
      <div className={styles.main}>
        <h1>
          <MdAppRegistration />
          Register
        </h1>
        <LabelInput
          props={"Username"}
          inputType={"text"}
          placeholder={"Username"}
          onChange={setUsername}
          value={username}
          onFocus={setUsernameFocus}
          width="100%"
        ></LabelInput>
        {usernameError && usernameFocus && (
          <div ref={errRef} className={styles.error_message}>
            <p>*Username is already taken.</p>
          </div>
        )}
        {!validUsername && usernameFocus && (
          <div className={styles.error_message}>
            <p>*3-50 Characters</p>
            <p>Only alphabets, numbers, under score are allowed.</p>
          </div>
        )}
        <LabelInput
          props={"Password"}
          inputType={"password"}
          placeholder={"Password"}
          onChange={setPassword}
          value={password}
          onFocus={setPasswordFocus}
          width="100%"
        ></LabelInput>
        {!validPassword && passwordFocus && (
          <div className={styles.error_message}>
            <p>*8-20 Characters</p>
          </div>
        )}
        <LabelInput
          props={"CitizenID"}
          inputType={"number"}
          placeholder={"CitizenID"}
          onChange={setCitizenId}
          value={citizenId}
          onFocus={setCitizenIdFocus}
          width="100%"
        ></LabelInput>
        {citizenIdError && (
          <div ref={errRef} className={styles.error_message}>
            <p> *Citizen ID is already taken.</p>
          </div>
        )}
        {!validCitizenId && citizenIdFocus && (
          <div className={styles.error_message}>
            <p>*Citizen ID must be 13 numbers</p>
          </div>
        )}
        <LabelInput
          props={"Name"}
          inputType={"text"}
          placeholder={"Name"}
          onChange={setName}
          value={name}
          onFocus={setNameFocus}
          width="100%"
        ></LabelInput>
        {!validName && nameFocus && (
          <div className={styles.error_message}>
            <p>*3-50 Characters</p>
            <p>Only alphabets are allowed</p>
          </div>
        )}
        <LabelInput
          props={"Surname"}
          inputType={"text"}
          placeholder={"Surname"}
          onChange={setSurname}
          value={surname}
          onFocus={setSurnameFocus}
          width="100%"
        ></LabelInput>
        {!validSurname && surnameFocus && (
          <div className={styles.error_message}>
            <p>*3-50 Characters</p>
            <p>Only alphabets are allowed</p>
          </div>
        )}

        <LabelInput
          props={"Email"}
          inputType={"email"}
          placeholder={"Email"}
          onChange={setEmail}
          value={email}
          onFocus={setEmailFocus}
          width="100%"
        ></LabelInput>

        {emailError && (
          <div className={styles.error_message}>
            <p> *Email is already taken.</p>
          </div>
        )}
        {!validEmail && emailFocus && (
          <div className={styles.error_message}>
            <p>*Only email is allowed</p>
          </div>
        )}

        <div style={{ width: "100%" }}>
          <form className={styles.check}>
            <div style={{ minWidth: "70px" }}>
              <input
                className={styles.dot}
                type="radio"
                name="userType"
                value="artist"
                onChange={(e) => setUserType(e.target.value)}
              />
              <label className={styles.customerType} for="artist">
                Artist
              </label>
            </div>
            <div style={{ minWidth: "100px" }}>
              <input
                className={styles.dot}
                type="radio"
                name="userType"
                value="customer"
                onChange={(e) => setUserType(e.target.value)}
              />
              <label className={styles.customerType} for="customer">
                Customer
              </label>
            </div>
          </form>
          {userTypeError && (
            <p ref={errRef} className={styles.error_message}>
              *Please select user type
            </p>
          )}
          {userType === "artist" && (
            <div className={styles.idcard_img_container}>
              <IdCardImgInput onChange={onImageChange} />
            </div>
          )}
        </div>
        {userType === "artist" && imageEmpty && (
          <div ref={errRef} className={styles.error_message}>
            <p>*Please attach the image</p>
          </div>
        )}
        <div className={styles.bottom}>
          <Button text="Register" onClick={handleSubmit} />
        </div>
      </div>
    </GuestLayout>
  );
};

export default Register;
