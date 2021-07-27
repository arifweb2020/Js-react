import React, { useState, useMemo } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  function handleClick2() {
    setCount2(count2 + 1);
  }

  function parClick (){

    console.log("hitttt")
  }

  const memoComponent = useMemo(() => {
    return <AnotherComponent name="haifa" handler={parClick}/>;
  }, [count]);

  return (
    <>
      {count}
      <button onClick={handleClick}>Increase</button>
      {count2}
      <button onClick={handleClick2}>Increase</button>
      {/* <AnotherComponent /> */}
      {memoComponent}
    </>
  );
}

 function AnotherComponent({name,handler}) {
   console.log("child call")
  return <>
  <h1>Arif {name}</h1>
  <p>{Math.random()}</p>
  <button onClick={handler}>Change</button>
  
  </>;
}

export default App
