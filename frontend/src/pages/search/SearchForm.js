import React, { useState, useEffect } from "react";
import styles from "./SearchForm.module.css";
import { Button } from "../../component/button";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { BsStarFill } from "react-icons/bs";
import axios from "axios";

function SearchForm() {
  const url = "/artist/filter";
  const navigate = useNavigate();

  // All artist result after search
  const [searchList, setSearchList] = useState([
    // userId: "",
    // firstname: "",
    // lastname: "",
    // rating: 0,
    // profileUrl: "",
  ]);

  // request body for artist filter
  const [data, setData] = useState({
    username: "",
    minPrice: 0,
    maxPrice: 0,
    minRating: 0,
    maxRating: 0,
    artTags: [],
  });

  const [artTagText, setArtTagText] = useState("");
  const [artworkTags, setArtworkTags] = useState([
    {
      artTagId: "",

      tagName: "",
    },
  ]);
  const [artTagFocus, setArtTagFocus] = useState(false);

  useEffect(async () => {
    try {
      const { data } = await axios.get("/art-tag");
      setArtworkTags(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(async () => {
    const res = await axios.post(url, {
      username: "",
      minPrice: 0,
      maxPrice: 0,
      minRating: 0,
      maxRating: 0,
      artTags: [],
    });
    setSearchList(res.data);
  }, []);

  const handlesubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(url, {
      username: data.username,
      minPrice: parseInt(data.minPrice),
      maxPrice: parseInt(data.maxPrice),
      minRating: parseInt(data.minRating),
      maxRating: parseInt(data.maxRating),
      artTags: data.artTags,
    });
    console.log(res.data);
    setSearchList(res.data);
  };

  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
    console.log(newdata);
  }
  return (
    <div className={styles.SearchField}>
      <form onSubmit={(e) => handlesubmit(e)}>
        <div className={styles.SearchName}>
          <input
            className={styles.SearchUsername}
            onChange={(e) => handle(e)}
            id="username"
            value={data.username}
            placeholder="Search by Artist's name"
            type="text"
          ></input>
          <Button className={styles.submitButton} text="Submit" />
        </div>

        <div className={styles.field}>
          <span className={styles.label}>Price Rate</span>
          <span>
            <input
              className={styles.number_input}
              onChange={(e) => handle(e)}
              id="minPrice"
              value={data.minPrice}
              type="number"
            />
          </span>
          -
          <span>
            <input
              className={styles.number_input}
              onChange={(e) => handle(e)}
              id="maxPrice"
              value={data.maxPrice}
              type="number"
            />
          </span>
          <span className={styles.label}>Baht</span>
        </div>

        <div className={styles.field}>
          <span className={styles.label}>Rating</span>
          <span>
            <input
              className={styles.number_input}
              onChange={(e) => handle(e)}
              id="minRating"
              value={data.minRating}
              type="number"
            />
          </span>
          -
          <span>
            <input
              className={styles.number_input}
              onChange={(e) => handle(e)}
              id="maxRating"
              value={data.maxRating}
              type="number"
            />
          </span>
          <span className={styles.label}>Stars</span>
        </div>

        {/* this shoud be able to select with multiple artTags */}

        <div className={styles.field} onFocus={() => setArtTagFocus(true)}>
          <span className={styles.label}>Artwork Tag</span>
          <input
            className={styles.artTags}
            onChange={(e) => setArtTagText(e.target.value)}
            id="artTags"
            value={artTagText}
            placeholder="Search Tag"
            type="text"
          />
        </div>
        {data.artTags !== [] && (
          <div className={styles.selectedTag_container}>
            {data.artTags.map((itm, i) => (
              <div key={i} className={styles.selectedTag}>
                {itm}
                <AiOutlineClose
                  className={styles.delete_button}
                  onClick={() => {
                    var tmp = data.artTags.filter(function (tag) {
                      return tag !== itm;
                    });
                    setData({
                      ...data,
                      artTags: tmp,
                    });
                  }}
                />
              </div>
            ))}
          </div>
        )}
        {artTagFocus && (
          <div
            className={styles.tagList}
            style={{ marginTop: data.artTags.length === 0 ? "-30px" : "-45px" }}
          >
            {artworkTags
              .filter(function (tag) {
                return (
                  tag.tagName?.includes(artTagText) &&
                  !data.artTags.includes(tag.tagName)
                );
              })
              .map((itm) => (
                <div
                  key={itm.artTagId}
                  className={styles.tagItem}
                  onClick={() => {
                    setData({
                      ...data,
                      artTags: [...data.artTags, itm.tagName],
                    });
                    setArtTagFocus(false);
                  }}
                >
                  {itm.tagName}
                </div>
              ))}
          </div>
        )}
      </form>

      {/* rendering the artist result from artist filter end point */}
      <div className={styles.resultBox}>
        <div className={styles.resultBar}>
          Result <AiOutlineSearch />
        </div>
        {searchList.map((artist) => (
          <>
            <div className={styles.artistBox}>
              <span className={styles.artistInfo}>
                <img
                  className={styles.artistImage}
                  src={
                    artist.profileUrl !== null
                      ? artist.profileUrl
                      : "blank-profile.png"
                  }
                />
                <span className={styles.artistText}>
                  <h1>
                    {artist.firstname} {artist.lastname}
                  </h1>
                  <div className={styles.rating}>
                    <BsStarFill />
                    <h3>{artist.rating === null ? 0 : artist.rating}</h3>
                  </div>
                </span>
              </span>
              <span>
                {/* this button should navigate to artistInfo with userId */}
                <Button
                  className={styles.viewProfileButton}
                  text="View Profile"
                  onClick={() => navigate(`/search/${artist.userId}`)}
                />
              </span>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}

export default SearchForm;
