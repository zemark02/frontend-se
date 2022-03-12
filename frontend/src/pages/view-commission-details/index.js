import { useEffect, useState } from "react";
import { Layout } from "../../component/layout";
import { Button } from "../../component/button";
import styles from "./viewCommissionDetail.module.css";
import axios from "axios";
import { CommissionRequestBox } from "../../component/commission-request-box";
import React, { Component } from "react";

const ViewCommissionDetail = () => {
  const CUSTOMER_URL = "/commission/customer";
  const ARTIST_URL = "/commission/artist";
  const [barType, setBarType] = useState("History");
  const [isCommissionRequestEmpty, setCommissionRequestEmpty] = useState(true);
  const [isHistoryEmpty, setHistoryEmpty] = useState(true);
  const [currentUserType, setCurrentUserType] = useState("");
  const [commissionRequestList, setCommissionRequestList] = useState([]);
  const [commissionHistoryList, setCommissionHistoryList] = useState([]);

  useEffect(() => {
    const getDataHistory = async () => {
      const role = localStorage.getItem("role");
      setCurrentUserType(role);
      try {
        if (role === "CUSTOMER") {
          const res = await axios.get(CUSTOMER_URL, {
            withCredentials: true,
          });
          let tempList = [];
          for (let i = 0; i < res.data.length; i++) {
            if (
              res.data[i].commissionStatus !== "PENDING" &&
              res.data[i].commissionStatus !== "FAILED"
            ) {
              tempList.push(res.data[i]);
            }
          }
          setCommissionHistoryList(tempList);
          if (tempList.length !== 0) {
            setHistoryEmpty(false);
            setCommissionRequestEmpty(true);
          }
        } else if (role === "ARTIST") {
          const res = await axios.get(ARTIST_URL, {
            withCredentials: true,
          });
          console.log(res.data);
          let tempList = [];
          for (let i = 0; i < res.data.length; i++) {
            if (
              res.data[i].commissionStatus !== "PENDING" &&
              res.data[i].commissionStatus !== "FAILED"
            ) {
              tempList.push(res.data[i]);
            }
          }
          setCommissionHistoryList(tempList);
          if (tempList.length !== 0) {
            setHistoryEmpty(false);
            setCommissionRequestEmpty(true);
          }
        }
      } catch (error) {
        const err = error.response.data.message;
        console.log(err);
      }
    };

    const getDataCommissionRequest = async () => {
      const role = localStorage.getItem("role");
      setCurrentUserType(role);
      try {
        if (role === "CUSTOMER") {
          const res = await axios.get(CUSTOMER_URL, {
            withCredentials: true,
          });
          let tempList = [];
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].commissionStatus === "PENDING") {
              tempList.push(res.data[i]);
            }
          }
          if (tempList.length !== 0) {
            setCommissionRequestEmpty(false);
            setHistoryEmpty(true);
          }
          setCommissionRequestList(tempList);
        } else if (role === "ARTIST") {
          const res = await axios.get(ARTIST_URL, {
            withCredentials: true,
          });
          let tempList = [];
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].commissionStatus === "PENDING") {
              tempList.push(res.data[i]);
            }
          }
          if (tempList.length !== 0) {
            setCommissionRequestEmpty(false);
            setHistoryEmpty(true);
          }
          setCommissionRequestList(tempList);
        }
      } catch (error) {
        const err = error.response.data.message;
        console.log(err);
      }
    };
    if (barType === "CommissionRequests") {
      getDataCommissionRequest();
    }
    if (barType === "History") {
      getDataHistory();
    }
  }, [barType]);

  return (
    <Layout page="ViewCommissionDetail">
      <form className={styles.check}>
        <div>
          <input
            type="radio"
            name="barType"
            value="History"
            id="History"
            checked={barType === "History"}
            onChange={(e) => setBarType(e.target.value)}
          />
          <label id="History" className={styles.customerType} for="History">
            History
          </label>
        </div>
        <div>
          <input
            type="radio"
            name="barType"
            value="CommissionRequests"
            id="CommissionRequests"
            checked={barType === "CommissionRequests"}
            onChange={(e) => setBarType(e.target.value)}
          />
          <label
            id="CommissionRequests"
            className={styles.customerType}
            for="CommissionRequests"
          >
            Commission Requests
          </label>
        </div>
      </form>
      {currentUserType === "CUSTOMER" &&
        barType === "History" &&
        isHistoryEmpty && (
          <div>
            <div className={styles.box}>
              <div className={styles.head}>History</div>
            </div>
            <div classname = {styles.tail}>
              No data
            </div>
          </div>
        )}
      {currentUserType === "CUSTOMER" &&
        barType === "CommissionRequests" &&
        !isCommissionRequestEmpty && (
          <div className={styles.box}>
            <div className={styles.head}>Commission Requests</div>

            {commissionRequestList.map((commission) => (
              <CommissionRequestBox
                userType={currentUserType}
                barType={barType}
                commissionId={commission.commissionId}
                image={commission.artist.user.profileURL}
                name={commission.artist.user.firstname}
                surname={commission.artist.user.lastname}
                status={commission.commissionStatus}
              />
            ))}
          </div>
        )}
      {currentUserType === "CUSTOMER" &&
        barType === "CommissionRequests" &&
        isCommissionRequestEmpty && (
          <div>
            <div className={styles.box}>
              <div className={styles.head}>Commission Requests</div>
            </div>
          </div>
        )}
      {currentUserType === "CUSTOMER" &&
        barType === "History" &&
        !isHistoryEmpty && (
          <div>
            <div className={styles.box}>
              <div className={styles.head}>History</div>

              {commissionHistoryList.map((commission) => (
                <CommissionRequestBox
                  userType={currentUserType}
                  barType={barType}
                  commissionId={commission.commissionId}
                  image={commission.artist.user.profileURL}
                  name={commission.artist.user.firstname}
                  surname={commission.artist.user.lastname}
                  status={commission.commissionStatus}
                />
              ))}
            </div>
            <div classname = {styles.tail}>
              No data
            </div>
          </div>
        )}

      {currentUserType === "ARTIST" && barType === "History" && isHistoryEmpty && (
        <div>
          <div className={styles.box}>
            <div className={styles.head}>History</div>
          </div>
        </div>
      )}
      {currentUserType === "ARTIST" &&
        barType === "CommissionRequests" &&
        !isCommissionRequestEmpty && (
          <div className={styles.box}>
            <div className={styles.head}>Commission Requests</div>

            {commissionRequestList.map((commission) => (
              <CommissionRequestBox
                userType={currentUserType}
                barType={barType}
                commissionId={commission.commissionId}
                image={commission.customer.user.profileURL}
                name={commission.customer.user.firstname}
                surname={commission.customer.user.lastname}
                status={commission.commissionStatus}
              />
            ))}
          </div>
        )}
      {currentUserType === "ARTIST" &&
        barType === "CommissionRequests" &&
        isCommissionRequestEmpty && (
          <div>
            <div className={styles.box}>
              <div className={styles.head}>Commission Requests</div>
            </div>
          </div>
        )}
      {currentUserType === "ARTIST" &&
        barType === "History" &&
        !isHistoryEmpty && (
          <div>
            <div className={styles.box}>
              <div className={styles.head}>History</div>

              {commissionHistoryList.map((commission) => (
                <CommissionRequestBox
                  userType={currentUserType}
                  barType={barType}
                  commissionId={commission.commissionId}
                  image={commission.customer.user.profileURL}
                  name={commission.customer.user.firstname}
                  surname={commission.customer.user.lastname}
                  status={commission.commissionStatus}
                />
              ))}
            </div>
          </div>
        )}
      <div></div>
    </Layout>
  );
};

export default ViewCommissionDetail;
