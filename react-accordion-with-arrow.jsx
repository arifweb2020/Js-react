import React, { useState } from "react";
import { Accordion, Card } from "react-bootstrap";
import uparrow from "../../../../assets/Images/uparrow.svg";
import downarrow from "../../../../assets/Images/downarrow.svg";
import { Link } from "react-router-dom"

function HelpSupport() {
  const [open, setOpen] = useState(false);
  function toggleActive(id) {
    if (open === id) {
      setOpen(null);
    } else {
      setOpen(id);
    }
  }
  return (
    <>
      <div className="profilePage">
        <div className="container-fluid topSection">
          <div className="profileContainers">
            <div className="row">
              <div className="col-lg-12 col-12">
                <div className="mt-3">
                  <Link to="/userProfile"><span className="goBack">{"<"} Back</span></Link>
                </div>
                <div className="mt-5">
                  <h3 className="profileHeading">Frequently asked questions</h3>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 col-12">
                <div className="cardBody p-3 mt-5">
                  <Accordion defaultActiveKey="0">
                    <Accordion.Toggle
                      as={Card.Header}
                      eventKey="0"
                      onClick={() => toggleActive(1)}
                    >
                      <p className="questionHeading">
                        {" "}
                        What is an integrated portfolio?
                        <img
                          src={open === 1 ? downarrow : uparrow}
                          alt="img"
                          className="accordionArrow"
                        />
                      </p>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                        <span className="answerPara">
                          We create customised investing solutions to maximize
                          returns while controlling downside.
                        </span>
                      </Card.Body>
                    </Accordion.Collapse>
                    <Accordion.Toggle
                      as={Card.Header}
                      eventKey="1"
                      onClick={() => toggleActive(2)}
                    >
                      <p className="questionHeading">
                        {" "}
                        How do you charge investors?
                        <img
                          src={open === 2 ? uparrow : downarrow}
                          alt="img"
                          className="accordionArrow"
                        />
                      </p>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                      <Card.Body>
                        <span className="answerPara">
                          We create customised investing solutions to maximize
                          returns while controlling downside.
                        </span>
                      </Card.Body>
                    </Accordion.Collapse>
                    <Accordion.Toggle
                      as={Card.Header}
                      eventKey="2"
                      onClick={() => toggleActive(3)}
                    >
                      <p className="questionHeading">
                        {" "}
                        How do I invest in startups?
                        <img
                          src={open === 3 ? uparrow : downarrow}
                          alt="img"
                          className="accordionArrow"
                        />
                      </p>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="2">
                      <Card.Body>
                        <span className="answerPara">
                          We create customised investing solutions to maximize
                          returns while controlling downside.
                        </span>
                      </Card.Body>
                    </Accordion.Collapse>
                    <Accordion.Toggle
                      as={Card.Header}
                      eventKey="4"
                      onClick={() => toggleActive(4)}
                    >
                      <p className="questionHeading">
                        {" "}
                        What is the future of debt?
                        <img
                          src={open === 4 ? uparrow : downarrow}
                          alt="img"
                          className="accordionArrow"
                        />
                      </p>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="4">
                      <Card.Body>
                        <span className="answerPara">
                          We create customised investing solutions to maximize
                          returns while controlling downside.
                        </span>
                      </Card.Body>
                    </Accordion.Collapse>
                    <Accordion.Toggle
                      as={Card.Header}
                      eventKey="5"
                      onClick={() => toggleActive(5)}
                    >
                      <p className="questionHeading">
                        {" "}
                        How do I invest?
                        <img
                          src={open === 5 ? uparrow : downarrow}
                          alt="img"
                          className="accordionArrow"
                        />
                      </p>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="5">
                      <Card.Body>
                        <span className="answerPara">
                          We create customised investing solutions to maximize
                          returns while controlling downside.
                        </span>
                      </Card.Body>
                    </Accordion.Collapse>
                    <Accordion.Toggle
                      as={Card.Header}
                      eventKey="6"
                      onClick={() => toggleActive(6)}
                    >
                      <p className="questionHeading">
                        {" "}
                        Can I schedule transactions?
                        <img
                          src={open === 6 ? uparrow : downarrow}
                          alt="img"
                          className="accordionArrow"
                        />
                      </p>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="6">
                      <Card.Body>
                        <span className="answerPara">
                          We create customised investing solutions to maximize
                          returns while controlling downside.
                        </span>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Accordion>
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-lg-12 col-12">
                <h3 className="profileHeading">Need help with something?</h3>
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

export default HelpSupport;
