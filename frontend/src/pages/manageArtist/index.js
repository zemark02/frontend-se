import { Layout } from "../../component/layout";
import styles from "./manageArtist.module.css";
import { useEffect, useState } from "react";
import { Button } from "../../component/button";
import axios from "axios";
import { ArtistRequestBox } from "../../component/artist-request-box";
import React, { Component } from "react";

const ManageArtist = () => {
  const ARTIST_URL = "/admin/artist";
  const [barType, setBarType] = useState("OurArtists");
  const [isArtistRequestEmpty, setArtistRequestEmpty] = useState(true);
  const [isOurArtistEmpty, setOurArtistEmpty] = useState(true);
  const [artistList, setArtistList] = useState([]);
  const [toggleUpdate, setToggleUpdate] = useState(false);

  const handleToggleUpdate = () => {
    setToggleUpdate(!toggleUpdate);
  };

  useEffect(() => {
    const getDataOurArtist = async () => {
      try {
        const res = await axios.get(`${ARTIST_URL}/?status=succeed`, {
          withCredentials: true,
        });
        let tempArtist = [];
        console.log(res);
        for (let i = 0; i < res.data.length; i++) {
          tempArtist.push(res.data[i]);
        }
        if (tempArtist.length !== 0) {
          setArtistList(tempArtist);
          setOurArtistEmpty(false);
        }
      } catch (error) {
        //const err = error.response.data.message;
        console.log(error);
      }
    };

    const getDataArtistRequest = async () => {
      try {
        const res = await axios.get(`${ARTIST_URL}/?status=pending`, {
          withCredentials: true,
        });
        let tempArtist = [];
        console.log(res.data);
        for (let i = 0; i < res.data.length; i++) {
          tempArtist.push(res.data[i]);
        }
        if (tempArtist.length !== 0) {
          setArtistList(tempArtist);
          setArtistRequestEmpty(false);
        }
      } catch (error) {
        //const err = error.response.data.message;
        console.log(error);
      }
    };
    if (barType === "OurArtists") {
      getDataOurArtist();
    }
    if (barType === "ArtistRequests") {
      getDataArtistRequest();
    }
  }, [barType, toggleUpdate]);

  return (
    <Layout page="ManageArtist">
      <div className={styles.container}>
        <form className={styles.check}>
          <div>
            <input
              type="radio"
              name="barType"
              value="OurArtists"
              id="OurArtists"
              checked={barType === "OurArtists"}
              onChange={(e) => setBarType(e.target.value)}
            />
            <label
              id="OurArtists"
              className={styles.customerType}
              for="History"
            >
              Our Artist
            </label>
          </div>
          <div>
            <input
              type="radio"
              name="barType"
              value="ArtistRequests"
              id="ArtistRequests"
              checked={barType === "ArtistRequests"}
              onChange={(e) => setBarType(e.target.value)}
            />
            <label
              id="ArtistRequests"
              className={styles.customerType}
              for="ArtistRequests"
            >
              Artist Requests
            </label>
          </div>
        </form>
        {barType === "OurArtists" && isOurArtistEmpty && (
          <div>
            <div className={styles.box}>
              <div className={styles.head}>Our Artists</div>
            </div>
          </div>
        )}
        {barType === "ArtistRequests" && !isArtistRequestEmpty && (
          <div className={styles.box}>
            <div className={styles.head}>Artist Requests</div>
            <div className={styles.tail}>
              <div classname={styles.boxColor}>
                {artistList.map((artistRequest) => (
                  <ArtistRequestBox
                    barType={barType}
                    userId={artistRequest.userId}
                    profileUrl={artistRequest.profileUrl}
                    firstname={artistRequest.firstname}
                    lastname={artistRequest.lastname}
                    toggleUpdate={handleToggleUpdate}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        {barType === "ArtistRequests" && isArtistRequestEmpty && (
          <div>
            <div className={styles.box}>
              <div className={styles.head}>Artist Requests</div>
            </div>
          </div>
        )}
        {barType === "OurArtists" && !isOurArtistEmpty && (
          <div>
            <div className={styles.box}>
              <div className={styles.head}>Our Artists</div>
              <div className={styles.tail}>
                {artistList.map((artistRequest) => (
                  <ArtistRequestBox
                    barType={barType}
                    userId={artistRequest.userId}
                    profileUrl={artistRequest.profileUrl}
                    firstname={artistRequest.firstname}
                    lastname={artistRequest.lastname}
                    toggleUpdate={handleToggleUpdate}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ManageArtist;
