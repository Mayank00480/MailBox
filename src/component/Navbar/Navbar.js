import React from 'react'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AuthActions } from '../store'
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  return (
    <nav className='navBar'>
      <Link className = "link link1" to = "/sent" style = {{textDecoration : 'none' , color : 'white',marginRight: '20px'}}>sent</Link>
      <Link className='link link2' to = "/inbox" style = {{textDecoration : 'none' , color : 'white',marginLeft:'20px'}} >Inbox</Link>
     <button onClick = {() => {
      dispatch(AuthActions.logout())
      localStorage.removeItem("boxEmail")
      navigate("/")
     }}>Logout</button>
    </nav>
  )
}

export default Navbar
