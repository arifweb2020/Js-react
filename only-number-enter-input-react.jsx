import React, { useState } from "react";
import "./accountSetupStyle.scss";
import { ToastContainer, toast } from "react-toastify";
import { ProgressBar } from "react-bootstrap";
import SignatureCanvas from "react-signature-canvas";
import { accountUpdate, panUpdate } from "./../../data/dataStore";
import Loader from "./../../../components/loader/loader";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import closeModal from "./../../../assets/Images/closeModal.svg";
import moment from "moment";

const AccountSetupModal = (props) => {
  const { onCloseModal, completeStage } = props;
  const [progressBarValue, setProgressBarValue] = useState(20);
  const [stage, setStage] = useState("dobInfo");
  const [nationality, setNationality] = useState(1);
  const [pan, setPan] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState(
    new Date().setFullYear(new Date().getFullYear() - 18)
  );
  const [pincode, setPincode] = useState("");
  const [occupation, setOccupation] = useState(1);
  const [salary, setSalary] = useState(1);
  const [address, setAddress] = useState("");
  const [accNumber, setAccNumber] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [trimmedDataURL, setTrimmedDataURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [politicalyExposed, setPoliticalyExposed] = useState(1)
  const [downloadFileUrl, setDownloadFileUrl] = useState("")

  const confirmPAN = () => {
    setStage("kycInfo");
    panUpdate
      .sendPAN({ pan })
      .then((data) => {
        setProgressBarValue(40);
        setTimeout(() => {
          setStage("addressInfo");
        }, 2000);
      })
      .catch((err) => {
        setStage("dobInfo");
        getToastError(err.errorMessage);
      });
  };

  let signPad = {};

  const clear = () => {
    signPad.clear();
    setTrimmedDataURL("");
    setDownloadFileUrl("")
  };
  const confirmAccountSetup = () => {
    setLoading(true);
    var formdata = new FormData();
    formdata.append("myFile", trimmedDataURL);
    accountUpdate
      .uploadSignature(formdata)
      .then((resp) => {
        console.log(resp);
        if (resp.success) {
          var dateValue = new Date(dob),
            mnth = ("0" + (dateValue.getMonth() + 1)).slice(-2),
            day = ("0" + dateValue.getDate()).slice(-2);
          let details = {
            dateOfBirth: [dateValue.getFullYear(), mnth, day].join(""),
            email,
            occupation,
            salary,
            nationality,
            politicalyExposed,

            permanentAddress: {
              address,
              pincode,
            },
          };
          return accountUpdate.sendAccountSetup(details);
        } else return Promise.reject(resp);
      })
      .then((data) => {
        setStage("setUpComplete");
        getToastSuccess("Success");
        setTimeout(() => {
          onCloseModal();
          completeStage();
        }, 3000);
      })
      .catch((err) => {
        //temporary changes
        setStage("setUpComplete");
        getToastSuccess("Success");
        setTimeout(() => {
          onCloseModal();
          completeStage();
        }, 3000);
        getToastError(err.errorMessage);
      })
      .finally(() => setLoading(false));
  };

  const dataURLtoFile = (dataurl, filename) => {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  };

  const validatePanDetails = () => {
    let panregex = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
    let regEmail = /^\w+([.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
    let warningText = "";
    if (!panregex.test(pan)) warningText = "Please enter valid PAN";
    if (!regEmail.test(email)) warningText = "Please enter valid Email";
    if (warningText) {
      getToastWarning(warningText);
    } else {
      confirmPAN();
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
        getToastError(err.errorMessage);
        setStage("signatureStage");
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
    let ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
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
    const signature = signPad.toDataURL("image/png");
    if (signature) setTrimmedDataURL(dataURLtoFile(signature, "image.png"));
    setDownloadFileUrl(signature)

  };

  const backInfoDob = () => {
    setStage("dobInfo");
    setProgressBarValue(20);
  };

  const backAddressInfo = () => {
    setStage("addressInfo");
    setProgressBarValue(40);
  };

  const backBankInfo = () => {
    setStage("bankInfo");
    setProgressBarValue(60);
  };

  const handleAccNumChange = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      setAccNumber(e.target.value)
    }
  };


  const dobInfoStage = () => {
    return (
      <React.Fragment>
        <div className="contentWrapper scrollBar">
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
                    minDate={moment().subtract(150, "years")._d}
                    maxDate={moment().subtract(18, "years")._d}
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
                  if (!email) warningText = "Email is required ! ";
                  if (!dob) warningText = "Date of birth is required ! ";
                  if (!pan) warningText = "Pan Number is required ! ";
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
      <div className="contentWrapper scrollBar">
        <div className="contentText text-center">Checking your KYC Status</div>
      </div>
    );
  };

  const addressInfoStage = () => {
    return (
      <React.Fragment>
        <div className="contentWrapper scrollBar">
          <div className="moveBack">
            <p className="backArrows" onClick={backInfoDob}>
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
                  className="form-control pincodeInput"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  maxLength={6}
                />
              </div>
            </form>
            <div className="text-center">
              <button
                onClick={() => {
                  let warningText = "";
                  if (!pincode) warningText = "Pincode is required ! ";
                  if (!address) warningText = "Address is required ! ";

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
        <div className="contentWrapper scrollBar">
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
                  onChange={(e) => setOccupation(parseInt(e.target.value))}
                >
                  <option value="" selected disabled>
                    Select Occupation
                  </option>
                  <option value={1}>Business</option>
                  <option value={2}>Service</option>
                  <option value={3}>Professional</option>
                  <option value={4}>Others</option>
                  <option value={5}>Housewife</option>
                </select>
              </div>

              <div className="form-group">
                <label className="label m-t-20">Salary(yearly)</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  value={salary}
                  onChange={(e) => setSalary(parseInt(e.target.value))}
                >
                  <option value="" selected disabled>
                    Select Salary
                  </option>
                  <option value={1}>Below 1L</option>
                  <option value={2}>1 to 5</option>
                  <option value={3}>5 to 10</option>
                  <option value={4}>10 to 25L</option>
                  <option value={5}>25LPA to 1Cr</option>
                  <option value={6}>1Cr & above</option>
                </select>
              </div>

              <div className="form-group">
                <label className="label m-t-20">Born in India?</label>
                <div className="selectNationalityBtn">
                  <button
                    className={nationality === 1 ? "btnDark" : "btnLight"}
                    onClick={() => setNationality(1)}
                  >
                    Yes
                  </button>
                  <button
                    className={nationality === 0 ? "btnDark" : "btnLight"}
                    onClick={() => setNationality(0)}
                  >
                    No
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label className="label m-t-20">
                  Are you or your relatives politically exposed?
                </label>
                <div className="selectNationalityBtn">
                  <button
                    className={politicalyExposed === 1 ? "btnDark" : "btnLight"}
                    onClick={() => setPoliticalyExposed(1)}
                  >
                    Yes
                  </button>
                  <button
                    className={politicalyExposed === 0 ? "btnDark" : "btnLight"}
                    onClick={() => setPoliticalyExposed(0)}
                  >
                    No
                  </button>
                </div>
              </div>
            </form>
            <div className="text-center">
              <button
                onClick={() => {
                  let warningText = "";
                  if (!salary) warningText = "Select your yearly salary ! ";
                  if (!occupation) warningText = "Select your occupation ! ";
                  if (!occupation || !salary) {
                    getToastWarning(warningText);
                  } else {
                    setProgressBarValue(60);
                    setStage("addressInfo");
                  }
                }}
                className="btn btn-primary btnInvestAmountBtn"
              >
                Proceed
              </button>
              <div className="termsConditionWrapper">
                <label>Terms & conditions</label>
                <div className="termLater">
                  <p>
                    Dezerv Investments Private Limited (Dezerv) is a SEBI
                    registered Mutual Fund Distributor with ARN 179457.
                  </p>
                  <p>
                    Neither Dezerv nor any of its affiliates, their directors,
                    employees and agents accept any responsibility and/or
                    liability or warrant or guarantee the performance or
                    profitability of the Products/Services nor do they warrant
                    or guarantee the returns and that the investment objectives
                    of the Products/Services shall be achieved at any time and
                    in any manner whatsoever.
                  </p>
                  <p>
                    There is no assurance or guarantee that the goals planned
                    for will be achieved and the same is subject to the
                    investment performance of the Products/Services. The
                    information presented under our newsletter and blogs is
                    solely for informational purpose. Dezerv ensures compliance
                    with all applicable laws and guidelines issued by SEBI/other
                    regulatory authorities from time to time. Mutual Fund
                    investments are subject to market risks. Please read all
                    scheme related documents carefully before investing. Past
                    performance is not an indicator of future returns. Terms and
                    condition of the website is applicable. Privacy policy of
                    the website is applicable.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  };

  const bankInfoStage = () => {
    return (
      <React.Fragment>
        <div className="contentWrapper scrollBar">
          <div className="moveBack">
            <p className="backArrows" onClick={backAddressInfo}>
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
                  onChange={handleAccNumChange}
                  maxLength={18}
                />
              </div>
              <div className="form-group m-t-20">
                <label className="label">Bank IFSC</label>
                <span className="findIfsc">
                  <a
                    href="https://www.rbi.org.in/Scripts/IFSCMICRDetails.aspx"
                    target="_blank"
                  >
                    Find my IFSC
                  </a>
                </span>
                <input
                  type="text"
                  className="form-control"
                  id="inputDob"
                  placeholder="Ex : HDFC00001333"
                  value={ifsc}
                  onChange={(e) => {
                    setIfsc(e.target.value);
                  }}
                  onInput={toInputUppercase}
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
      <div className="contentWrapper scrollBar">
        <div className="contentText text-center">
          Depositing ₹1 in your account
        </div>
      </div>
    );
  };
  const verifyInfoStage = () => {
    return (
      <div className="contentWrapper scrollBar">
        <div className="contentText  text-center">Bank account verified</div>
      </div>
    );
  };
  const signStage = () => {
    return (
      <React.Fragment>
        <div className="contentWrapper scrollBar">
          <div className="moveBack">
            <p className="backArrows" onClick={backBankInfo}>
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
                <a href={downloadFileUrl} download="signature">
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
      <div className="contentWrapper scrollBar">
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
