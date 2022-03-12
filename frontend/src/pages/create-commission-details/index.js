import { useEffect, useState } from "react";
import { Layout } from "../../component/layout";
import styles from "./createCommissionDetail.module.css";
import { LabelInput } from "../../component/label-input";
import { Button } from "../../component/button";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { message, DatePicker } from "antd";

const CreateCommissionDetail = () => {
  let { userid } = useParams();
  const [artistName, setArtistName] = useState("");
  const [artistSurname, setArtistSurname] = useState("");
  const [description, setDescription] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [focusMaxPrice, setfocusMaxPrice] = useState(false);
  const [ref1, setRef1] = useState({ file: "", url: "" });
  const [ref2, setRef2] = useState({ file: "", url: "" });
  const [ref3, setRef3] = useState({ file: "", url: "" });
  const [deadline, setDeadline] = useState(Date.now);
  const [title, setTitle] = useState("");
  const [titleErrorMessage, setTitleErrorMessage] = useState("");
  const [descErrorMessage, setDescErrorMessage] = useState("");
  const [maxPriceErrorMessage, setMaxPriceErrorMessage] = useState("");

  const navigate = useNavigate();

  useEffect(async () => {
    try {
      const res = await axios.get(`/artist/profile/${userid}`, {
        withCredentials: true,
      });
      setArtistName(res.data.firstname);
      setArtistSurname(res.data.lastname);
    } catch (error) {
      console.error(error);
      message.error("Server Error");
    }
  }, []);
  useEffect(() => {
    const result = maxPrice > 0;
    console.log(result);
    if (result) {
      setMaxPriceErrorMessage("");
    } else {
      setMaxPriceErrorMessage("Price must be more than zero.");
    }
  }, [maxPrice, maxPriceErrorMessage]);

  useEffect(() => {
    if (titleErrorMessage !== "" && title !== "") {
      setTitleErrorMessage("");
    }
  }, [title]);

  useEffect(() => {
    if (descErrorMessage !== "" && description !== "") {
      setDescErrorMessage("");
    }
  }, [description]);

  const onImageChange1 = (e) => {
    if (e.target && e.target.files[0]) {
      setRef1({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };
  const onImageChange2 = (e) => {
    if (e.target && e.target.files[0]) {
      setRef2({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };
  const onImageChange3 = (e) => {
    if (e.target && e.target.files[0]) {
      setRef3({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const onsubmit = async () => {
    if (title === "" || description === "" || maxPrice <= 0 || maxPrice == "") {
      if (title === "") {
        setTitleErrorMessage("*Please fill in the title");
      }
      if (description === "") {
        setDescErrorMessage("*Please fill in the description");
      }
      if (maxPrice === "" || maxPrice <= 0) {
        setfocusMaxPrice(true);
      }
    } else {
      setTitle("");
      setDescErrorMessage("");
      setfocusMaxPrice(false);
      const obj = {
        title: title,
        artistId: userid,
        description: description,
        maxPrice: maxPrice,
        deadline: deadline,
      };
      console.log(obj);
      const json = JSON.stringify(obj);
      const formData = new FormData();
      formData.append("data", json);
      const image = [ref1.file, ref2.file, ref3.file];
      image.forEach((file) => {
        formData.append("image", file);
      });
      console.log(image);
      try {
        if (maxPrice > 0) {
          await axios.post("/commission", formData);
          navigate("/view-commission-details");
          message.success(`Your commission is already send to ${artistName}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Layout page="CreateCommissionDetail">
      <div className={styles.container}>
        <h1 className="head_title">
          Artist: {artistName} {artistSurname}
        </h1>
        <div>
          <h1>Title</h1>
          <LabelInput
            inputType={"text"}
            onChange={setTitle}
            width="100%"
          ></LabelInput>
          {titleErrorMessage !== "" && (
            <div className={styles.error_message}>
              <p>{titleErrorMessage}</p>
            </div>
          )}
        </div>
        <div>
          <h1>Description</h1>
          <textarea
            className={styles.desInput}
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            width="80%"
          />
          {descErrorMessage !== "" && (
            <div className={styles.error_message}>
              <p>{descErrorMessage}</p>
            </div>
          )}
        </div>

        <div>
          <h1>Deadline</h1>
          <DatePicker
            className={styles.input_date}
            onChange={(e) => setDeadline(e)}
          />
        </div>
        <div>
          <h1>Maximun Price(฿)</h1>
          <LabelInput
            inputType={"number"}
            onChange={setMaxPrice}
            onFocus={setfocusMaxPrice}
            width="30%"
          ></LabelInput>
          {focusMaxPrice && maxPriceErrorMessage !== "" && (
            <div className={styles.error_message}>
              <p>{maxPriceErrorMessage}</p>
            </div>
          )}
        </div>
        <div>
          <h1>Reference</h1>
          <div>
            <div>
              <input
                type="file"
                accept=".JPEG, .JPG, .PNG"
                className={styles.file}
                onChange={onImageChange1}
              ></input>
              {ref1.url != "" && (
                <img src={ref1.url} className={styles.refPic} />
              )}
            </div>
            <div>
              <input
                type="file"
                accept=".JPEG, .JPG, .PNG"
                className={styles.file}
                onChange={onImageChange2}
              ></input>
              {ref2.url != "" && (
                <img src={ref2.url} className={styles.refPic} />
              )}
            </div>
            <div>
              <input
                type="file"
                accept=".JPEG, .JPG, .PNG"
                className={styles.file}
                onChange={onImageChange3}
              ></input>
              {ref3.url != "" && (
                <img src={ref3.url} className={styles.refPic} />
              )}
            </div>
          </div>
        </div>
        <div className={styles.create_bottom}>
          <Button text="Done" onClick={onsubmit} />
        </div>
      </div>
    </Layout>
  );
};

export default CreateCommissionDetail;
