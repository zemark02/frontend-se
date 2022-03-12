import styles from "./commission-request-box.module.css";
import { Button } from "../button";
import { AiOutlineClockCircle, AiFillCheckCircle } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import { ModalViewDetails } from "../model-view-details";
import axios from "axios";

export const CommissionRequestBox = ({
  userType,
  barType,
  commissionId,
  image,
  name,
  surname,
  status,
  index,
}) => {
  const [showModal, setShowModal] = useState(false);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [price, setPrice] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [reference, setReference] = useState([]);
  const [contract, setContract] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [statusIcon, setIcon] = useState("");
  const COMMISSION_URL = "/commission/view/" + commissionId;

  const onButtonClick = (e) => {
    const getData = async (e) => {
      const res = await axios.get(COMMISSION_URL, {
        withCredentials: true,
      });
      console.log(res.data);
      setTitle(res.data.title);
      setDescription(res.data.description);
      setDeadline(res.data.deadline);
      setMinPrice(res.data.minPrice);
      setMaxPrice(res.data.maxPrice);
      setContract(res.data.contract);
      let tempList = [];
      for (let i = 0; i < res.data.imageUrls.length; i++) {
        tempList.push(res.data.imageUrls[i].imageUrlCommission);
        console.log(res.data.imageUrls[i].imageUrlCommission);
      }
      setReference(tempList);
    };
    getData();
    setFirstname(name);
    setLastname(surname);
    setShowModal(true);
    console.log("clicked");
  };

  useEffect(() => {
    if (status === "PENDING") {
      setStatusMessage("pending");
      setIcon("AiOutlineClockCircle");
    } else if (status === "INPROCESS") {
      setStatusMessage("in process");
      setIcon("AiOutlineClockCircle");
    } else if (status === "SUCCEED") {
      setStatusMessage("success");
      setIcon("AiFillCheckCircle");
    }
  }, [statusMessage, statusIcon]);

  return (
    <>
      {userType === "CUSTOMER" && barType === "CommissionRequests" && (
        <div className={styles.box}>
          <div className={styles.tail}>
            <div className={styles.left}>
              <img src={image ? image : "../blank-profile.png"} />
              <div className={styles.textContainer}>
                <h1>
                  {name} {surname}
                </h1>
                <div>
                  <AiOutlineClockCircle />
                  <p1>{statusMessage}</p1>
                </div>
              </div>
            </div>
            <div className={styles.right}>
              <Button text="View details" onClick={onButtonClick}></Button>
            </div>
          </div>
        </div>
      )}
      {userType === "ARTIST" && barType === "CommissionRequests" && (
        <div className={styles.box}>
          <div className={styles.tail}>
            <div className={styles.left}>
              <img src={image ? image : "../blank-profile.png"} />
              <div className={styles.textContainer}>
                <h1>
                  {name} {surname}
                </h1>
                <div>
                  <AiOutlineClockCircle />
                  <p1>{statusMessage}</p1>
                </div>
              </div>
            </div>
            <div className={styles.right}>
              <Button text="View details" onClick={onButtonClick}></Button>
            </div>
          </div>
        </div>
      )}
      {userType === "CUSTOMER" && barType === "History" && (
        <div className={styles.box}>
          <div className={styles.tail}>
            <div className={styles.left}>
              <div className={styles.textContainer}>
                <h1>
                  {name} {surname}
                </h1>
                <div>
                  <AiOutlineClockCircle />
                  <p1>{statusMessage}</p1>
                </div>
              </div>
            </div>
            <div className={styles.right}>
              <Button text="View details" onClick={onButtonClick}></Button>
            </div>
          </div>
        </div>
      )}
      {userType === "ARTIST" && barType === "History" && (
        <div className={styles.box}>
          <div className={styles.tail}>
            <div className={styles.left}>
              <div className={styles.textContainer}>
                <h1>
                  {name} {surname}
                </h1>
                <div>
                  <AiOutlineClockCircle />
                  <p1>{statusMessage}</p1>
                </div>
              </div>
            </div>
            <div className={styles.right}>
              <Button text="View details" onClick={onButtonClick}></Button>
              <Button text="Update"></Button>
            </div>
          </div>
        </div>
      )}
      {userType === "CUSTOMER" && barType === "History" && showModal && (
        <ModalViewDetails
          showModal={setShowModal}
          commissionId={commissionId}
          userType={userType}
          barType={barType}
          firstname={firstname}
          lastname={lastname}
          description={description}
          deadline={deadline}
          minPrice={minPrice}
          maxPrice={maxPrice}
          reference={reference}
          contract={contract}
          title={title}
        />
      )}
      {userType === "ARTIST" && barType === "History" && showModal && (
        <ModalViewDetails
          showModal={setShowModal}
          commissionId={commissionId}
          userType={userType}
          barType={barType}
          firstname={firstname}
          lastname={lastname}
          description={description}
          deadline={deadline}
          minPrice={minPrice}
          maxPrice={maxPrice}
          reference={reference}
          contract={contract}
          title={title}
        />
      )}
      {userType === "CUSTOMER" &&
        barType === "CommissionRequests" &&
        showModal && (
          <ModalViewDetails
            showModal={setShowModal}
            commissionId={commissionId}
            userType={userType}
            barType={barType}
            firstname={firstname}
            lastname={lastname}
            description={description}
            deadline={deadline}
            minPrice={minPrice}
            maxPrice={maxPrice}
            reference={reference}
            contract={contract}
            title={title}
          />
        )}
      {userType === "ARTIST" &&
        barType === "CommissionRequests" &&
        showModal && (
          <ModalViewDetails
            showModal={setShowModal}
            commissionId={commissionId}
            userType={userType}
            barType={barType}
            firstname={firstname}
            lastname={lastname}
            description={description}
            deadline={deadline}
            minPrice={minPrice}
            maxPrice={maxPrice}
            reference={reference}
            contract={contract}
            title={title}
          />
        )}
    </>
  );
};
