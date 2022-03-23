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



import React, { useEffect, useRef } from 'react'

const Messages = ({ messages }) => {

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages]);

  return (
    <div>
      {messages.map(message => <Message key={message.id} {...message} />)}
      <div ref={messagesEndRef} />
    </div>
  )
}
