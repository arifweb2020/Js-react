import React, { useRef } from "react";
import "./styles.css";

export default function App() {
  const divRef = useRef();

  return (
    <div className="App">
      <button
        onClick={() => {
          divRef.current.scrollIntoView({ behavior: "smooth" });
        }}
      >
        Scroll to Bottom
      </button>
      <div className="bigDiv" />
      <div className="bigDiv" />
      <div className="bigDiv" />
      <div className="bigDiv" ref={divRef}>
        Scrolled Here
      </div>
    </div>
  );
}
