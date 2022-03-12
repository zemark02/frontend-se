import styles from "./artist-view-detail.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../button";

export const ArtistViewDetails = ({
  showModal,
  barType,
  profileUrl,
  username,
  citizenId,
  email,
  firstname,
  lastname,
  idCardUrl,
  userId,
  toggleUpdate,
}) => {
  const modalSet = () => {
    showModal(false);
  };
  const [declinedPopup, setDeclinedPopup] = useState(false);
  const [declinedReason, setDeclinedReason] = useState("");
  const handleUpdateStatus = async (status) => {
    console.log(status);
    try {
      const data = { status };
      console.log(data);
      if (status === "failed") {
        data.declinedReason = declinedReason;
      }

      const res = await axios.patch(`/admin/artist/${userId}`, data, {
        withCredentials: true,
      });
      console.log(res);
      toggleUpdate();
      modalSet();
    } catch (error) {
      //const err = error.response.data.message;
      console.log(error);
    }
  };

  return (
    <div className={styles.popUp}>
      {barType === "OurArtists" && (
        <div className={styles.modalContainer}>
          <button className={styles.closeButton} onClick={modalSet}>
            X
          </button>
          <div className={(styles.row, styles.title)}>
            <h1>
              {firstname} {lastname}
            </h1>
          </div>
          <div className={styles.row}>
            <div>
              <img
                className={styles.picSize}
                src={profileUrl === null ? "blank-profile.png" : profileUrl}
              />
            </div>
            <div className={styles.col}>
              <div className={styles.bigBox}>
                <div className={styles.row}>
                  <div className={styles.bold}>Username</div>
                  <div className={styles.field}>{username}</div>
                </div>

                <div className={styles.row}>
                  <div className={styles.bold}>Citizen ID</div>
                  <div className={styles.field}>{citizenId}</div>
                </div>

                <div className={styles.row}>
                  <div className={styles.bold}>Email</div>
                  <div className={styles.field}>{email}</div>
                </div>

                <div className={styles.row}>
                  <div className={styles.bold}>Name</div>
                  <div className={styles.field}>{firstname}</div>
                </div>

                <div className={styles.row}>
                  <div className={styles.bold}>Surname</div>
                  <div className={styles.field}>{lastname}</div>
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.bold_long}>Comfirmation Photo :</div>
                <div className={styles.download}>
                  <a className={styles.download_text} href={idCardUrl}>
                    Click to view
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {barType === "ArtistRequests" && (
        <div className={styles.modalContainer}>
          <button className={styles.closeButton} onClick={modalSet}>
            X
          </button>
          <div className={(styles.row, styles.title)}>
            <h1>
              {firstname} {lastname}
            </h1>
          </div>
          <div className={styles.row}>
            <div>
              <img
                className={styles.picSize}
                src={profileUrl === null ? "blank-profile.png" : profileUrl}
              ></img>
            </div>
            <div className={styles.col}>
              <div className={styles.bigBox}>
                <div className={styles.row}>
                  <div className={styles.bold}>Username</div>
                  <div className={styles.field}>{username}</div>
                </div>
                <div className={styles.row}>
                  <div className={styles.bold}>Citizen ID</div>
                  <div className={styles.field}>{citizenId}</div>
                </div>
                <div className={styles.row}>
                  <div className={styles.bold}>Email</div>
                  <div className={styles.field}>{email}</div>
                </div>
                <div className={styles.row}>
                  <div className={styles.bold}>Name</div>
                  <div className={styles.field}>{firstname}</div>
                </div>
                <div className={styles.row}>
                  <div className={styles.bold}>Surname</div>
                  <div className={styles.field}>{lastname}</div>
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.bold_long}>Comfirmation Photo :</div>
                <div className={styles.download}>
                  <a className={styles.download_text} href={idCardUrl}>
                    Click to view
                  </a>
                </div>
              </div>
            </div>
          </div>
          <button
            className={styles.doneButton}
            onClick={(e) => handleUpdateStatus("succeed")}
          >
            Accept
          </button>
          <button
            className={styles.declineButton}
            onClick={(e) => setDeclinedPopup(true)}
          >
            Decline
          </button>
        </div>
      )}
      {declinedPopup && (
        <div>
          <div className={styles.declinationPopup}>
            <div className={styles.declinationPopup_inner}>
              <div className={styles.header}>
                Please enter your reason to decline this artist
              </div>
              <br></br>
              <textarea
                rows="5"
                className={styles.reasonBox}
                value={declinedReason}
                onChange={(e) => setDeclinedReason(e.target.value)}
                type="text"
              ></textarea>

              <div className={styles.popup_button_container}>
                <br></br>
                <div className={styles.row} style={{ float: "right" }}>
                  <Button
                    className={styles.closeButton}
                    onClick={(e) => setDeclinedPopup(false)}
                    text="Back"
                  ></Button>

                  <Button
                    onClick={(e) => handleUpdateStatus("failed")}
                    text="Submit"
                  ></Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
