import React, { useEffect,useState } from 'react'
import Navbar from '../Navbar/Navbar'

const Inbox = () => {
    let [updatedData , setUpdatedData] = useState([])
    let senderMail = localStorage.getItem("boxEmail")
    let sender;
    sender = senderMail.replaceAll("@","");
    let sender2 = sender.replaceAll(".","")
    
    console.log(sender2)
    useEffect(() => {
         fetch(`https://mail-box-41ac6-default-rtdb.firebaseio.com/inbox/${sender2}.json`)
         .then(res => res.json())
         .then(resp => {
            let arr = [];
                for(let key in resp){
                    arr.push(resp[key]);
                }
                setUpdatedData(arr);
            }
    )
    }, [])
  return (
    <>
      <Navbar/>
      <ul className = "unorderedItems">
      {updatedData.map(item => {
        return <li className = "listItems" key = {Math.random().toString()}> 
        <p style = {{margin : '2px 0px'}}>subject : {item.subject} </p> <p style = {{fontSize : '10px'}}>To : {item.From} </p>
        {item.body}</li>
      })}
      </ul>
    </>
  )
}

export default Inbox
