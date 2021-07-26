import './App.css';
import Main from './Main';
import {useState,useCallback} from 'react'
import Child from './child';
function App() {

 const [count,setCount]=useState(0)
 const [input ,setInput]=useState("")

// const chngName= ()=>{

//   console.log('call by child')
// }

const mycallback = useCallback(()=>{

  console.log('call by child')
},[]) 


  return (
    <div className="container mt-5">
     <h1 style={{textAlign:'center',marginBottom:'30px',fontWeight:'bold'}}>Welcome to <span style={{color:'green'}}>News</span> <span style={{color:'darkorange'}}>India</span></h1>
     {/* <Main/> */}

    <h2>count value is : {count}</h2>

    <button onClick={()=>setCount(count+1)}>Count </button>

    <input type="text" onChange={(e)=>setInput(e.target.value)}/>

    {/* <Child name="arif"  handler={chngName}/> coz here it call another function thats why after memo its re-rendring
    to prevent this we use : useCallback
    
    */}

    <Child name="arif"  handler={mycallback}/>

    </div>
  );
}

export default App;



child component

import React,{memo} from 'react'

const Child = ({name,handler}) => {

    console.log("child comp is call")
    return (
        <div>
            <h2>Child comp {name}</h2>
            {/* <button onClick={handler}>child to parent call</button> */}

            <button onClick={handler}>child to parent call</button>
        </div>
    )
}

export default memo(Child)
