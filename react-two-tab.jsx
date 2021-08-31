import React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./HomeStyle.scss";
import sandeep from "../../../assets/Images/sandeep.png";
import Portfolio from "./../investmentPortfolio";
import port from "../../../assets/Images/port.svg";
import homeGrey from "../../../assets/Images/homeGrey.svg";
import portDark from "../../../assets/Images/portDark.svg";
import cardimg from "../../../assets/Images/invest-img.png";
import user1 from "../../../assets/Images/user1.png";
import user3 from "../../../assets/Images/user3.png";
import growthing from "../../../assets/Images/growthImage.svg";
import HomePageCard from "../../../components/HomePageCard/HomePageCard";
import HomePageCard1 from "../../../components/HomePageCard/HomePageCard1";
import UnlockModal from "../../../components/unlockModal";
import ExpertSlider from "../../../components/HomePageSlider/ExpertSlider";
import { userApis } from "../../data/dataStore";
import sheild from "../../../assets/Images/sheld.svg";
import homeImage from "../../../assets/Images/homeImage.svg"

const InvestmentHome = (props) => {
  const [tab, setTab] = useState("");
  const [userName, setUserName] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [userData, setUserData] = useState({});

  const handleUnlock = () => {
    setShowPopup(true);
  };
  useEffect(() => {
    setUserName("Sandeep");
    if(props.location.pathname.includes("/portfolio")){
      setTab("portfolio");
    }else{
      setTab("home");
    }
    
  }, []);

  useEffect(() => {
    userApis
      .getData()
      .then(({ data }) => {
        setUserData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {showPopup ? (
        <UnlockModal closePopup={() => setShowPopup(false)} />
      ) : null}
      <div className="container-fluid toggle-nav ">
        <div className="nav-btn">
          <button
            className={tab === "home" ? "btn-active" : ""}
            onClick={() => setTab("home")}
          >
            <img src={tab === "home" ? homeImage : homeGrey} alt="icon" />
            Home
          </button>
          <button
            onClick={() => setTab("portfolio")}
            className={tab === "portfolio" ? "btn-active" : ""}
          >
            <img src={tab === "portfolio" ? portDark : port} alt="icon" />{" "}
            Portfolio
          </button>
        </div>
      </div>
      {tab === "home" ? (
        <div className="container whiteWrapper">
          <div className="row">
            <div className="col-lg-4">
              <div className="user-area">
                <div className="user-welcome">
                  <span>Welcome,</span>
                  <h3>{userName}</h3>
                </div>
                <div className="user-welcome">
                  <img src={sandeep} alt="sandeep" />
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-4 p-2">
              <div>
                {/* <div className="cardBorderWrapper">
                  <div className="cardContainerWrapper">
                    <div className="cardWrapper">
                      <div className="topWrapper">
                        <h3>Start your journey</h3>
                      </div>
                      <div className="cardBodyWrapper">
                        <div className="step completed">
                          <div className="v-stepper">
                            <div
                              className={`circle ${
                                userData.isPortfolioScoreAvailable
                                  ? "checkActive"
                                  : null
                              }`}
                            ></div>
                            <div className="line"></div>
                          </div>

                          <div className="content">
                            Get your portfolio score
                          </div>
                        </div>
                        <div className="step active">
                          <div className="v-stepper">
                            <div
                              className={`circle ${
                                userData.hasUserInvestedInIntegratedPortfolio
                                  ? "checkActive"
                                  : null
                              }`}
                            ></div>
                            <div className="line"></div>
                          </div>

                          <div className="content">
                            Invest in an Integrated Portfolio
                          </div>
                        </div>
                        <div className="step">
                          <div className="v-stepper">
                            <div
                              className={`circle ${
                                userData.areExclusiveInvestmentsUnlocked
                                  ? "checkActive"
                                  : null
                              }`}
                            ></div>
                            <div className="line"></div>
                          </div>
                          <div className="content">
                            Unlock exclusive investments
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
                <div className="sliderPart">
                  <div className="mt-3">
                    <ExpertSlider tips={userData.expertTips} />
                  </div>
                </div>

                <div className="card-data mt-5">
                  <h3>Invest in an integrated portfolio</h3>
                  <span>Invest anytime, withdraw anytime.</span>

                  {userData.curatedIntegratedPortfolios &&
                    userData.curatedIntegratedPortfolios.map((ele, index) => {
                      return (
                        <HomePageCard
                          key={index}
                          // for image coming from api
                          // cardimages={ele.img}
                          cardimages={cardimg}
                          innerbutton={ele.heroMessage.toUpperCase()}
                          title={ele.name}
                          heading="INTEGRATED PORTFOLIO"
                          subtitle1="Mini Investment"
                          // subtitle2="Expected return"
                          subtitle3="Ideal for"
                          rate={ele.minInvestment}
                           buttonText={"Invest more"}
                          // percentage={ele.expectedReturn}
                          year={ele.idealTimeDuration}
                          bottomtitle1={ele.cuurentInvestment}
                          // bottomtitle2={ele.investorsCount}
                           btpara={<span><img src={sheild} alt="sheild"/>{"₹70cr already invested"}</span>}
                          // btpara1="smart Invertors"
                        />
                      );
                    })}
                </div>

                {/* <div className="btn-bottom mt-3 mb-5">
                  <button>
                    <span>See other Integrated Portfolios</span>
                  </button>
                </div> */}
              </div>
            </div>

            <div className="col-lg-7 offset-lg-1 myline zeroPadding">
              <div className="rightDiv">
                <div className="row  marginWrapper">
                  <div className="secondPart">
                    <h3>Co-invest with the smartest</h3>
                    <span>
                      Limited time deals, exclusively for you. Swipe for more
                    </span>
                  </div>
                  <div className="cardSliderContainerWrapper">
                    {userData.nuggets &&
                      userData.nuggets.map((ele, index) => {
                        return (
                          <div className="card-data mt-3" key={index}>
                            <HomePageCard1
                              cardimages={growthing}
                              innerbutton={ele.heroMessage}
                              title={ele.name}
                              heading={ele.type}
                              subtitle1="Commitment"
                              value1={ele.minInvestment}
                              subtitle2="Risk Level"
                              value2={ele.riskLevel}
                              button="Unlock"
                              handleButtonClick={handleUnlock}
                              numberVale={"+50"}
                              img1={user1}
                              img2={user3}
                              //  img3={user2}

                              others="other smart investor"
                            />
                          </div>
                        );
                      })}
                    {/* <div className="col-lg-6">
                      <div className="card-data mt-3">
                        <HomePageCard1
                          cardimages={growthing}
                          innerbutton="HIGH GROWTH"
                          title="Edtech"
                          heading="STARTUP INVESTMENT"
                          subtitle1="Commitment"
                          subtitle2="Risk Level"
                          button="Unlock"
                          handleButtonClick={handleUnlock}
                          img1={user1}
                          img2={user3}
                          img3={user2}
                          others="other smart investor"
                        />
                      </div>
                    </div> */}

                    {/* <div className="col-lg-6 ">
                      <div className="card-data mt-3">
                        <HomePageCard1
                          cardimages={growthing}
                          innerbutton="HIGH GROWTH"
                          title="Edtech"
                          heading="STARTUP INVESTMENT"
                          subtitle1="Commitment"
                          subtitle2="Risk Level"
                          button="Unlock"
                          handleButtonClick={handleUnlock}
                          img1={user1}
                          img2={user3}
                          img3={user2}
                          others="other smart investor"
                        />
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Portfolio />
      )}

      <div className="container-fluid toggle-nav bottom-nav mt-4">
        <div className="container bgColor">
          <div className="nav-btn">
            <button
              className={tab === "home" ? "btn-active" : "transpernetWrapper"}
              onClick={() => setTab("home")}
            >
              <img src={tab === "home" ? homeImage : homeGrey} alt="icon" />
              Home
            </button>
            <button
              onClick={() => setTab("portfolio")}
              className={
                tab === "portfolio" ? "btn-active" : "transpernetWrapper"
              }
            >
              <img src={tab === "portfolio" ? portDark : port} alt="icon" />{" "}
              Portfolio
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(InvestmentHome);
