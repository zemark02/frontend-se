import { Layout } from "../../component/layout";
import styles from "./profile.module.css";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import { FiSave } from "react-icons/fi";
import { AiFillEdit, AiFillCamera, AiOutlineClose } from "react-icons/ai";
import { Button } from "../../component/button";
import { useState, useEffect } from "react";
import axios from "axios";
import { message } from "antd";
import { OutlineButton } from "../../component/button-outline";
import { LabelInput } from "../../component/label-input";

const Profile = () => {
  const [isEdittingInfo, setIsEdittingInfo] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [artworkTags, setArtworkTags] = useState([]);

  const [data, setData] = useState({
    artworkList: [],
    biography: null,
    firstname: "",
    lastname: "",
    maxPrice: 0,
    minPrice: 0,
    profileUrl: null,
    rating: null,
    status: "",
    userId: "",
    userType: "",
    username: "",
  });

  const [profileImage, setProfileImage] = useState({ file: "", url: "" });
  const [titleErrMsg, setTitleErrMsg] = useState("");
  const [descErrMsg, setDescErrMsg] = useState("");
  const [tagErrMsg, setTagErrMsg] = useState("");
  const [artworkImgErrMsg, setArtworkImgErrMsg] = useState("");
  const [priceErrMsg, setPriceErrMsg] = useState("");

  const [deletingArtworkList, setDeletingArtworkList] = useState([]);

  const [addingArtwork, setAddingArtwork] = useState({
    image: "",
    artworkTitle: "",
    artworkDescription: "",
    artTags: [],
  });

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
        const res = await axios.get(
          `artist/profile/${localStorage.getItem("userId")}`,
          {
            withCredentials: true,
          }
        );
        const { password, ...others } = res.data;
        setData(others);
        setProfileImage({ ...profileImage, url: others.profileUrl });
      }
    } catch (error) {
      console.error(error);
      message.error("Server Error");
    }
  }, []);

  useEffect(() => {
    var artTagList = [];
    var inputElements = document.getElementsByClassName("checkbox_input");
    for (var i = 0; inputElements[i]; ++i) {
      if (inputElements[i].checked) {
        artTagList.push(inputElements[i].value);
      }
    }
    if (addingArtwork.artworkTitle !== "") {
      setTitleErrMsg("");
    }
    if (addingArtwork.artworkDescription !== "") {
      setDescErrMsg("");
    }
    if (artTagList.length != 0) {
      setTagErrMsg("");
    }
    if (addingArtwork.image !== "") {
      setArtworkImgErrMsg("");
    }
  }, [addingArtwork]);

  useEffect(async () => {
    try {
      const { data } = await axios.get("/art-tag");
      setArtworkTags(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (data.minPrice > data.maxPrice) {
      setPriceErrMsg("*Max price must be more than Min price");
    } else {
      setPriceErrMsg("");
    }
  }, [data.minPrice, data.maxPrice]);

  const handleTogglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
    setTitleErrMsg("");
    setTagErrMsg("");
    setDescErrMsg("");
    setArtworkImgErrMsg("");
  };

  const handleArtworkTitleChange = (value) => {
    setAddingArtwork({
      ...addingArtwork,
      artworkTitle: value,
    });
  };

  const handleAddArtwork = async () => {
    var artTagList = [];
    var inputElements = document.getElementsByClassName("checkbox_input");
    for (var i = 0; inputElements[i]; ++i) {
      if (inputElements[i].checked) {
        artTagList.push(inputElements[i].value);
      }
    }
    if (
      addingArtwork.artworkTitle === "" ||
      artTagList.length === 0 ||
      addingArtwork.image === "" ||
      addingArtwork.artworkDescription === ""
    ) {
      if (addingArtwork.artworkTitle === "") {
        setTitleErrMsg("*Please fill in the title");
      }
      if (artTagList.length == 0) {
        setTagErrMsg("*Please select the artwork tag");
      }
      if (addingArtwork.image === "") {
        setArtworkImgErrMsg("*Please add the artwork image");
      }
      if (addingArtwork.artworkDescription === "") {
        setDescErrMsg("*Please fill in the description");
      }
    } else {
      setTitleErrMsg("");
      setTagErrMsg("");
      setDescErrMsg("");
      setArtworkImgErrMsg("");
      const formData = new FormData();
      formData.append("artworkTitle", addingArtwork.artworkTitle);
      formData.append("artworkDesc", addingArtwork.artworkDescription);
      formData.append("artTags", artTagList);
      formData.append("image", addingArtwork.image);

      try {
        const res = await axios.post("/artwork", formData);
        setData({
          ...data,
          artworkList: [
            ...data.artworkList,
            {
              artworkId: res.data.artworkId,
              artworkUrl: URL.createObjectURL(addingArtwork.image),
              artworkTitle: addingArtwork.artworkTitle,
              artworkDesc: addingArtwork.artworkDescription,
            },
          ],
        });
        setAddingArtwork({
          image: "",
          artworkTitle: "",
          artworkDescription: "",
          artTags: [],
        });
        setIsPopupOpen(false);
      } catch (error) {
        message.error(error.message);
        console.log(error);
      }
    }
  };

  const onProfileImageChange = (e) => {
    if (e.target && e.target.files[0]) {
      setProfileImage({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const onImageChange = (e) => {
    if (e.target && e.target.files[0]) {
      setAddingArtwork({ ...addingArtwork, image: e.target.files[0] });
    }
  };

  const handleSubmit = async () => {
    if (priceErrMsg === "") {
      document.getElementById("bio").disabled = true;
      setIsEdittingInfo(false);
      const formData = new FormData();
      formData.append("biography", data.biography);
      formData.append("minPrice", data.minPrice);
      formData.append("maxPrice", data.maxPrice);
      formData.append("profileImage", profileImage.file);
      for (let i = 0; i < deletingArtworkList.length; i++) {
        try {
          const res = await axios.delete(`/artwork/${deletingArtworkList[i]}`);
        } catch (error) {
          console.log(error);
        }
      }
      try {
        const res = await axios.patch("/artist/profile", formData);
        setData({
          ...data,
          profileUrl: profileImage.url,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Layout page="Profile">
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.profile_info}>
            {isEdittingInfo ? (
              <div className={styles.editting_profile}>
                <label for="profile" className={styles.overlay}>
                  <AiFillCamera />
                </label>
                <input
                  id="profile"
                  type="file"
                  accept=".JPEG, .JPG, .PNG"
                  className={styles.file}
                  onChange={onProfileImageChange}
                />
                <img
                  src={
                    profileImage.url === null || profileImage.url === ""
                      ? "./blank-profile.png"
                      : profileImage.url
                  }
                  className={styles.profileimg}
                ></img>
              </div>
            ) : (
              <div>
                <img
                  src={
                    data.profileUrl === null
                      ? "./blank-profile.png"
                      : data.profileUrl
                  }
                  className={styles.profileimg}
                ></img>
              </div>
            )}

            <div>
              <h1>
                {data.firstname} {data.lastname}
              </h1>
              <h2>@{data.username}</h2>
              {localStorage.getItem("role") === "ARTIST" && (
                <p>
                  <BsStarFill className={styles.star_mini} />
                  {data.rating === null ? 0 : data.rating}
                </p>
              )}
            </div>
          </div>
          {localStorage.getItem("role") === "ARTIST" && (
            <div className={styles.desktop_btn}>
              {isEdittingInfo ? (
                <Button
                  text={
                    <>
                      Save <FiSave />
                    </>
                  }
                  onClick={handleSubmit}
                  resize={true}
                />
              ) : (
                <Button
                  text={
                    <>
                      Edit <AiFillEdit />
                    </>
                  }
                  onClick={() => {
                    setIsEdittingInfo(true);
                    document.getElementById("bio").disabled = false;
                  }}
                  resize={true}
                />
              )}
            </div>
          )}

          {localStorage.getItem("role") === "ARTIST" && (
            <div className={styles.mobile_btn}>
              {isEdittingInfo ? (
                <Button
                  text={<FiSave />}
                  onClick={handleSubmit}
                  resize={true}
                />
              ) : (
                <Button
                  text={<AiFillEdit />}
                  onClick={() => {
                    setIsEdittingInfo(true);
                    document.getElementById("bio").disabled = false;
                  }}
                  resize={true}
                />
              )}
            </div>
          )}
        </div>
        {localStorage.getItem("role") === "ARTIST" && (
          <>
            <div className={styles.biography}>
              <h3>Biography</h3>
              <textarea
                rows="5"
                className={
                  isEdittingInfo ? styles.editting : styles.not_editting
                }
                id="bio"
                disabled
                value={
                  data.biography === null && !isEdittingInfo
                    ? "-"
                    : data.biography
                }
                onChange={(e) =>
                  setData({ ...data, biography: e.target.value })
                }
              ></textarea>
            </div>
            <div className={styles.work_info}>
              {!isEdittingInfo && (
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
              )}
              {isEdittingInfo ? (
                <>
                  <div className={styles.row}>
                    <h1 className={styles.left_col}>Price Range</h1>
                    <div className={styles.price_input}>
                      <input
                        type="number"
                        value={data.minPrice}
                        onChange={(e) =>
                          setData({ ...data, minPrice: e.target.value })
                        }
                      ></input>
                      -
                      <input
                        type="number"
                        value={data.maxPrice}
                        onChange={(e) =>
                          setData({ ...data, maxPrice: e.target.value })
                        }
                      ></input>
                      ฿
                    </div>
                  </div>
                  {priceErrMsg !== "" && (
                    <p className={styles.tag_error_message}>{priceErrMsg}</p>
                  )}
                </>
              ) : (
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
              )}
              <div className={styles.work}>
                <h1>My Work</h1>
                {isEdittingInfo && (
                  <OutlineButton
                    text={"Add artwork"}
                    onClick={handleTogglePopup}
                  />
                )}
                {data.artworkList.length === 0 ? (
                  <div className={styles.artwork_container}>no artwork</div>
                ) : (
                  <div className={styles.artwork_container}>
                    {data.artworkList
                      .filter(
                        (aw) => !deletingArtworkList.includes(aw.artworkId)
                      )
                      .map((artwork) => (
                        <div className={styles.artwork_item}>
                          {isEdittingInfo && (
                            <label className={styles.artwork_overlay}>
                              <AiOutlineClose
                                onClick={() =>
                                  setDeletingArtworkList([
                                    ...deletingArtworkList,
                                    artwork.artworkId,
                                  ])
                                }
                              />
                            </label>
                          )}
                          <img
                            key={artwork.artworkId}
                            src={artwork.artworkUrl}
                            className={styles.artwork}
                          />
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      {isPopupOpen && (
        <div className={styles.popup_container}>
          <div className={styles.popup}>
            <h1>Add your artwork</h1>
            <LabelInput
              props="Title"
              inputType="text"
              width={"100%"}
              value={addingArtwork.artworkTitle}
              onChange={handleArtworkTitleChange}
            />
            {titleErrMsg !== "" && (
              <p className={styles.error_message}>{titleErrMsg}</p>
            )}
            <div className={styles.popup_input_container}>
              <label className={styles.label}>Description</label>
              <textarea
                rows="5"
                className={styles.editting}
                value={addingArtwork.artworkDescription}
                onChange={(e) =>
                  setAddingArtwork({
                    ...addingArtwork,
                    artworkDescription: e.target.value,
                  })
                }
              ></textarea>
            </div>
            {descErrMsg !== "" && (
              <p className={styles.error_message}>{descErrMsg}</p>
            )}

            <div className={styles.popup_input_container}>
              <label className={styles.label}>ArtTag</label>
              <div className={styles.tag_container}>
                {artworkTags.map((itm) => (
                  <label className={styles.checkbox} key={itm.tagTagId}>
                    {itm.tagName}
                    <input
                      class="checkbox_input"
                      type="checkbox"
                      value={itm.tagName}
                    />
                    <span className={styles.checkmark}></span>
                  </label>
                ))}
              </div>
              {tagErrMsg !== "" && (
                <p className={styles.tag_error_message}>{tagErrMsg}</p>
              )}
            </div>

            <div className={styles.popup_input_container}>
              <label className={styles.label}>Artwork Image</label>
              <div className={styles.add_img}>
                <input
                  type="file"
                  accept=".JPEG, .JPG, .PNG"
                  className={styles.file}
                  id="img"
                  onChange={onImageChange}
                ></input>
                <label className={styles.add_img_btn} for="img">
                  Add Image
                </label>
                {addingArtwork.image.name === "" ? (
                  <p>No file chosen</p>
                ) : (
                  <p>{addingArtwork.image.name}</p>
                )}
              </div>
              {artworkImgErrMsg !== "" && (
                <p className={styles.tag_error_message}>{artworkImgErrMsg}</p>
              )}
            </div>
            <div className={styles.popup_button_container}>
              <Button
                color="red"
                text="Cancle"
                onClick={() => {
                  handleTogglePopup();
                  setAddingArtwork({
                    image: "",
                    artworkTitle: "",
                    artworkDescription: "",
                    artTags: [],
                  });
                }}
              ></Button>
              <Button text="Save" onClick={handleAddArtwork}></Button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Profile;
