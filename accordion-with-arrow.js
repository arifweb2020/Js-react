import React, { useState } from 'react';
import { Accordion, Card } from "react-bootstrap";
import uparrow from "../../../../assets/Images/uparrow.svg";
import downarrow from "../../../../assets/Images/downarrow.svg";

function HelpSupport() {
    const [open, setOpen] = useState(false);
    return (
        <>
            <div className="profilePage">
                <div className="container-fluid topSection">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-12">
                                <div className="mt-5">
                                    <span className="goBack">Back</span>
                                </div>
                                <div className="mt-5">
                                    <h3 className="profileHeading">Frequently asked questions</h3>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12 col-12">
                                <div className="cardBody p-3 mt-5">
                                    <Accordion defaultActiveKey="0" >
                                        <Accordion.Toggle as={Card.Header} eventKey="0" onClick={() => setOpen(!open)}>
                                            <p className="questionHeading"> What is an integrated portfolio?
                                                {open ? <img src={downarrow} alt="down arrow" className="accordionArrow" /> : <img src={uparrow} alt="up arrow" className="accordionArrow" />}
                                            </p>
                                        </Accordion.Toggle>
                                        <Accordion.Collapse eventKey="0">
                                            <Card.Body><span className="answerPara">We create customised investing solutions to maximize returns while controlling downside.</span></Card.Body>
                                        </Accordion.Collapse>
                                        <Accordion.Toggle as={Card.Header} eventKey="1" onClick={() => setOpen(!open)}>
                                            <p className="questionHeading"> How do you charge investors?
                                                {open ? <img src={uparrow} alt="down arrow" className="accordionArrow" /> : <img src={downarrow} alt="up arrow" className="accordionArrow" />}</p>
                                        </Accordion.Toggle>
                                        <Accordion.Collapse eventKey="1">
                                            <Card.Body><span className="answerPara">We create customised investing solutions to maximize returns while controlling downside.</span></Card.Body>
                                        </Accordion.Collapse>
                                        <Accordion.Toggle as={Card.Header} eventKey="2" onClick={() => setOpen(!open)}>
                                            <p className="questionHeading"> How do you charge investors?
                                                {open ? <img src={uparrow} alt="down arrow" className="accordionArrow" /> : <img src={downarrow} alt="up arrow" className="accordionArrow" />}
                                            </p>
                                        </Accordion.Toggle>
                                        <Accordion.Collapse eventKey="2">
                                            <Card.Body><span className="answerPara">We create customised investing solutions to maximize returns while controlling downside.</span></Card.Body>
                                        </Accordion.Collapse>
                                        <Accordion.Toggle as={Card.Header} eventKey="3" onClick={() => setOpen(!open)}>
                                            <p className="questionHeading"> How do I invest in startups?
                                                {open ? <img src={uparrow} alt="down arrow" className="accordionArrow" /> : <img src={downarrow} alt="up arrow" className="accordionArrow" />}
                                            </p>
                                        </Accordion.Toggle>
                                        <Accordion.Collapse eventKey="3">
                                            <Card.Body><span className="answerPara">We create customised investing solutions to maximize returns while controlling downside.</span></Card.Body>
                                        </Accordion.Collapse>
                                        <Accordion.Toggle as={Card.Header} eventKey="4" onClick={() => setOpen(!open)}>
                                            <p className="questionHeading"> What is the future of debt?
                                                {open ? <img src={uparrow} alt="down arrow" className="accordionArrow" /> : <img src={downarrow} alt="up arrow" className="accordionArrow" />}
                                            </p>
                                        </Accordion.Toggle>
                                        <Accordion.Collapse eventKey="4">
                                            <Card.Body><span className="answerPara">We create customised investing solutions to maximize returns while controlling downside.</span></Card.Body>
                                        </Accordion.Collapse>
                                        <Accordion.Toggle as={Card.Header} eventKey="5" onClick={() => setOpen(!open)}>
                                            <p className="questionHeading"> How do I invest?
                                                {open ? <img src={uparrow} alt="down arrow" className="accordionArrow" /> : <img src={downarrow} alt="up arrow" className="accordionArrow" />}
                                            </p>
                                        </Accordion.Toggle>
                                        <Accordion.Collapse eventKey="5">
                                            <Card.Body><span className="answerPara">We create customised investing solutions to maximize returns while controlling downside.</span></Card.Body>
                                        </Accordion.Collapse>
                                        <Accordion.Toggle as={Card.Header} eventKey="6" onClick={() => setOpen(!open)}>
                                            <p className="questionHeading"> Can I schedule transactions?
                                                {open ? <img src={uparrow} alt="down arrow" className="accordionArrow" /> : <img src={downarrow} alt="up arrow" className="accordionArrow" />}
                                            </p>
                                        </Accordion.Toggle>
                                        <Accordion.Collapse eventKey="6">
                                            <Card.Body><span className="answerPara">We create customised investing solutions to maximize returns while controlling downside.</span></Card.Body>
                                        </Accordion.Collapse>
                                    </Accordion>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col-lg-12 col-12">
                                <h3 className="profileHeading">Need help with something?</h3>
                                <button className="footerButton mt-4 mb-5" >Email us your query</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HelpSupport;
