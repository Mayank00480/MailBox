import React, { useEffect,useState } from 'react'
import { useSelector } from 'react-redux'
import Navbar from '../Navbar/Navbar'
import './SentBox.css'
const SentBox = () => {
  let [updatedData , setUpdatedData] = useState([])
  const sentItems = useSelector(state => state.sentItems.items)
  let senderMail = localStorage.getItem("boxEmail")
  let sender;
  sender = senderMail.replaceAll("@","");
  sender = senderMail.replaceAll(".","")
  useEffect(() => {
   fetch(`https://mail-box-41ac6-default-rtdb.firebaseio.com/sent/${sender}.json`)
   .then(res => res.json())
   .then(resp => {
    if(resp.error){
      alert(resp.error.message)
    }
    else{
      let arr = [];
      for(let key in resp){
        arr.push(resp[key])
      }
      setUpdatedData(arr);
    }
   })
  },[sentItems])
  return (
    <>
      <Navbar/>
      <ul className = "unorderedItems">
      {updatedData.map(item => {
        return <li className = "listItems" key = {Math.random().toString()}> 
        <p style = {{margin : '2px 0px'}}>subject : {item.subject} </p> <p style = {{fontSize : '10px'}}>To : {item.To} </p>
        {item.body}</li>
      })}
      </ul>
    </>
  )
}

export default SentBox
