import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { accountUpdate } from "./../../../data/dataStore";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import clevertap from "clevertap-web-sdk";
import { rupeeConverter } from "./../../../../components/helpers/dataUtils";


function Test() {
  const [allTrxn, setAllTrxn] = useState([]);

  useEffect(() => {
    getAllTrxnData();
  }, []);

  const getAllTrxnData = async () => {
    try {
      const res = await accountUpdate.getAllTransactions();
      const finalData = res.data.transactions;
      setAllTrxn(finalData);
    }
    catch (err) {
      toast.warning("some thing went wrong", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
        pauseOnHover: false,
      });
    }
  }
  function sendMail() {
    var link = "mailto:test@gmail.com"
             + "?cc="
             + "&subject=" + encodeURIComponent("")
             + "&body=" + encodeURIComponent("")
    ;

    window.location.href = link;
}
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
                  {allTrxn?.map((tip, index) => {
                    let tipStatusClassName;
                    switch(tip.status) {
                      case "Processing":
                        tipStatusClassName = "transactionsStepText"
                        break;
                      case "Complete":
                        tipStatusClassName = "complete"
                        break;
                      case "Failed":
                        tipStatusClassName = "failed"
                        break;
                      default:
                        tipStatusClassName = "transactionsStepText"
                        break;
                    }
                    let component;
                    switch (tip.transactionType) {
                      case "Purchase":
                        component = (
                          <div className="row mt-3" key={index}>
                            <div className="col-2">
                              <div className="cardBox">
                                <span>
                                  {moment(tip.createdAt).format("Do MMM")}
                                </span>
                              </div>
                            </div>
                            <div className="col-4">
                              <h6 className="cardText">{tip.transactionType}</h6>
                              <p className={tipStatusClassName}
                              >{tip.status}</p>
                            </div>
                            <div className="col-6">
                              <h6 className="cardText">Integrated Portfolio - {tip.ipaType}</h6>
                              <p className="transactionsStepText transactionMoney">
                                {rupeeConverter(tip.amount)}
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
                      case "Withdrawal":
                        component = (
                          <div className="row mt-3" key={index}>
                            <div className="col-2">
                              <div className="cardBox">
                                <span>
                                  {moment(tip.createdAt).format("Do MMM")}
                                </span>
                              </div>
                            </div>
                            <div className="col-4">
                              <h6 className="cardText">{tip.transactionType}</h6>
                              <p className={
                                tip.status === "Processing" ? "transactionsStepText" : "failed"
                              }
                              >{tip.status}</p>
                            </div>
                            <div className="col-6">
                              <h6 className="cardText">Integrated Portfolio - {tip.ipaType}</h6>
                              <p className="transactionsStepText transactionMoney">
                                {rupeeConverter(tip.amount)}
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
                        component = <div key={index}></div>
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
                <button
                  className="footerButton mt-4 mb-5"
                  onClick={()=>{
                    sendMail()
                    try {
                      clevertap.event.push("Email Support");
                    } catch (err){}
                  }}
                >
                  Email us your query
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
      />
    </>
  );
}

export default Test;
