import './App.css';
import { useState, useEffect } from 'react';


function App() {

const [data,setData]=useState([])
const [id,setId]=useState(1)

const getData = async () =>{

    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)

    const res1 = await res.json();

    console.log(res1)
  setData(res1)
}

useEffect(()=>{
  getData()
},[id])




  return (
    <div className="container mt-5">

      <input className="from-group" placeholder="search" value={id}
      onChange={(e)=>setId(e.target.value)}
      />
    
      <h1>{data.name}</h1>

    </div>
  );
}

export default App;



