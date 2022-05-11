https://yamagata-developers-society.github.io/blog/react-hooks-slide-in-modal/

https://www.npmjs.com/package/react-modal-sheet

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

.Modal {
  position: fixed;
  bottom: -150vh;
  background-color: #fff;
  width: 100%;
  left: 0;
  padding: 0 12px 12px;
  transition: bottom 0.3s ease-out;
  z-index: 10;
}
.Modal.Show {
  bottom: 0;
}
.Overlay {
  background-color: rgba(0, 0, 0, 0.55);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: fixed;
  display: none;
  z-index: 5;
}

.Overlay.Show {
  display: block;
}

function App() {
  const [alert, setAlert] = useState("");
  const [displayModal, setDisplayModal] = useState(false);

  useEffect(() => {
    const clearMessage = setTimeout(() => {
      setAlert("");
    }, 5000);
    return () => clearTimeout(clearMessage);
  }, [alert]);

  return (
    <div className="App">
      <button
        className="Button CenterAlign"
        onClick={() => setDisplayModal(!displayModal)}
      >
        Settings
      </button>

      <div className={`Modal ${displayModal ? "Show" : ""}`}>
        <h3>Settings</h3>
        <button
          className="Close"
          onClick={() => setDisplayModal(!displayModal)}
        >
          X
        </button>
        <p className="HelpText">
          Note: these settings are saved in the browser only and can be lost
        </p>
        <button
          className="Button"
          onClick={() => setAlert("This is an alert!")}
        >
          Trigger alert
        </button>
      </div>
      <div
        className={`Overlay ${displayModal ? "Show" : ""}`}
        onClick={() => setDisplayModal(!displayModal)}
      />
      <p className="Alert">{alert}</p>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
