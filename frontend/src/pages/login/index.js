import { GuestLayout } from "../../component/guest-layout";
import styles from "./login.module.css";
import { Button } from "../../component/button";
import { Link, useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";
import { MdOutlineLogin } from "react-icons/md";

import axios from "axios";
import { LabelInput } from "../../component/label-input";
const LOGIN_URL = "/auth/login";

const Login = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        LOGIN_URL,
        {
          username: user,
          password: pwd,
        },
        {
          withCredentials: true,
        }
      );
      const accessToken = response?.data.token;
      const roles = response?.data?.roles;
      const status = response?.data?.status;

      if (accessToken) {
        localStorage.setItem("token", accessToken);
        localStorage.setItem("role", roles);
        localStorage.setItem("username", user);
        localStorage.setItem("userStatus", status);
      }
      setUser("");
      setPwd("");
      navigate("/home");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Invalid Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
    }
  };

  return (
    <>
      <GuestLayout page={"Login"}>
        <div className={styles.main}>
          <div className={styles.frame}>
            <h1>
              <MdOutlineLogin />
              Login
            </h1>
            {errMsg && (
              <p className={styles.error_message} aria-live="assertive">
                {errMsg}
              </p>
            )}
            <div className={styles.bottom}>
              <form onSubmit={handleSubmit}>
                <div className={styles.input_container}>
                  <LabelInput
                    props={"Username"}
                    inputType={"text"}
                    onChange={setUser}
                    value={user}
                  ></LabelInput>
                </div>

                <div className={styles.input_container}>
                  <LabelInput
                    props={"Password"}
                    inputType={"password"}
                    onChange={setPwd}
                    value={pwd}
                  ></LabelInput>
                  <div className={styles.forgot_pass_text}>
                    <Link to="/forgotPass">forgot password?</Link>
                  </div>
                </div>

                <Button text="Login" />
              </form>
            </div>
          </div>
        </div>
      </GuestLayout>
    </>
  );
};

export default Login;
