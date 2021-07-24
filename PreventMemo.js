import React,{memo} from 'react'

const CheckMemo = ({mydata}) => {
    console.log("inner component")
    return (
        <div>
            <h3>Inner Memo - {mydata}</h3>
        </div>
    )
}

export default memo(CheckMemo)
