import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//import { accountUpdate } from "./../../../data/dataStore";
import moment from "moment";


function AllTransaction() {
  // const [allTrxn, setAllTrxn] = useState([]);

  // useEffect(() => {
  //   getAllTrxnData();
  // }, []);

  // const getAllTrxnData = async () => {
  //   try {
  //     const res = await accountUpdate.getAllTransactions();
  //     const finalData = res.data.transactions;
  //     setAllTrxn(finalData);
  //   }
  //   catch (err) {
  //     alert("some thing went wrong!");
  //   }
  // }
  const transactions = [
    {
      "amount": 1000000,
      "ipaType": 5,
      "status": "Processing",
      "transactionType": "Purchase",
      "createdAt": "2021-09-08T19:11:05+05:30"
    },
    {
      "amount": 1000000,
      "ipaType": 5,
      "status": "Processing",
      "transactionType": "Purchase",
      "createdAt": "2021-09-08T19:12:37+05:30"
    },
    {
      "amount": 1000000,
      "ipaType": 5,
      "status": "Processing",
      "transactionType": "Purchase",
      "createdAt": "2021-09-08T19:14:05+05:30"
    },
    {
      "amount": 1000000,
      "ipaType": 5,
      "status": "Processing",
      "transactionType": "Purchase",
      "createdAt": "2021-09-08T19:17:20+05:30"
    },
    {
      "amount": 1000000,
      "ipaType": 5,
      "status": "Processing",
      "transactionType": "Purchase",
      "createdAt": "2021-09-08T19:18:35+05:30"
    },
    {
      "amount": 1000000,
      "ipaType": 5,
      "status": "Processing",
      "transactionType": "Purchase",
      "createdAt": "2021-09-08T19:19:26+05:30"
    },
    {
      "amount": 1000000,
      "ipaType": 5,
      "status": "Processing",
      "transactionType": "Purchase",
      "createdAt": "2021-09-08T19:23:16+05:30"
    },
    {
      "amount": 2000000,
      "ipaType": 5,
      "status": "Processing",
      "transactionType": "Redemption",
      "createdAt": "2021-09-08T19:23:16+05:30"
    },
    {
      "amount": 1000000,
      "ipaType": 5,
      "status": "failed",
      "transactionType": "Purchase",
      "createdAt": "2021-09-08T19:23:16+05:30"
    },
    {
      "amount": 2000000,
      "ipaType": 5,
      "status": "failed",
      "transactionType": "Redemption",
      "createdAt": "2021-09-08T19:23:16+05:30"
    },

  ]

  return (
    <>
      <div className="profilePage">
        <div className="container-fluid topSection">
          <div className="profileContainers">
            <div className="row">
              <div className="col">
                <div className="mt-3">
                  <Link to="/userProfile">
                    <span className="goBack">{"<"} Back</span>
                  </Link>
                </div>
                <div className="mt-5">
                  <h3 className="profileHeading">Your transactions</h3>
                  <p className="transactionsRetryText">
                    Tap failed trasaction to retry
                  </p>
                </div>
              </div>
            </div>
            <div className="row" style={{ position: "relative" }}>

              <div className="col">
                <div className="cardBody p-3 mt-2">

                  {transactions.map((tip, index) => {
                    let component;
                    switch (tip.transactionType) {
                      case "Purchase":
                        component = (
                          <div className="row mt-2">
                            <div className="col-2">
                              <div className="cardBox">
                                <span>
                                  {moment(tip.createdAt).format('ll')}
                                </span>
                              </div>
                            </div>
                            <div className="col-6">
                              <h6 className="cardText">{tip.transactionType}</h6>
                              <p className={
                                tip.status === "Processing" ? "transactionsStepText" : "failed"
                              }
                              >{tip.status}</p>
                            </div>
                            <div className="col-4">
                              <h6 className="cardText">All weather</h6>
                              <p className="transactionsStepText transactionMoney">
                                {tip.amount}
                              </p>
                            </div>
                            <div className="row">
                              <div className="col-lg-12">
                                <div className="cardHorizontalLine mt-2"></div>
                              </div>
                            </div>
                          </div>
                        )
                        break;
                      case "Redemption":
                        component = (
                          <div className="row mt-2">
                            <div className="col-2">
                              <div className="cardBox">
                                <span>
                                  {moment(tip.createdAt).format('ll')}
                                </span>
                              </div>
                            </div>
                            <div className="col-6">
                              <h6 className="cardText">{tip.transactionType}</h6>
                              <p className={
                                tip.status === "Processing" ? "transactionsStepText" : "failed"
                              }
                              >{tip.status}</p>
                            </div>
                            <div className="col-4">
                              <h6 className="cardText">All weather</h6>
                              <p className="transactionsStepText transactionMoney">
                                {tip.amount}
                              </p>
                            </div>
                            <div className="row">
                              <div className="col-lg-12">
                                <div className="cardHorizontalLine mt-2"></div>
                              </div>
                            </div>
                          </div>
                        )
                        break;
                      default:
                        component = <div></div>
                        break;
                    }
                    return (
                      component
                    )
                  })}

                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col">
                <h3 className="profileHeading subHeading">
                  Need help with something?
                </h3>
                <button className="footerButton mt-4 mb-5">
                  Email us your query
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AllTransaction;
