import { Layout } from "../../../component/layout";
import styles from "./artistInfo.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import { GrDocumentUser } from "react-icons/gr";
import { Button } from "../../../component/button";
import { useState, useEffect } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const ArtistProfile = () => {
  let { userid } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({
    userId: "",
    biography: "",
    minPrice: 0,
    maxPrice: 0,
    rating: null,
    username: "",
    firstname: "",
    lastname: "",
    profileUrl: "",
    artworkList: [],
  });

  useEffect(async () => {
    try {
      const res = await axios.get(`/artist/profile/${userid}`, {
        withCredentials: true,
      });
      setData(res.data);
    } catch (error) {
      console.error(error);
      message.error("Server Error");
    }
  }, []);

  return (
    <Layout page={data.username}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.profile_info}>
            <img
              src={
                data.profileUrl === null
                  ? "../blank-profile.png"
                  : data.profileUrl
              }
              className={styles.profileimg}
            ></img>
            <div>
              <h1>
                {data.firstname} {data.lastname}
              </h1>
              <h2>@{data.username}</h2>
              <p>
                <BsStarFill className={styles.star_mini} />
                {data.rating === null ? 0 : data.rating}
              </p>
            </div>
          </div>
          <div className={styles.desktop_btn}>
            <Button
              text={
                <>
                  Send Hiring Request
                  <GrDocumentUser className={styles.doc_icon} />
                </>
              }
              onClick={() => navigate(`/create-commission-details/${userid}`)}
            />
          </div>

          <div className={styles.mobile_btn}>
            <Button
              text={<GrDocumentUser className={styles.doc_icon} />}
              resize={true}
              onClick={() => navigate(`/create-commission-details/${userid}`)}
            />
          </div>
        </div>
        <div className={styles.biography}>
          <h3>Biography</h3>
          <div>{data.biography}</div>
        </div>
        <div className={styles.work_info}>
          <div className={styles.row}>
            <h1 className={styles.left_col}>Review</h1>
            {data.rating === null ? (
              <div className={styles.right_col}>-</div>
            ) : (
              <div className={styles.right_col}>
                {Array(parseInt(data.rating, 10)).map((itm, i) => (
                  <BsStarFill className={styles.star} />
                ))}
                {data.rating > parseInt(data.rating, 10) && (
                  <BsStarHalf className={styles.star_half} />
                )}
                {data.rating}
              </div>
            )}
          </div>

          <div className={styles.row}>
            <h1 className={styles.left_col}>Price Range</h1>
            {data.maxPrice === 0 ? (
              <div className={styles.right_col}>-</div>
            ) : (
              <div className={styles.right_col}>
                ฿{data.minPrice} - ฿{data.maxPrice}
              </div>
            )}
          </div>
          <div className={styles.work}>
            <h1>My Work</h1>
            {data.artworkList.length === 0 ? (
              <div className={styles.artwork_container}>no artwork</div>
            ) : (
              <div className={styles.artwork_container}>
                {data.artworkList.map((artwork, i) => (
                  <img
                    key={artwork.artworkId}
                    src={artwork.artworkUrl}
                    className={styles.artwork}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ArtistProfile;
