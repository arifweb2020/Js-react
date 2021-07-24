import './App.css';
import { useState, useEffect } from 'react';


function App() {

const [data,setData]=useState({})
const [myid,setId]=useState(1)

const getData = async () =>{

    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${myid}`)

    const res1 = await res.json();

    console.log(res1)
  setData(res1)
}

// useEffect(()=>{
//   getData()
// },[myid])




  return (
    <div className="container mt-5">

      <input className="from-group" placeholder="search" value={myid}
      onChange={(e)=>setId(e.target.value)}
      />
    <button onClick={getData}>Search</button>
      <h1>{data.name}</h1>

    </div>
  );
}

export default App;
