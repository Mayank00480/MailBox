import React,{useState , useRef} from 'react'
import classes from './auth.module.css'
import { useNavigate } from 'react-router-dom';
import { AuthActions } from '../store';
import { useDispatch } from 'react-redux';
const Auth = () => {
    const [isLogin , setIsLogin] = useState(false);
    const emailInput = useRef();
    const dispatch = useDispatch()
    const passwordInput = useRef();
   
    const confirmPasswordInput = useRef();
    const switchAuthModeHandler = () => {
        setIsLogin(!isLogin)
    }
    const submitHandler = (e) => {
   e.preventDefault();
   let url;
  let  myObj = {
    email : emailInput.current.value,
    password : passwordInput.current.value,
}   
   if(isLogin){
 url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDa4xEM5sW454NecL8RF0seVOWMYvNl4BU'
   }
   else{
    url ='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDa4xEM5sW454NecL8RF0seVOWMYvNl4BU';
}
if(isLogin || passwordInput.current.value === confirmPasswordInput.current.value) 
  {
     fetch(url,{
    method : 'POST',
    body : JSON.stringify(myObj)
   })
   .then(res => res.json()).catch(err => alert(err.message)) 
   .then(resp => {
    if(resp.error){
        alert(resp.error.message);
    }
    else{
        console.log(resp);
        dispatch(AuthActions.login())
        
    }
   })
}
    }
    return (
    <>
     <section className={classes.auth}>
      
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control} >
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref = {emailInput}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref = {passwordInput}
          />
        </div>
      {!isLogin &&  <div className={classes.control}>
          <label htmlFor='password'>Confirm Password</label>
          <input
            type='password'
            id='confirmPassword'
            required
            ref = {confirmPasswordInput}
          />
        </div>}
        <div className={classes.actions}>
   <button type = "submit">{ isLogin? 'Login' : 'Signup' 
}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
  {isLogin && <button type = "button" className={classes.toggle} >Forgot Password</button> }
        </div>
      </form>
    </section> 
    </>
  )
}

export default Auth
