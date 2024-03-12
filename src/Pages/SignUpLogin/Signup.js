import React, { useState } from 'react';
import { AiTwotoneMail, AiTwotoneLock, AiTwotoneEye, AiTwotoneEyeInvisible } from "react-icons/ai";
import classes from "./Login.module.css";
import Animated from '../../Components/Animation/Animated';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { passwordNotMatchedNotify, infoNotify } from '../../Components/Notify/Toastify';

import {getAuth , createUserWithEmailAndPassword, sendEmailVerification} from "firebase/auth";
import { app } from '../../Config/firebase';


const auth = getAuth(app);

const Signup = ({ showLogin }) => {

  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");
  const [conPass , setConpass] = useState("");


  const passwordTogglehandler = () => {
    setShowPass(!showPass);
  }

  const confirmPasswordTogglehandler = () => {
    setShowConfirm(!showConfirm);
  }

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    if (conPass !== password) {
      passwordNotMatchedNotify();
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth , email , password);
      const user = userCredential.user;
      await sendEmailVerification(user).then(() => {
        infoNotify(`Email verification sent to ${user.email}`);
      })
      setTimeout(() => {
        showLogin(true);
      },5000)
    } catch (error) {
      console.log(error.message);
    }

    setEmail("");
    setPassword("");
    setConpass("");
  }

  return (
    <>
      <form onSubmit={formSubmitHandler}>
        <Animated>
          <div className={classes.container}>
            <div className={classes['email-input']}>
              <AiTwotoneMail />
              <input type='email' placeholder='Enter email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} required/>
            </div>
            <div className={classes['password-input']}>
              <div className={classes['password-input-div']}>
                <AiTwotoneLock size={22} />
                <input type={showPass ? 'text' : 'password'} placeholder='Enter password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} required/>
              </div>
              {showPass ? <AiTwotoneEyeInvisible onClick={passwordTogglehandler} className={classes.icon} /> : <AiTwotoneEye onClick={passwordTogglehandler} className={classes.icon} />}
            </div>
            <div className={classes['password-input']}>
              <div className={classes['password-input-div']}>
                <AiTwotoneLock size={22} />
                <input type={showConfirm ? 'text' : 'password'} placeholder='Confirm password' id='confirm password' required  value={conPass} onChange={(e) => setConpass(e.target.value)}/>
              </div>
              {showConfirm ? <AiTwotoneEyeInvisible onClick={confirmPasswordTogglehandler} className={classes.icon} /> : <AiTwotoneEye onClick={confirmPasswordTogglehandler} className={classes.icon} />}
            </div>
            <div>
              <button className={classes.btn} type='submit'>Signup</button>
            </div>
          </div>
        </Animated>
      </form>
      <ToastContainer />
    </>
  )
}

export default Signup
