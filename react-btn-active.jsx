import React, { useState } from "react";
import "./accountSetupStyle.scss";
import { ToastContainer, toast } from "react-toastify";
import { ProgressBar } from "react-bootstrap";
import SignatureCanvas from "react-signature-canvas";
import { accountUpdate } from "./../../data/dataStore";
import Loader from "./../../../components/loader/loader";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import closeModal from "./../../../assets/Images/closeModal.svg";


const AccountSetupModal = (props) => {
  const { onCloseModal } = props;
  const [progressBarValue, setProgressBarValue] = useState(20);
  const [stage, setStage] = useState("dobInfo");
  const [nationality, setNationality] = useState("Yes");
  const [pan, setPan] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState(new Date());
  const [pincode, setPincode] = useState("");
  const [occupation, setOccupation] = useState("");
  const [salary, setSalary] = useState("");
  const [address, setAddress] = useState("");
  const [accNumber, setAccNumber] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [trimmedDataURL, setTrimmedDataURL] = useState("");
  const [loading, setLoading] = useState(false);

  let signPad = {};

  const clear = () => {
    signPad.clear();
    setTrimmedDataURL("");
  };
  const confirmAccountSetup = () => {
    setLoading(true);
    var dateValue = new Date(dob),
      mnth = ("0" + (dateValue.getMonth() + 1)).slice(-2),
      day = ("0" + dateValue.getDate()).slice(-2);
    let details = {
      dateOfBirth: [dateValue.getFullYear(), mnth, day].join(""),
      permanentAddress: {
        address: address,
        pinCode: pincode,
      },
    };
    accountUpdate
      .sendAccountSetup(details)
      .then((data) => {
        setStage("setUpComplete");
        getToastSuccess("Success");
        setTimeout(() => {
          onCloseModal();
        }, 3000);
      })
      .catch((err) => {
        getToastError(err.message);
      })
      .finally(() => setLoading(false));
  };

  const validatePanDetails = () => {
    let regEmail = /^\w+([.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
    let panregex = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
    let warningText = "";
    if (!regEmail.test(email)) warningText = "Please enter valid Email";
    if (!panregex.test(pan)) warningText = "Please enter valid PAN";
    if (warningText) {
      getToastWarning(warningText);
    } else {
      setProgressBarValue(40);
      setStage("kycInfo");
      setTimeout(() => {
        setStage("addressInfo");
      }, 2000);
    }
  };

  const toInputUppercase = (e) => {
    e.target.value = ("" + e.target.value).toUpperCase();
  };

  const verifyBankAccount = () => {
    setLoading(true);
    let details = {
      accountNumber: accNumber,
      ifsc: ifsc,
    };
    accountUpdate
      .verifyBankAccount(details)
      .then((data) => {
        setProgressBarValue(80);
        setStage("depositInfo");
        setTimeout(() => {
          setStage("verifyInfo");
        }, 2000);
        setTimeout(() => {
          setStage("signatureStage");
        }, 4000);
      })
      .catch((err) => {
        getToastError(err.message);
      })
      .finally(() => setLoading(false));
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
  const getToastSuccess = (text) => {
    toast.success(text, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      progress: undefined,
      pauseOnHover: false,
    });
  };
  const getToastError = (text) => {
    toast.error(text, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      progress: undefined,
      pauseOnHover: false,
    });
  };
  const validateBankDetails = () => {
    let accNoRegex = /^\d{9,18}$/;
    let ifscRegex = /^[A-Za-z]{4}\d{7}$/;
    let warningText = "";

    if (!ifscRegex.test(ifsc))
      warningText = "Please enter valid bank IFSC code";
    if (!accNoRegex.test(accNumber))
      warningText = "Please enter valid bank account number";
    if (warningText) {
      getToastWarning(warningText);
    } else {
      verifyBankAccount();
    }
  };
  const pincodeValidation = () => {
    let pincodeRegex = /^\d{6}$/;
    if (!pincodeRegex.test(pincode)) {
      getToastWarning("Please enter valid pincode");
    } else {
      setProgressBarValue(60);
      setStage("bankInfo");
    }
  };
  const onEnd = () => {
    setTrimmedDataURL(signPad.toDataURL("image/png"));
  };
  const dobInfoStage = () => {
    return (
      <React.Fragment>
        <div className="contentWrapper">
          <div className="headerSection">
            <p>We need some information to setup your account</p>
          </div>
          <div>
            <button className="amfiButton">Required by AMFI</button>
          </div>

          <div className="accountSetupForm">
            <form>
              <div className="form-group">
                <label className="label">Your PAN number</label>

                <input
                  type="text"
                  className="form-control"
                  value={pan}
                  onChange={(e) => setPan(e.target.value)}
                  maxLength={10}
                  onInput={toInputUppercase}
                />
              </div>
              <div className="form-group m-t-20">
                <label className="label">Please enter your date of birth</label>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DatePicker
                    value={dob}
                    onChange={(e) => setDob(e)}
                    animateYearScrolling
                    format="dd/MM/yyyy"
                  />
                </MuiPickersUtilsProvider>
              </div>
              <div className="form-group m-t-20">
                <label className="label">
                  The email you will receive updates on
                </label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </form>
            <div className="text-center">
              <button
                onClick={() => {
                  let warningText = "";
                  if (!pan) warningText = "Pan Number is required ! ";
                  if (!dob) warningText = "Date of birth is required ! ";
                  if (!email) warningText = "Email is required ! ";
                  if (!pan || !dob || !email) {
                    getToastWarning(warningText);
                  } else {
                    validatePanDetails();
                  }
                }}
                className="btn btn-primary"
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  };

  const kycInfoStage = () => {
    return (
      <div className="contentWrapper">
        <div className="contentText text-center">Checking your KYC Status</div>
      </div>
    );
  };

  const addressInfoStage = () => {
    return (
      <React.Fragment>
        <div className="contentWrapper">
          <div className="moveBack">
            <p className="backArrows" onClick={() => setStage("dobInfo")}>
              {"<"} Back
            </p>
          </div>
          <div className="headerSection">
            <p>What address do we send your account documents to?</p>
          </div>
          <div>
            <button className="amfiButton">Required by AMFI</button>
          </div>

          <div className="accountSetupForm ">
            <form>
              <div className="form-group">
                <label className="label ">Your current address</label>
                <input
                  type="text"
                  className="form-control"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="label m-t-20">Pin Code</label>
                <input
                  type="text"
                  className="form-control"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  style={{ width: "135px" }}
                />
              </div>
            </form>
            <div className="text-center">
              <button
                onClick={() => {
                  let warningText = "";
                  if (!address) warningText = "Address is required ! ";
                  if (!pincode) warningText = "Pincode is required ! ";

                  if (!address || !pincode) {
                    getToastWarning(warningText);
                  } else {
                    pincodeValidation();
                  }
                }}
                className="btn btn-primary"
              >
                Proceed
              </button>
            </div>
          </div>
          <div className="termsCondition">
            <span>
              To review terms & pre-filled information
              <span className="ul" onClick={() => setStage("prefilledInfo")}>
                click here
              </span>
            </span>
          </div>
        </div>
      </React.Fragment>
    );
  };

  const prefilledInfoStage = () => {
    return (
      <React.Fragment>
        <div className="contentWrapper">
          <div className="moveBack">
            <p className="backArrows" onClick={() => setStage("addressInfo")}>
              {"<"} Back
            </p>
          </div>
          <div className="headerSection">
            <p>Pre-filled information to speed up your onboarding</p>
          </div>
          <div>
            <button className="amfiButton">Required by AMFI</button>
          </div>

          <div className="accountSetupForm">
            <form onSubmit={(event) => event.preventDefault()}>
              <div className="form-group">
                <label className="label ">Occupation</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                >
                  <option value="" selected disabled>
                    Select Occupation
                  </option>
                  <option value="Professional">Professional</option>
                  <option value="Business">Business</option>
                  <option value="Service">Service</option>
                  <option value="Others">Others</option>
                  <option value="Housewife">Housewife</option>
                </select>
              </div>

              <div className="form-group">
                <label className="label m-t-20">Salary(yearly)</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                >
                  <option value="" selected disabled>
                    Select Salary
                  </option>
                  <option value="25LPA to 1Cr">25LPA to 1Cr</option>
                  <option value="Below 1l">Below 1L</option>
                  <option value="1 to 5">1 to 5</option>
                  <option value="5 to 10">5 to 10</option>
                  <option value="10 to 25L">10 to 25L</option>
                  <option value="1Cr & above">1Cr & above</option>
                </select>
              </div>

              <div className="form-group">
                <label className="label m-t-20">Born in India?</label>
                <div>
                  <button
                    className={nationality === "Yes" ? "btnDark" : "btnLight"}
                    onClick={() => setNationality("Yes")}
                  >
                    Yes
                  </button>
                  <button
                    className={nationality === "No" ? "btnDark" : "btnLight"}
                    onClick={() => setNationality("No")}
                  >No</button>
                </div>
              </div>
            </form>
            <div className="text-center">
              <button
                onClick={() => {
                  let warningText = "";
                  if (!occupation) warningText = "Select your occupation ! ";
                  if (!salary) warningText = "Select your yearly salary ! ";
                  if (!occupation || !salary) {
                    getToastWarning(warningText);
                  } else {
                    setProgressBarValue(60);
                    setStage("addressInfo");
                  }
                }}
                className="btn btn-primary"
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  };

  const bankInfoStage = () => {
    return (
      <React.Fragment>
        <div className="contentWrapper">
          <div className="moveBack">
            <p className="backArrows" onClick={() => setStage("addressInfo")}>
              {"<"} Back
            </p>
          </div>
          <div className="headerSection">
            <p>We will deposit ₹1 to verify your bank account.</p>
          </div>
          <div>
            <button className="amfiButton">Required by AMFI</button>
          </div>
          <div className="accountSetupForm">
            <form>
              <div className="form-group">
                <label className="label">Your Bank account number</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputDob"
                  placeholder="Ex : 12300011123"
                  value={accNumber}
                  onChange={(e) => {
                    setAccNumber(e.target.value);
                  }}
                />
              </div>
              <div className="form-group m-t-20">
                <label className="label">Bank IFSC</label>
                <span className="findIfsc">Find my IFSC</span>
                <input
                  type="text"
                  className="form-control"
                  id="inputDob"
                  placeholder="Ex : HDFC00001333"
                  value={ifsc}
                  onChange={(e) => {
                    setIfsc(e.target.value);
                  }}
                />
              </div>
            </form>
            <div className="text-center">
              <button
                onClick={() => {
                  let warningText = "";
                  if (!ifsc) warningText = "IFSC code is required ! ";
                  if (!accNumber) warningText = "Account number is required ! ";

                  if (!accNumber || !ifsc) {
                    getToastWarning(warningText);
                  } else {
                    validateBankDetails();
                  }
                }}
                className="btn btn-primary"
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  };

  const depositInfoStage = () => {
    return (
      <div className="contentWrapper">
        <div className="contentText text-center">
          Depositing ₹1 in your account
        </div>
      </div>
    );
  };
  const verifyInfoStage = () => {
    return (
      <div className="contentWrapper">
        <div className="contentText  text-center">Bank account verified</div>
      </div>
    );
  };
  const signStage = () => {
    return (
      <React.Fragment>
        <div className="contentWrapper">
          <div className="moveBack">
            <p className="backArrows" onClick={() => setStage("bankInfo")}>
              {"<"} Back
            </p>
          </div>
          <div className="headerSection">
            <p>Sign to complete</p>
          </div>
          <div>
            <p className="clearSignatureText">
              Please provide a clear signature to complete your account setup
            </p>
          </div>
          <div className="signatureCanvas">
            <SignatureCanvas
              penColor="black"
              onEnd={() => onEnd()}
              canvasProps={{ className: "sigCanvas" }}
              ref={(ref) => {
                signPad = ref;
              }}
            />
          </div>
          <div className=" signatureStage">
            {trimmedDataURL ? (
              <div>
                <p className="clearSign mt-4" onClick={() => clear()}>
                  Clear
                </p>
              </div>
            ) : (
              ""
            )}
            {trimmedDataURL ? (
              <div>
                <a href={trimmedDataURL} download="signature">
                  <button
                    className="btn btn-dark"
                    onClick={() => confirmAccountSetup()}
                  >
                    Proceed
                  </button>
                </a>
              </div>
            ) : (
              ""
            )}

            {/* {trimmedDataURL ? (
              <div>
                <a href={trimmedDataURL} download="signature">
                  <button className="btn btn-dark">Download</button>
                </a>
              </div>
            ) : (
              ""
            )} */}
          </div>
        </div>
      </React.Fragment>
    );
  };
  const setUpCompleteStage = () => {
    return (
      <div className="contentWrapper">
        <div className="contentText text-center">Account setup complete!</div>
      </div>
    );
  };

  return (
    <React.Fragment>
      <Loader loading={loading}>
        <div className="accountSetupWrapper">
          {["kycInfo", "verifyInfo", "depositInfo", "setUpComplete"].includes(
            stage
          ) ? (
            ""
          ) : (
            <ProgressBar now={progressBarValue} />
          )}
          <div onClick={() => onCloseModal()}>
            <img
              className="pull-right closeModal pointerCursor"
              src={closeModal}
              alt="close"
            />
          </div>

          {stage === "dobInfo" && dobInfoStage()}
          {stage === "kycInfo" && kycInfoStage()}
          {stage === "addressInfo" && addressInfoStage()}
          {stage === "prefilledInfo" && prefilledInfoStage()}
          {stage === "bankInfo" && bankInfoStage()}
          {stage === "depositInfo" && depositInfoStage()}
          {stage === "verifyInfo" && verifyInfoStage()}
          {stage === "signatureStage" && signStage()}
          {stage === "setUpComplete" && setUpCompleteStage()}
        </div>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick={true}
          rtl={false}
        />
      </Loader>
    </React.Fragment>
  );
};

export default AccountSetupModal;
