import React, { useState } from "react";
import "./detailedPortfolioModalStyle.scss";
import closeModal from "./../../../assets/Images/closeModal.svg";
import { get } from "lodash";

const DetailedPortfolio = (props) => {
  const { data } = props;
  const [tab, setTab] = useState("equityMix");
  const { onCloseModal } = props;

  const indianEquity = () => {
    let sum = 0;
    get(data, "equity.indian", []).map((item, index) => {
      return (sum += item.percentage);
    });
    return sum;
  };
  const internationalEquity = () => {
    let sum = 0;
    get(data, "equity.international", []).map((item, index) => {
      return (sum += item.percentage);
    });
    return sum;
  };
  const fixedIncome = () => {
    let sum = 0;
    get(data, "debt.fixedIncome", []).map((item, index) => {
      return (sum += item.percentage);
    });
    return sum;
  };
  const gold = () => {
    let sum = 0;
    get(data, "debt.gold", []).map((item, index) => {
      return (sum += item.percentage);
    });
    return sum;
  };

  const equityMixIndianEquityRender = () => {
    return get(data, "equity.indian", []).map((item, index) => {
      return (
        <div className="data" key={index}>
          <div>{item.name} </div>
          <div>{item.percentage}%</div>
        </div>
      );
    });
  };
  const equityMixInternationalEquityRender = () => {
    return get(data, "equity.international", []).map((item, index) => {
      return (
        <div className="data" key={index}>
          <div>{item.name} </div>
          <div>{item.percentage}%</div>
        </div>
      );
    });
  };
  const debtMixDebtRender = () => {
    return get(data, "debt.fixedIncome", []).map((item, index) => {
      return (
        <div className="data" key={index}>
          <div>{item.name} </div>
          <div>{item.percentage}%</div>
        </div>
      );
    });
  };
  const debtMixGoldRender = () => {
    return get(data, "debt.gold", []).map((item, index) => {
      return (
        <div className="data" key={index}>
          <div>{item.name} </div>
          <div>{item.percentage}%</div>
        </div>
      );
    });
  };
  return (
    <React.Fragment>
      <div className="detailPortfolioWrapper">
        <div className="detailedPortfolio">
          <div className="horizontalTab">
            <div className="hr"></div>
          </div>
          <div onClick={() => onCloseModal()}>
            <img
              className="pull-right closeModal pointerCursor"
              src={closeModal}
              alt="close"
            />
          </div>
          <div className="detailedPortfolioHeading">
            <div className="headingText">
              <span>Fund details</span>
            </div>
          </div>
          <div className="detailedPortfolioTabContainer">
            <div className="tabChangeBtns">
              <button
                className={
                  tab === "equityMix"
                    ? "btn selected btn-dark"
                    : "btn btn-light"
                }
                onClick={() => setTab("equityMix")}
              >
                Equity mix
              </button>
              <button
                className={
                  tab === "debtMix" ? "btn selected btn-dark" : "btn btn-light"
                }
                onClick={() => setTab("debtMix")}
              >
                Debt mix
              </button>
              {/* <button className={tab === 'risk' ? "btn selected btn-dark" : "btn btn-light"}
                            // onClick={() => setTab('risk')}
                            >
                                Risk
                            </button> */}
            </div>
          </div>
          {tab === "equityMix" && (
            <React.Fragment>
              {/* <div className="headerSection">
                <div className="headerContent">
                  <span>Indian Equity</span>
                  <div className="headerContentValue">
                    <span>{indianEquity()}%</span>
                  </div>
                </div>
                <div className="headerContent">
                  <span>International Equity</span>
                  <div className="headerContentValue">
                    <span>{internationalEquity()}%</span>
                  </div>
                </div>
              </div> */}
              {/* <hr /> */}
              <div className="portfolioDataSection">
                <div className="heading">
                  <div className="data">
                    <div>Indian Equity </div>
                    <div>{indianEquity()}%</div>
                  </div>
                </div>
                {equityMixIndianEquityRender()}
              </div>
              <hr />
              <div className="portfolioDataSection">
                <div className="heading">
                  <div className="data">
                    <div>US Equity </div>
                    <div>{internationalEquity()}%</div>
                  </div>
                </div>
                {equityMixInternationalEquityRender()}
              </div>
            </React.Fragment>
          )}
          {tab === "debtMix" && (
            <React.Fragment>
              {/* <div className="headerSection">
                <div className="headerContent">
                  <span>Fixed Income</span>
                  <div className="headerContentValue">
                    <span>{fixedIncome()}%</span>
                  </div>
                </div>
                <div className="headerContent">
                  <span>Gold</span>
                  <div className="headerContentValue">
                    <span>{gold()}%</span>
                  </div>
                </div>
              </div> */}
              {/* <hr /> */}
              <div className="portfolioDataSection">
                <div className="heading">
                  <div className="data">
                    <div>Fixed Income </div>
                    <div>{fixedIncome()}%</div>
                  </div>
                </div>
                {debtMixDebtRender()}
              </div>
              <hr />
              <div className="portfolioDataSection">
                <div className="heading">
                  <div className="data">
                    <div>Gold </div>
                    <div>{gold()}%</div>
                  </div>
                </div>
                {debtMixGoldRender()}
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};
export default DetailedPortfolio;
