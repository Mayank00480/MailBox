import React from 'react'
import { useDispatch } from 'react-redux'
import { AuthActions } from '../store'
const Home = () => {
 const dispatch = useDispatch()
    return (
    <>
      <h1>Welcome to your mailbox</h1>
      <button onClick = {() =>{
        dispatch(AuthActions.logout())
      }}>Logout</button>
    </>
  )
}

export default Home
