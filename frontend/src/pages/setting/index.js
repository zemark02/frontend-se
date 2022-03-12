import styles from "./setting.module.css";
import { Link } from "react-router-dom";
import { Button } from "../../component/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { Layout } from "../../component/layout";
import { LabelInput } from "../../component/label-input";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { IdCardImgInput } from "../../component/idcardimg-input";
import { OutlineButton } from "../../component/button-outline";

const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,50}$/;
const PASSWORD_REGEX = /^[\x00-\x7F]{8,20}$/;
const CITIZENID_REGEX = /^[0-9]{13}$/;
const NAME_REGEX = /^[a-zA-Z]{3,50}$/;
const SURNAME_REGEX = /^[a-zA-Z]{3,50}$/;
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const Setting = () => {
  const formData = new FormData();

  const userType = localStorage.getItem("role");

  const [isChangePass, setIsChangePass] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [usernameErrorMessage, setUsernameErrorMessage] = useState("");
  const [idErrorMessage, setIdErrorMessage] = useState("");
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [surnameErrorMessage, setSurnameErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");

  const [buttonDeletionPopup, setButtonDeletionPopup] = useState(false);

  const [data, setData] = useState({
    userId: "",
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    citizenId: "",
    userType: "",
    artistId: "",
    biography: null,
    minPrice: 0,
    maxPrice: 0,
  });

  const [idCardImage, setIdCardImage] = useState({ file: "", url: "" });

  useEffect(() => {
    const result = USERNAME_REGEX.test(data.username);
    if (result) {
      setUsernameErrorMessage("");
    } else {
      setUsernameErrorMessage(
        "*3-50 Characters. Only alphabets, numbers, under score are allowed"
      );
    }
  }, [data.username]);
  useEffect(() => {
    if (password !== "") {
      const result = PASSWORD_REGEX.test(password);
      if (!result) {
        setPasswordErrorMessage("*8-20 Characters");
      }
      if (password !== confirmPassword) {
        setPasswordErrorMessage("*Your passwords are not matched");
      } else {
        setPasswordErrorMessage("");
      }
    }
  }, [password, confirmPassword]);
  useEffect(() => {
    const result = CITIZENID_REGEX.test(data.citizenId);
    if (result) {
      setIdErrorMessage("");
    } else {
      setIdErrorMessage("*Citizen ID must be 13 numbers");
    }
  }, [data.citizenId]);
  useEffect(() => {
    const result = NAME_REGEX.test(data.firstname);
    if (result) {
      setNameErrorMessage("");
    } else {
      setNameErrorMessage("*3-50 Characters. Only alphabets are allowed");
    }
  }, [data.firstname]);
  useEffect(() => {
    const result = SURNAME_REGEX.test(data.lastname);
    if (result) {
      setSurnameErrorMessage("");
    } else {
      setSurnameErrorMessage("*3-50 Characters. Only alphabets are allowed");
    }
  }, [data.lastname]);
  useEffect(() => {
    const result = EMAIL_REGEX.test(data.email);
    if (result) {
      setEmailErrorMessage("");
    } else {
      setEmailErrorMessage("*Only email is allowed");
    }
  }, [data.email]);

  const handleDelete = async (e) => {
    try {
      await axios.delete("/user");
      navigate("/");
      message.success("Your account has been deleted successfully.");
    } catch (err) {
      console.log(err);
      message.error("Can not delete your account.");
    }
  };
  const navigate = useNavigate();

  useEffect(async () => {
    const role = localStorage.getItem("role");
    try {
      if (role === "CUSTOMER") {
        const res = await axios.get("/customer", {
          withCredentials: true,
        });
        const { password, ...others } = res.data;
        setData(others);
      }
      if (role === "ARTIST") {
        const res = await axios.get("/artist", {
          withCredentials: true,
        });
        const { password, ...others } = res.data;
        setData(others);
        setIdCardImage({ ...idCardImage, url: others.idCardUrl });
      }
    } catch (error) {
      console.error(error);
      message.error("Server Error");
    }
  }, []);

  const handleOpenPopUp = () => {
    setIsChangePass(!isChangePass);
  };

  const handleChangeAccountInfo = async () => {
    const role = localStorage.getItem("role");
    try {
      if (role === "CUSTOMER") {
        await axios.patch("/customer", {
          firstname: data.firstname,
          lastname: data.lastname,
          username: data.username,

          email: data.email,
          citizenId: data.citizenId,
        });
      }
      if (role === "ARTIST") {
        formData.append("firstname", data.firstname);
        formData.append("lastname", data.lastname);
        formData.append("username", data.username);
        formData.append("email", data.email);
        formData.append("citizenId", data.citizenId);
        if (idCardImage.file !== "") {
          formData.append("idCardImage", idCardImage.file);
        }
        await axios.patch("/artist", formData);
      }

      message.success(
        "Your account information has been updated successfully."
      );
    } catch (e) {
      const error = e.response.data.message;
      if (
        error?.includes("Username is already in use") ||
        error?.includes("Email is already in use") ||
        error?.includes("Citizen ID is already registered") ||
        error?.includes("email must be an email")
      ) {
        if (error?.includes("Username is already in use")) {
          setUsernameErrorMessage("*Username is already in use");
        }
        if (error?.includes("Email is already in use")) {
          setEmailErrorMessage("*Email is already in use");
        }
        if (error?.includes("Id is already in use")) {
          setIdErrorMessage("*Citizen ID is already registered");
        }
        if (error?.includes("email must be an email")) {
          setEmailErrorMessage("*Only email is allowed");
        }
      } else {
        message.error("Server Error");
        console.log(error);
      }
    }
  };

  const onImageChange = (e) => {
    if (e.target && e.target.files[0]) {
      setIdCardImage({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleChangePass = async () => {
    const role = localStorage.getItem("role");
    if (password === "" || confirmPassword === "") {
      setPasswordErrorMessage("*Please fill the password");
    } else if (password !== confirmPassword) {
      setPasswordErrorMessage("*Your passwords are not matched");
    } else {
      setPasswordErrorMessage("");

      try {
        if (role === "CUSTOMER") {
          await axios.patch("/customer", {
            password: password,
          });
        }
        if (role === "ARTIST") {
          await axios.patch("/artist", {
            password: password,
          });
        }
        message.success("Your password is changed successfully");
        navigate("/login");
      } catch (error) {
        console.error(error);
        message.error("Server Error");
      }
    }
  };

  const handleChangeInfo = (key, value) => {
    setData({ ...data, [key]: value });
  };

  return (
    <Layout page="Setting">
      {isChangePass && (
        <div className={styles.changepass_popup_container}>
          <div className={styles.changepass_popup}>
            <div>
              <h1>Create a new password</h1>
              {passwordErrorMessage !== "" && (
                <p className={styles.err_msg}>{passwordErrorMessage}</p>
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
            <div className={styles.popup_button_container}>
              <Button
                text={"Cancel"}
                color={"#FF0000"}
                onClick={(e) => handleOpenPopUp(e)}
              />
              <Button text={"Confirm"} onClick={(e) => handleChangePass(e)} />
            </div>
          </div>
        </div>
      )}
      <div className={styles.main}>
        <div className={styles.header}>Account Information</div>

        <div className={styles.row}>
          <div className={styles.col}>
            <label className={styles.fieldName}>Username</label>
            <br></br>
            <input
              className={styles.fieldBox}
              placeholder={"Username"}
              value={data.username}
              onChange={(e) => handleChangeInfo("username", e.target.value)}
              type="text"
            ></input>
            {usernameErrorMessage !== "" && (
              <div className={styles.error_message}>
                <p>{usernameErrorMessage}</p>
              </div>
            )}
          </div>

          <div className={styles.col}>
            <label className={styles.fieldName}>Email</label>
            <br></br>
            <input
              className={styles.fieldBox}
              placeholder={"Email"}
              value={data.email}
              onChange={(e) => handleChangeInfo("email", e.target.value)}
              type="email"
            ></input>
            {emailErrorMessage !== "" && (
              <div className={styles.error_message}>
                <p>{emailErrorMessage}</p>
              </div>
            )}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.col}>
            <label className={styles.fieldName}>Name</label>
            <br></br>
            <input
              className={styles.fieldBox}
              placeholder={"Firstname"}
              value={data.firstname}
              onChange={(e) => handleChangeInfo("firstname", e.target.value)}
              type="text"
            ></input>
            {nameErrorMessage !== "" && (
              <div className={styles.error_message}>
                <p>{nameErrorMessage}</p>
              </div>
            )}
          </div>
          <div className={styles.col}>
            <label className={styles.fieldName}>Surname</label>
            <br></br>
            <input
              className={styles.fieldBox}
              placeholder={"Lastname"}
              value={data.lastname}
              onChange={(e) => handleChangeInfo("lastname", e.target.value)}
              type="text"
            ></input>
            {surnameErrorMessage !== "" && (
              <div className={styles.error_message}>
                <p>{surnameErrorMessage}</p>
              </div>
            )}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.col}>
            <label className={styles.fieldName}>Citizen ID</label>
            <br></br>
            <input
              className={styles.fieldBox}
              placeholder={"CitizenID"}
              value={data.citizenId}
              onChange={(e) => handleChangeInfo("citizenId", e.target.value)}
              type="number"
            ></input>
            {idErrorMessage !== "" && (
              <div className={styles.error_message}>
                <p>{idErrorMessage}</p>
              </div>
            )}
          </div>
          <div className={styles.col}>
            <label className={styles.fieldName}>Password</label>
            <br></br>
            <OutlineButton text={"Change Password"} onClick={handleOpenPopUp} />
          </div>
        </div>
        {userType === "ARTIST" && (
          <div className={styles.row}>
            <div>
              <label className={styles.label}>Confirmation photo</label>
              <div className={styles.add_img}>
                <input
                  type="file"
                  accept=".JPEG, .JPG, .PNG"
                  className={styles.file}
                  id="img"
                  onChange={onImageChange}
                ></input>
                <label className={styles.add_img_btn} for="img">
                  Change Image
                </label>
                {idCardImage.url === "" ? (
                  <p>No file chosen</p>
                ) : (
                  <img src={idCardImage.url} />
                )}
              </div>
            </div>
          </div>
        )}

        <div className={styles.button_container}>
          <Button
            color="red"
            onClick={() => setButtonDeletionPopup(true)}
            text="Delete Account"
          />
          <Button text="Save Profile" onClick={handleChangeAccountInfo} />
        </div>
      </div>
      {buttonDeletionPopup && (
        <div className={styles.deletionPopup}>
          <div className={styles.deletionPopup_inner}>
            <div className={styles.header}>
              Are you sure you want to delete your account?
            </div>
            <br></br>
            <div className={styles.popup_button_container}>
              <Button
                onClick={() => setButtonDeletionPopup(false)}
                text="Close"
              ></Button>

              <Button color="red" onClick={handleDelete} text="Delete"></Button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Setting;
