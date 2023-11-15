import React ,{useRef}from 'react'
import { useDispatch } from 'react-redux'
import { AuthActions } from '../store'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import './Home.css'
import Navbar from '../Navbar/Navbar'
const Home = () => {
 const dispatch = useDispatch()
 const emailAddress = useRef();
 const emailSubject = useRef();
 const emailBody = useRef(); 
 const submitHandler = (e) => {
e.preventDefault();
let destinyInbox = emailAddress.current.value;
destinyInbox = destinyInbox.replaceAll("@","");
destinyInbox = destinyInbox.replaceAll("." , "");
let senderMail = localStorage.getItem("boxEmail")
let sender;
sender = senderMail.replaceAll("@","");
sender = senderMail.replaceAll(".","")
console.log(sender)
fetch(`https://mail-box-41ac6-default-rtdb.firebaseio.com/sent/${sender}.json`,{
  method : 'POST',
  body : JSON.stringify({
    subject : emailSubject.current.value,
    body : emailBody.current.value,
    To:emailAddress.current.value
  }),
  headers : {
    "Content-Type" : "application/json"
  }
})
.then(res => res.json())
.catch(err => alert(err.message))
.then(resp => {
  if(resp.error){
    alert(resp.error.message);
  }
  else{
    console.log(resp);
  }
})



fetch(`https://mail-box-41ac6-default-rtdb.firebaseio.com/inbox/${destinyInbox}.json`,{
  method : 'POST',
  body : JSON.stringify({
    From : senderMail ,
    subject : emailSubject.current.value,
    body : emailBody.current.value
  }),
  headers : {
    "Content-Type" : "application/json"
  }
})
.then(res => res.json())
.catch(err => alert(err.message))
.then(resp => {
  if(resp.error){
    alert(resp.error.message);
  }
  else{
    console.log(resp);
  }
})







 }
     return (
      <>
      <Navbar/>
      <form className = "mailForm" onSubmit = {submitHandler}>
          <label>To:</label>
          <input type = "email" className = "reciever" ref = {emailAddress}/>
          <br/>
          <hr/>
          <br/>
          <input type ="text" placeholder='Text Mail' className = 'subject' ref = {emailSubject}/>
          <br/>
          <hr/>
          <ReactQuill className = "editor" ref = {emailBody}/>
          <input type = "submit" className = "submit"/>
   </form>
    </>
  )
}

export default Home
