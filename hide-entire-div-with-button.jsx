/** @jsx jsx */
import { jsx, Container } from "theme-ui"
import React, { useState } from "react"

function Demo2() {
  const [isVisible, setIsVisible] = useState(true)

  return (
    <div style={{ display: isVisible ? "block" : "none" }}>
      <p>This is the visibilityi test div</p>
      <button onClick={() => setIsVisible(false)}>Click me</button>
    </div>
  )
}

export default Demo2
