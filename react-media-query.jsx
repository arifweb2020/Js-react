import React, { useState } from "react";
import "./index.scss";
import profileImg from "./../../../assets/Images/redemptionProfile.svg";
import unlock from "./../../../assets/Images/unlock.svg";
import people from "./../../../assets/Images/people.svg";
import { ToastContainer, toast } from "react-toastify";
import { panUpdate } from "../../data/dataStore";
import AccountSetup from "../accountSetup";
import AccountSetupModal from "../accountSetup/accountSetupModal";
import Sheet from "react-modal-sheet";
import { Modal } from "react-bootstrap";

function RedemptionComplete(props) {
  const isDesktop = window.innerWidth >= 640 ? true : false;
  const [enterAmount, setEnterAmount] = useState(true);
  const [confirmPanStage, setCofirmPanStage] = useState(false);
  const [accountCompleteStage, setCompleteStage] = useState(false);
  const [pan, setPan] = useState("EDCPK1888M");
  const [investValue, setInvestValue] = useState(10000);
  const [modalVisible, setModalVisible] = useState(false);
  const [disableDrag, setDisableDrag] = useState(false);
  const ref = React.useRef(null);
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const panValidation = () => {
    var regex = /([A-Z]){5}([0-9]){4}([A-Z]){1}$/;
    if (regex.test(pan.toUpperCase())) {
      confirmPAN();
    } else {
      getToastWarning("Please enter valid PAN");
    }
  };
  const getToastWarning = (text) => {
    return toast.warning(text, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      progress: undefined,
      pauseOnHover: false,
    });
  };
  const confirmPAN = (pan) => {
    panUpdate
      .sendPAN(pan)
      .then((data) => {
        setCofirmPanStage(false);
        setCompleteStage(true);
      })
      .catch(() => {
        getToastWarning("Please enter valid PAN");
      });
  };
  function formatNumber(n) {
    // format number 1000000 to 1,234,567
    n = n.toString();
    n = n.replace("₹", "");
    n = n
      .split("")
      .filter((e) => e !== ",")
      .join("");
    var currency = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(n);
    currency = currency.split(".")[0];
    return currency;
  }
  const onAccountSetupComplete = () => {
    ref.current?.snapTo(1);
    let time, data;
    for (let i = 2; i <= 5; ++i) {
      data = i - 1;
      time = 15 * (10 * data - (data * data) / 2);
      setTimeout(() => {
        ref.current?.snapTo(i);
      }, time);
    }
    setTimeout(() => {
      setModalVisible(false);
    }, 2000);
  };
  const disableDragOnModal = () => {
    setDisableDrag(true);
  };
  const enableDragOnModal = () => {
    setDisableDrag(false);
    setEnterAmount(false);
    setCompleteStage(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };
  return (
    <React.Fragment>
      <div className="modalContainer">
        {isDesktop ? (
          <Modal
            className="myContentClass"
            show={open}
            onHide={onCloseModal}
            centered
          >
            <AccountSetupModal onCloseModal={onCloseModal} />
          </Modal>
        ) : (
          <Sheet
            ref={ref}
            disableDrag={disableDrag}
            isOpen={modalVisible}
            onClose={closeModal}
            snapPoints={[-200, 0.8, 0.6, 0.4, 0.2, 0]}
            initialSnap={0}
            className="modalSheet"
          >
            <Sheet.Container>
              <Sheet.Header />
              <Sheet.Content>
                <AccountSetup
                  setupComplete={onAccountSetupComplete}
                  disableDrag={disableDragOnModal}
                  enableDrag={enableDragOnModal}
                />
              </Sheet.Content>
            </Sheet.Container>
            <Sheet.Backdrop />
          </Sheet>
        )}
      </div>
      {enterAmount && (
        <div className="invest">
          <div className="investHead">
            <div className="heading">How much do you want to invest?</div>
            <div className="subHeading">
              Most clients invest ₹50K as their first investment
            </div>
          </div>
          <div className="amount">
            <div className="text">One Time</div>
            <div className="currentValue">
              <input
                type="text"
                value={`${formatNumber(investValue)}`}
                onChange={(e) => {
                  let value = e.target.value;
                  value = value.replace("₹", "");
                  value = value
                    .split("")
                    .filter((e) => e !== ",")
                    .join("");
                  if (!isNaN(value)) {
                    setInvestValue(e.target.value);
                  }
                }}
              />
            </div>
          </div>
          <button
            className="commonButton confirmButton"
            onClick={() => {
              // setEnterAmount(false);
              // setCofirmPanStage(true)
              // setCompleteStage(true);
              setModalVisible(true);
              onOpenModal();
            }}
          >
            <span className="textAnimation">Confirm Amount</span>
          </button>
        </div>
      )}
      {confirmPanStage && (
        <div className="confirmPan">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 offset-lg-4 col-12">
                <div className="row">
                  <div className="col">
                    <span className="heading">
                      Almost done setting up your investment.
                    </span>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <span className="subHeading">Please confirm your PAN</span>
                  </div>
                </div>
                <div className="row panInput">
                  <div className="col">
                    <input
                      type="text"
                      className="form-control pan"
                      placeholder="EDCPK1888M"
                      value={pan}
                      onChange={(e) => setPan(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <span className="subHeading">
                      Autodetected from your report
                    </span>
                  </div>
                </div>
                <div className="row termsCondition">
                  <div className="col">
                    <div className="form-check termCondition">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckChecked"
                        checked
                      />
                      <label
                        className="form-check-label text"
                        for="flexCheckChecked"
                      >
                        I accept the <a href="root">terms & conditions</a> that
                        were presented by DEZERV FINSERV PRIVATE LIMITED.
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-lg-12">
                    <div className="buttonBottom mt-5">
                      <button
                        className="redemBottomBtn"
                        onClick={() => panValidation()}
                      >
                        <span>Confirm PAN</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {accountCompleteStage && (
        <div className="completeSetup">
          <div className="container mTop">
            <div className="row">
              <div className="col-lg-8 offset-lg-2 col-12  behindBackground">
                <div className="frontBackground">
                  <div className="row">
                    <div className="col-lg-8 offset-lg-2 col-12">
                      <div className="row">
                        <div className="col-lg-12 col-12">
                          <div className="profileImage p-4">
                            <img
                              src={profileImg}
                              alt="profile img"
                              className="mx-auto d-block"
                            />
                            <h3 className="redeemHeading mt-3">
                              Investment Complete!
                            </h3>
                          </div>
                        </div>
                      </div>
                      <div className="horizontalLine mt-1"></div>
                      <div className="row mt-3">
                        <div className="col-lg-6 col-6">
                          <div className="innerText">
                            <div className="inputCheckbox">
                              <input
                                className="form-check-input checked"
                                type="checkbox"
                                defaultChecked
                              />
                            </div>
                            <div className="para mt-1">
                              <p className="redemptionText">
                                Your payment processed succesfully
                              </p>
                            </div>
                            <div className="checkboxLine"></div>
                          </div>
                        </div>
                        <div className="col-lg-6 col-6">
                          <div className="innerText">
                            <div className="inputCheckbox">
                              <input
                                className="form-check-input unChecked"
                                type="checkbox"
                              />
                            </div>
                            <div className="para mt-1">
                              <p className="redemptionText">
                                AMC email confirmation in 2 days
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <p className="redemptionText">
                            Contact care@dezerv.in for any queries you might
                            have
                          </p>
                        </div>
                      </div>
                      <div className="horizontalLine mt-2"></div>
                      <div className="row content mt-4">
                        <div className="col-2">
                          <img alt="img" src={people} />
                        </div>
                        <div className="col-10">
                          You joined 157 other smart investors by investing in
                          this portfolio
                        </div>
                      </div>
                      <div className="row  content mt-4">
                        <div className="col-2">
                          <img alt="unlock img" src={unlock} />
                        </div>
                        <div className="col-10">
                          You unlocked exclusive co-investments with the
                          smartest investors in the country
                        </div>
                      </div>
                      <div className="row mt-4">
                        <div className="col-lg-12">
                          <div className="buttonBottom mt-5">
                            <button className="redemBottomBtn">
                              <span>View my updated portfolio</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
      />
    </React.Fragment>
  );
}
export default RedemptionComplete;
