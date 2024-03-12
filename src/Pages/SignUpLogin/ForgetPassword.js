import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { app } from '../../Config/firebase';
import { useNavigate } from 'react-router-dom';
import classes from "./ForgetPassword.module.css";
import { infoNotify } from '../../Components/Notify/Toastify';

const auth = getAuth(app);

const ForgetPassword = () => {

  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    await sendPasswordResetEmail(auth, email).then(() => {
      infoNotify(`Password Reset Email Sent To => ${email}`);
      setEmail("");
      setTimeout(() => {
        navigate("/", { replace: true })
      }, 4000)
    }).catch((error) => {
      alert(error.message);
    })
  }

  const cancelHandler = () => {
    navigate("/", { replace: true })
  }

  return (
    <div className={classes.parentContainer}>
      <h3>Enter Your Email For Reset Your password</h3>
      <form onSubmit={submitHandler} className={classes.formContainer}>
        <input type='email' placeholder='Write Your Email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <div>
          <button type='submit' style={{backgroundColor : 'skyblue' , color : "#000"}}>Reset</button>
          <button onClick={cancelHandler} style={{backgroundColor : "red"}}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default ForgetPassword
