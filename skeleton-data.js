

const [data,setData]=usesatate([])

useEffect(()=>{

setTimeout(async ()=>{

const res = await fetch()

setData(res)
},5000)

})


const Skeloton = ()=>{

return (

{data && data.map(()=>{

})}

{!data && <div >loading ... </div>}

)

}
