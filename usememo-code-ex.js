import './App.css';
import Main from './Main';
import {useState,useMemo} from 'react'
function App() {

  const [count,setCount]=useState(0)
  const [item ,setItem]=useState(20)

  // without usememo
  
  // function myCount(){

  //   console.log("multi count");

  //   return count*5;
  // }

  const ourMemo = useMemo( function myCount(){

    console.log("multi count");

    return count*5;
  },[count])

  return (
    <div className="container mt-5">
     <h1 style={{textAlign:'center',marginBottom:'30px',fontWeight:'bold'}}>Welcome to <span style={{color:'green'}}>News</span> <span style={{color:'darkorange'}}>India</span></h1>
     {/* <Main/> */}

    <h2>Count value : {count}</h2>

    <button onClick={()=>setCount(count+1)}>Count</button>

    <h2>Item value : {item}</h2>

    <button onClick={()=>setItem(item+1)}>Item</button>

    {/* <h2>Function count : {myCount()}</h2> */}
    <h2>with usememo Function count : {ourMemo}</h2>





    </div>
  );
}

export default App;
