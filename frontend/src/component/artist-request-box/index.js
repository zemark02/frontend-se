import styles from "./artist-request-box.module.css";
import { Button } from "../button";
import { AiOutlineClockCircle } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import { ArtistViewDetails } from "../artist-view-detail";
import axios from "axios";

export const ArtistRequestBox = ({
  barType,
  userId,
  profileUrl,
  firstname,
    lastname,
  toggleUpdate,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState("");
  const [citizenId, setCitizenId] = useState("");
  const [email, setEmail] = useState("");
  const [idCardUrl, setIdCardUrl] = useState("");
  const ARTIST_URL = "/artist/" + userId;

  const getData = async (e) => {
    const res = await axios.get(ARTIST_URL, {
      withCredentials: true,
    });
    console.log(res, ARTIST_URL);

    setUsername(res.data.username);
    setCitizenId(res.data.citizenId);
    setEmail(res.data.email);
    setIdCardUrl(res.data.idCardUrl);
  };

  const onButtonClick = (e) => {
    getData();
    setShowModal(true);
    console.log("clicked");
  };

  return (
    <>
      {barType === "OurArtists" && (
        <div className={styles.box}>
          <div className={styles.tail}>
            <div className={styles.left}>
              <img src={profileUrl}></img>
              <div className={styles.textContainer}>
                <h1>
                  {firstname} {lastname}
                </h1>
              </div>
            </div>
            <div className={styles.right}>
              <Button text="View details" onClick={onButtonClick}></Button>
            </div>
          </div>
        </div>
      )}
      {barType === "ArtistRequests" && (
        <div className={styles.box}>
          <div className={styles.tail}>
            <div className={styles.left}>
              <img src={profileUrl}></img>
              <div className={styles.textContainer}>
                <h1>
                  {firstname} {lastname}
                </h1>
              </div>
            </div>
            <div className={styles.right}>
              <Button text="View details" onClick={onButtonClick}></Button>
            </div>
          </div>
        </div>
      )}

      {barType === "OurArtists" && showModal && (
        <ArtistViewDetails
          showModal={setShowModal}
          barType={barType}
          firstname={firstname}
          lastname={lastname}
          username={username}
          citizenId={citizenId}
          email={email}
          idCardUrl={idCardUrl}
          profileUrl={profileUrl}
          userId={userId}
          toggleUpdate={toggleUpdate}
        />
      )}
      {barType === "ArtistRequests" && showModal && (
        <ArtistViewDetails
          showModal={setShowModal}
          barType={barType}
          firstname={firstname}
          lastname={lastname}
          username={username}
          citizenId={citizenId}
          email={email}
          idCardUrl={idCardUrl}
          profileUrl={profileUrl}
          userId={userId}
          toggleUpdate={toggleUpdate}
        />
      )}
    </>
  );
};
