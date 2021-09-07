import { useState } from "react";
import LinkedIn from "react-linkedin-login-oauth2";
import LandingPageCard from "../../../components/landingPageCard/landingPageCard";
import linkedInImage from "../../../assets/Images/linkedInVector.svg";
import Loader from "../../../components/loader/loader";
import { ToastContainer, toast } from "react-toastify";
import OtpInput from "react-otp-input";
import { registrationPageApis } from "../../data/dataStore";
import constants from "../../../assets/local/registrationConstants";
import { login } from "../../../Store/actions/userActions";
import { setScore } from "../../../Store/actions/scoreActions";
import { connect } from "react-redux";
import Lottie from "react-lottie";
import thankyouPageLoader from "../../../assets/lottie/thankyouLoader.json";
import "./signinPage.scss";

const LinkedInSignIn = (props) => {
  const { loginSuccess, loginFailure, clientId, redirectionURL } = props;
  const [whatsappUpdates, setWhatsappUpdates] = useState(true);
  const [phoneNumberAuth, setPhoneNumberAuth] = useState(true);
  const [stage, setStage] = useState("registration");
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [otp, setOTP] = useState(0);
  const [disableResendOTP, setDisableResendOTP] = useState(true);
  const [otpDisabled, setOtpDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visibleResendOTP, setVisibleResendOTP] = useState(true);
  const regex = new RegExp("^[0-9]$");
  //const regex = new RegExp("^[1-9][0-9]*$");
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: thankyouPageLoader,
  };

  const enterPhoneNumber = () => {
    // setPhoneNumberAuth(true);
  };

  const handleWhatsappUpdatesChange = () => {
    setWhatsappUpdates(!whatsappUpdates);
  };

  const onRegistration = async () => {
    if (phoneNumber[0] === "0") {
      toast.warning("Enter valid Phone Number", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
        pauseOnHover: false,
      });
    }
    else {
      let data = { phone: phoneNumber, inviteToken: props.userToken, whatsappOptin: whatsappUpdates };
      setLoading(true);
      registrationPageApis
        .register(data)
        .then((resp) => {
          setStage("otpVerification");
          setTimeout(() => {
            setDisableResendOTP(false);
          }, 2000);
        })
        .catch((err) => {
          window.alert(err);
        })
        .finally(() => setTimeout(() => {
          setLoading(false);
        }, 3000));
    }
  };

  const onOTPValidate = async (otpValue) => {
    let data = { phone: phoneNumber, inviteToken: props.userToken, whatsappOptin: whatsappUpdates, otp: otpValue };
    setLoading(true);
    registrationPageApis
      .validateOTP(data)
      .then((resp) => {
        setDisableResendOTP(true);
        setStage("thankYouScreen");
        setOtpDisabled(false);
        props.dispatch(login(resp));
        props.dispatch(setScore(resp.data.score));
        setVisibleResendOTP(false);
        toast.success("Success", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
          pauseOnHover: false,
        });
        localStorage.setItem("phoneNumber", phoneNumber);
        localStorage.setItem("token", resp.data.token);
        // setTimeout(() => {
        //   loginSuccess({ code: null });
        // }, 3000);
        setTimeout(() => {
          props.history.push("/integratedPortfolio");
        }, 3000);
      })
      .catch((err) => {
        setOTP(0);
        setOtpDisabled(false);
        toast.error(err.errorMessage, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
          pauseOnHover: false,
        });
      })
      .finally(() => setLoading(false));
  };

  const handlePhoneNumberChange = (number) => {
    if (!regex.test(number)) {
      setPhoneNumber(
        number
          .split("")
          .filter((ele) => regex.test(ele))
          .join("")
      );
    } else setPhoneNumber(number);
  };

  const registrationContentDOM = () => {
    if (stage === "registration") {
      return (
        <div className="inputWrapper full-height d-flex flex-column justify-content-start align-items-center">
          <div className="testWrapper">
            <span>Welcome {props.userName ? props.userName : null}.</span>
            <h3>Please link a mobile number to proceed.</h3>
          </div>
          <div className="fieldWrapper text-center otpInput">
            <div className="fieldWrapperInput fieldWrapper">
              <span className="standardMobileNumber">+91</span>
              <OtpInput
                // focusStyle={{
                //   outline: "transparent",
                //   color: "blue",
                //   foregroundColor: "transparent"
                // }}
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                numInputs={10}
                isInputNum={true}
                onPaste={(e) => e.preventDefault()}
              />
            </div>
          </div>

          {phoneNumber.length === 10 ? (
            <div className="enableWrapper">
              <form>
                <label className="whatsappUpdatesText">
                  <input
                    type="checkbox"
                    checked={whatsappUpdates}
                    onChange={handleWhatsappUpdatesChange}
                  />
                  <span>Get updates on whatsapp</span>
                  <span class="checkMark"></span>
                </label>
              </form>
              <button className="commonButton" onClick={onRegistration}>
                <div className="textAnimation btnReg">
                  {constants.Regmobilebuttontext}
                </div>
              </button>
            </div>
          ) : (
            <div className="disableWrapper">
              <form>
                <label className="whatsappUpdatesText">
                  <input
                    disabled={true}
                    type="checkbox"
                    checked={whatsappUpdates}
                    onChange={handleWhatsappUpdatesChange}
                  />
                  <span>Get updates on whatsapp</span>
                  <span class="checkMark"></span>
                </label>
              </form>
              <button className="btn disableButton">
                {constants.Regmobilebuttontext}
              </button>
            </div>
          )}
        </div>
      );
    } else if (stage === "otpVerification") {
      return (
        <div className="inputWrapper full-height d-flex flex-column justify-content-start align-items-center">
          <div
            onClick={() => {
              setStage("registration");
            }}
            className="backbuttonWrapper f-flex justify-content-start"
          >
            <span>{"<"}</span>
            <button>Back</button>
          </div>
          <div className="testWrapper">
            <h3>
              Please enter the OTP we sent to <br />
              {`+91 ${phoneNumber}`}
            </h3>
          </div>
          <div className="fieldWrapper text-center otpInput phoneNumberWrapper">
            <OtpInput
              value={otp}
              onChange={(otpVal) => {
                if (otpVal.length === 4) {
                  setOTP(otpVal);
                  setOtpDisabled(true);
                  onOTPValidate(otpVal);
                } else {
                  setOTP(otpVal);
                }
              }}
              numInputs={4}
              isInputNum={true}
              isDisabled={otpDisabled}
            />
            {visibleResendOTP && (
              <div>
                {/* <form>
                  <label className="whatsappUpdatesText">
                    <input
                      type="checkbox"
                      checked={whatsappUpdates}
                      onChange={handleWhatsappUpdatesChange}
                    />
                    Get updates on whatsapp
                    <span class="checkMark"></span>
                  </label>
                </form> */}
                {disableResendOTP ? (
                  <button
                    // disabled={}
                    className="btnUnreg"
                  >
                    {constants.Regotpbuttontext}
                  </button>
                ) : (
                  <button
                    disabled={disableResendOTP}
                    className="btn-reg btnRegAfterOtp"
                    onClick={() => onRegistration()}
                  >
                    <div className="textAnimation">
                      {constants.Regotpbuttontext}
                    </div>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      );
    } else if (stage === "thankYouScreen") {
      return (
        <>
          <div className="thankYouScreen m-t-100">
            <h3>Thank you Sandeep</h3>
            <p className="mobileVerified">Your mobile number is now verified</p>
            <div className="text-center">
              <Lottie options={defaultOptions} height={74} width={74} />
            </div>
          </div>
        </>
      );
    }
  };

  return (
    <div>
      {!phoneNumberAuth ? (
        <div className="borderCardWrapper">
          <LandingPageCard>
            <div className="cardTitle">Welcome back,</div>
            <div className="cardText">Sign in to access your account</div>
            <div className="linkedInBtnContainer appliedLinkedInSignin">
              <LinkedIn
                clientId={clientId}
                onFailure={loginFailure}
                onSuccess={loginSuccess}
                redirectUri={redirectionURL}
              // scope="https://www.linkedin.com/developers/apps/120835146/auth"
              >
                <div className="linkedInBtn">
                  Sign in with LinkedIn
                  <img className="linkedInImage" src={linkedInImage} alt="" />
                </div>
              </LinkedIn>
            </div>
            <div className="orText" onClick={enterPhoneNumber}>
              OR
            </div>
            <button onClick={enterPhoneNumber} className="enterPhoneNumberBtn">
              Enter your mobile
            </button>
            <div style={{ padding: "0% 10%" }}>
              <div className="separator"></div>
            </div>
            <div className="cardFooterText footerText">
              For any queries mail us at invite@dezerv.in
            </div>
          </LandingPageCard>
        </div>
      ) : (
        <Loader loading={loading}>
          <div className="conatiner wrapper full-height align-items-start">
            <ToastContainer
              position="bottom-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={true}
              closeOnClick={true}
              rtl={false}
            />
            {registrationContentDOM()}
          </div>
        </Loader>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return state;
};

export default connect(mapStateToProps)(LinkedInSignIn);
