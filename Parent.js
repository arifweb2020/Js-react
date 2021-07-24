import React,{useState} from 'react'
import Child from './Child'

const Parents = () => {

    const [name,setName]= useState("haifa")

    const parentHandler =(name)=>{
        console.log('parent handler' , name);

        setName(name)
    }
    return (
        <div>
            <h2>Parents Components {name}</h2>
            <Child Handler={parentHandler}/>
        </div>
    )
}

export default Parents
