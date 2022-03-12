import { Result } from "antd";
import axios from "axios";
import styles from "./modal-view-details.module.css";

export const ModalViewDetails = ({
  showModal,
  userType,
  commissionId,
  barType,
  firstname,
  lastname,
  title,
  description,
  deadline,
  price,
  minPrice,
  maxPrice,
  reference,
  contract,
}) => {
  const modalSet = () => {
    showModal(false);
  };
  const acceptRequest = async () => {
    showModal(false);
    try {
      if (userType === "ARTIST") {
        console.log("check");
        const formData = new FormData();
        formData.append("commissionStatus", "accept");
        formData.append("commissionId", commissionId);
        await axios.patch("/commission/update/CommissionStatus", {
          commissionStatus: "accept",
          commissionId: commissionId,
        });
      }
    } catch (error) {
      const err = error.response.data.message;
      console.log(err);
    }
  };

  const declineRequest = async () => {
    showModal(false);
    try {
      if (userType === "ARTIST") {
        const formData = new FormData();
        formData.append("commissionStatus", "decline");
        formData.append("commissionId", commissionId);
        await axios.patch("/commission/update/CommissionStatus", {
          commissionStatus: "decline",
          commissionId: commissionId,
        });
      }
    } catch (error) {
      const err = error.response.data.message;
      console.log(err);
    }
  };

  return (
    <>
      {userType === "CUSTOMER" && barType === "History" && (
        <div className={styles.modalContainer}>
          <h1>
            {firstname} {lastname}
          </h1>
          <div className={styles.contentContainer}>
            <div className={styles.childrenContainer}>
              <p1>Title</p1>
              <span className={styles.longInput} role="textbox">
                {title}
              </span>
            </div>
            <div className={styles.childrenContainer}>
              <p1>description</p1>
              <span className={styles.longInput} role="textbox">
                {description}
              </span>
            </div>
            <div className={styles.specialContainer}>
              <div className={styles.specialChildrenContainer}>
                <p1>deadline</p1>
                <span className={styles.shortInput} role="textbox">
                  {deadline}
                </span>
              </div>
              <div className={styles.specialChildrenContainer}>
                <p1>Price</p1>
                <span className={styles.shortInput} role="textbox">
                  {maxPrice}
                </span>
              </div>
            </div>
            <div className={styles.childrenContainer}>
              <p1>Reference</p1>
              <div className={styles.imageContainer}>
                {reference.map((image) => (
                  <img src={image}></img>
                ))}
              </div>
            </div>
          </div>
          <button className={styles.doneButton} onClick={modalSet}>
            Accept
          </button>
          <button className={styles.declineButton} onClick={modalSet}>
            Decline
          </button>
        </div>
      )}
      {userType === "ARTIST" && barType === "History" && (
        <div className={styles.modalContainer}>
          <h1>
            {firstname} {lastname}
          </h1>
          <div className={styles.contentContainer}>
            <div className={styles.childrenContainer}>
              <p1>Title</p1>
              <span className={styles.longInput} role="textbox">
                {title}
              </span>
            </div>
            <div className={styles.childrenContainer}>
              <p1>description</p1>
              <span className={styles.longInput} role="textbox">
                {description}
              </span>
            </div>
            <div className={styles.specialContainer}>
              <div className={styles.specialChildrenContainer}>
                <p1>deadline</p1>
                <span className={styles.shortInput} role="textbox">
                  {deadline}
                </span>
              </div>
              <div className={styles.specialChildrenContainer}>
                <p1>Price</p1>
                <span className={styles.shortInput} role="textbox">
                  {maxPrice}
                </span>
              </div>
            </div>
            <div className={styles.childrenContainer}>
              <p1>Reference</p1>
              <div className={styles.imageContainer}>
                {reference.map((image) => (
                  <img src={image}></img>
                ))}
              </div>
            </div>
          </div>
          <button className={styles.doneButton} onClick={modalSet}>
            Done
          </button>
        </div>
      )}
      {userType === "CUSTOMER" && barType === "CommissionRequests" && (
        <div className={styles.modalContainer}>
          <h1>
            {firstname} {lastname}
          </h1>
          <div className={styles.contentContainer}>
            <div className={styles.childrenContainer}>
              <p1>Title</p1>
              <span className={styles.longInput} role="textbox">
                {title}
              </span>
            </div>
            <div className={styles.childrenContainer}>
              <p1>description</p1>
              <span className={styles.longInput} role="textbox">
                {description}
              </span>
            </div>
            <div className={styles.specialContainer}>
              <div className={styles.specialChildrenContainer}>
                <p1>deadline</p1>
                <span className={styles.shortInput} role="textbox">
                  {deadline}
                </span>
              </div>
              <div className={styles.specialChildrenContainer}>
                <p1>Price</p1>
                <span className={styles.shortInput} role="textbox">
                  {maxPrice}
                </span>
              </div>
            </div>
            <div className={styles.childrenContainer}>
              <p1>Reference</p1>
              <div className={styles.imageContainer}>
                {reference.map((image) => (
                  <img src={image}></img>
                ))}
              </div>
            </div>
          </div>
          <button className={styles.doneButton} onClick={modalSet}>
            Done
          </button>
        </div>
      )}
      {userType === "ARTIST" && barType === "CommissionRequests" && (
        <div className={styles.modalContainer}>
          <h1>
            {firstname} {lastname}
          </h1>
          <div className={styles.contentContainer}>
            <div className={styles.childrenContainer}>
              <p1>Title</p1>
              <span className={styles.longInput} role="textbox">
                {title}
              </span>
            </div>
            <div className={styles.childrenContainer}>
              <p1>description</p1>
              <span className={styles.longInput} role="textbox">
                {description}
              </span>
            </div>
            <div className={styles.specialContainer}>
              <div className={styles.specialChildrenContainer}>
                <p1>deadline</p1>
                <span className={styles.shortInput} role="textbox">
                  {deadline}
                </span>
              </div>
              <div className={styles.specialChildrenContainer}>
                <p1>Price</p1>
                <span className={styles.shortInput} role="textbox">
                  {maxPrice}
                </span>
              </div>
            </div>
            <div className={styles.childrenContainer}>
              <p1>Reference</p1>
              <div className={styles.imageContainer}>
                {reference.map((image) => (
                  <img src={image}></img>
                ))}
              </div>
            </div>
          </div>
          <button className={styles.doneButton} onClick={acceptRequest}>
            Accept
          </button>
          <button className={styles.declineButton} onClick={declineRequest}>
            Decline
          </button>
        </div>
      )}
    </>
  );
};
