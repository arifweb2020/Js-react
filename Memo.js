import React,{useState} from 'react'
import CheckMemo from './CheckMemo'

const AppMemo = () => {

    const [count,setCount]=useState(0)
    const[data,setData]=useState(100);
    return (
        <div>
            <h1>App Memo - {count}</h1>
            <CheckMemo mydata={data}/>

            <button onClick={()=>setCount(count+1)}>Count</button>
        </div>
    )
}

export default AppMemo
