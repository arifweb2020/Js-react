import React from 'react'

const Child = ({Handler}) => {

    return (
        <div>
            <h4>Child Components send data to Parents </h4>
            <button onClick={()=>Handler("arif")}>Send To Parent</button>
        </div>
    )
}

export default Child
