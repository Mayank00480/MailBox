import React, { useEffect ,useState} from 'react'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AuthActions } from '../store'
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [count , setCount] = useState(0)
  let senderMail = localStorage.getItem("boxEmail")
    let sender;
    let sender2;
    if(senderMail != undefined){
    sender = senderMail.replaceAll("@","");
     sender2 = sender.replaceAll(".","")
    }
  useEffect(() => {

    if(senderMail != undefined){
    fetch(`https://mail-box-41ac6-default-rtdb.firebaseio.com/inbox/${sender2}.json`)
    .then(res => res.json())
    .then(resp => {
    
       let cnt = 0;
           for(let key in resp){
            console.log(resp[key]);
              if(resp[key].isRead == false )
              {
                console.log(1)
               cnt++;
              }
           }
           setCount(cnt);
          
       }
)
      }
}, [])


  return (
    <nav className='navBar'>
      <Link className = "link link1" to = "/sent" style = {{textDecoration : 'none' , color : 'white',marginRight: '20px'}}>sent</Link>
      <Link className='link link2' to = "/inbox" style = {{textDecoration : 'none' , color : 'white',marginLeft:'20px'}} >Inbox {count}</Link>
     <button onClick = {() => {
      dispatch(AuthActions.logout())
      localStorage.removeItem("boxEmail")
      navigate("/")
     }}>Logout</button>
    </nav>
  )
}

export default Navbar
