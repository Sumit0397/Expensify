import React, { useState, useContext } from 'react';
import { AiTwotoneMail, AiTwotoneLock, AiTwotoneEye, AiTwotoneEyeInvisible } from "react-icons/ai";
import classes from "./Login.module.css";
import Animated from '../../Components/Animation/Animated';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../Context/auth-context';
import { authenticationErrorNotify, errorNotify } from '../../Components/Notify/Toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../../Config/firebase';
import ThemeContext from '../../Context/theme-context';

const auth = getAuth(app);

const Login = () => {

  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const themeCtx = useContext(ThemeContext);

  const theme = localStorage.getItem("theme") || "light";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const passwordTogglehandler = () => {
    setShowPass(!showPass)
  }

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      if(!user.emailVerified){
        errorNotify("Email Not Verified Yet!!");
        return;
      }
      console.log(user);
      themeCtx.toggleTheme(theme);
      authCtx.login(user.uid , user.metadata.creationTime);
      navigate("/home/welcome", { replace: true })

    } catch (error) {
      authenticationErrorNotify(error.message);
    }
  }

  const handleForgetPassword = () => {
    navigate("/forgetPassword" , {replace : true})
  }

  return (
    <>
      <form onSubmit={formSubmitHandler}>
        <Animated>
          <div className={classes.container}>
            <div className={classes['email-input']}>
              <AiTwotoneMail />
              <input type='email' placeholder='Enter email' id='email' required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className={classes['password-input']}>
              <div className={classes['password-input-div']}>
                <AiTwotoneLock size={22} />
                <input type={showPass ? 'text' : 'password'} placeholder='Enter password' id='password' required value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              {showPass ? <AiTwotoneEyeInvisible onClick={passwordTogglehandler} className={classes.icon} /> : <AiTwotoneEye onClick={passwordTogglehandler} className={classes.icon} />}
            </div>
            <div className={classes['forget-password']}>
              <p onClick={handleForgetPassword}>Forget your password?</p>
            </div>
            <div>
              <button className={classes.btn} type='submit'>Signin</button>
            </div>
          </div>
        </Animated>
      </form>
      <ToastContainer style={{ fontSize: '12px' }} />
    </>
  )
}

export default Login
