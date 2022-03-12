import styles from "./navbar.module.css";
import {
  AiFillHome,
  AiOutlineSearch,
  AiFillCaretUp,
  AiFillCaretDown,
  AiOutlineSetting,
  AiOutlineLogout,
  AiTwotoneHeart,
} from "react-icons/ai";

import {
  MdAccountCircle,
  MdOutlineLogin,
  MdAppRegistration,
  MdOutlineAdminPanelSettings,
} from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export const Navbar = ({ page, state }) => {
  const navigate = useNavigate();
  const [isOpenCollapsibleMenu, setIsOpenCollapsibleMenu] = useState(false);
  const [isOpenGuestCollapsibleMenu, setIsOpenGuestCollapsibleMenu] =
    useState(false);

  const username = localStorage.getItem("username");

  const handleToggleCollapse = () => {
    setIsOpenCollapsibleMenu(!isOpenCollapsibleMenu);
  };

  const handleToggleGuestCollapse = () => {
    setIsOpenGuestCollapsibleMenu(!isOpenGuestCollapsibleMenu);
  };

  const role = localStorage.getItem("role");

  const handleLogout = async () => {
    try {
      await axios.delete("/auth/logout", {
        withCredentials: true,
      });
      localStorage.setItem("token", "");
      localStorage.setItem("role", "");
      localStorage.setItem("username", "");
      localStorage.setItem("userId", "");
      localStorage.setItem("userStatus", "");
      navigate("/");
    } catch (err) {
      console.log(err.response);
    }
  };

  if (state === "logined") {
    return (
      <div className={styles.container}>
        <img src="/logo.png" className={styles.logoimg} />

        <div className={styles.navbarContainer}>
          <div className={styles.accountContainer}>
            <div
              className={[
                role === "ARTIST" ? styles.artistRole : styles.customerRole,
                styles.role,
              ].join(" ")}
            >
              {role}
            </div>
            <Link to="/profile">
              <MdAccountCircle className={styles.profileimg} />
            </Link>
            <Link to="/profile" className={styles.usernameText}>
              {username}
            </Link>
            <div className={styles.collapseBtn} onClick={handleToggleCollapse}>
              {isOpenCollapsibleMenu ? <AiFillCaretUp /> : <AiFillCaretDown />}
            </div>
          </div>

          {isOpenCollapsibleMenu && (
            <div className={styles.collapsibleMenu}>
              {role === "ADMIN" ? (
                <>
                  <Link
                    to="/manage-artist"
                    className={[
                      page === "ManageArtist" ? styles.active : styles.unactive,
                      styles.mobileMenu,
                    ].join(" ")}
                  >
                    <MdOutlineAdminPanelSettings />
                    Manage Artist
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/view-commission-details"
                    className={[
                      page === "ViewCommissionDetails"
                        ? styles.active
                        : styles.unactive,
                      styles.mobileMenu,
                    ].join(" ")}
                  >
                    <AiTwotoneHeart />
                    Commission details
                  </Link>
                  <Link
                    to="/search"
                    className={[
                      page === "Search" ? styles.active : styles.unactive,
                      styles.mobileMenu,
                    ].join(" ")}
                  >
                    <AiOutlineSearch />
                    Search Artist
                  </Link>
                  <Link
                    to="/setting"
                    className={[
                      page === "Setting" ? styles.active : styles.unactive,
                      styles.mobileMenu,
                    ].join(" ")}
                  >
                    <AiOutlineSetting />
                    Setting
                  </Link>
                </>
              )}

              <a className={styles.menuItem} onClick={handleLogout}>
                <AiOutlineLogout />
                Logout
              </a>
            </div>
          )}

          <div className={styles.menuContainer}>
            {role === "ADMIN" ? (
              <>
                <Link
                  to="/manage-artist"
                  className={
                    page === "ManageArtist" ? styles.active : styles.unactive
                  }
                >
                  <MdOutlineAdminPanelSettings />
                  Manage Artist
                </Link>
              </>
            ) : (
              <>
                {" "}
                <Link
                  to="/view-commission-details"
                  className={
                    page === "ViewCommissionDetails"
                      ? styles.active
                      : styles.unactive
                  }
                >
                  <AiTwotoneHeart />
                  Commission details
                </Link>
                <Link
                  to="/search"
                  className={
                    page === "Search" ? styles.active : styles.unactive
                  }
                >
                  <AiOutlineSearch />
                  Search Artist
                </Link>
                <Link
                  to="/setting"
                  className={
                    page === "Setting" ? styles.active : styles.unactive
                  }
                >
                  <AiOutlineSetting />
                  Setting
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.container}>
        <div>
          <img src="/logo.png" className={styles.logoimg} />
        </div>

        <div className={styles.guest_main_menu_container}>
          <Link
            to="/login"
            className={page === "Login" ? styles.active : styles.unactive}
          >
            <MdOutlineLogin /> Login
          </Link>
          <Link
            to="/register"
            className={page === "Register" ? styles.active : styles.unactive}
          >
            <MdAppRegistration /> Register
          </Link>
          <div
            className={styles.guest_collapseBtn}
            onClick={handleToggleGuestCollapse}
          >
            {isOpenGuestCollapsibleMenu ? (
              <AiFillCaretUp />
            ) : (
              <AiFillCaretDown />
            )}
          </div>
        </div>

        {isOpenGuestCollapsibleMenu && (
          <div className={styles.collapsibleMenu}>
            <Link
              to="/login"
              className={[
                page === "Login" ? styles.active : styles.unactive,
                styles.mobileMenu,
              ].join(" ")}
            >
              <MdOutlineLogin /> Login
            </Link>
            <Link
              to="/register"
              className={[
                page === "Register" ? styles.active : styles.unactive,
                styles.mobileMenu,
              ].join(" ")}
            >
              <MdAppRegistration /> Register
            </Link>
          </div>
        )}
      </div>
    );
  }
};
