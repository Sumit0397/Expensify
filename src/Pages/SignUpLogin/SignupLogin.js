import React, { useState } from 'react'
import Login from './Login';
import Signup from './Signup';
import classes from "./SignupLogin.module.css";

const SignupLogin = () => {
  const [showLogin, setShowLogin] = useState(true);

  const handleToggle = () => {
      setShowLogin(!showLogin);
  }

  const headingClass = showLogin ? classes['auth-heading-login'] : classes['auth-heading-signup'];

  return (
    <div className={classes['auth-container']}>
      <div className={headingClass}>
        <h1>{showLogin ? 'Welcome' : 'Create'}</h1>
        <h1>{showLogin ? 'Back' : 'Account'}</h1>
        <p>{showLogin ? 'Please sign-in to continue!' : 'Please sign-up to continue!'}</p>
      </div>
      {showLogin ? (
        <Login />
      ) : (
        <Signup showLogin={setShowLogin}/>
      )}
      <div className={classes.buttons}>
        <p>
          {showLogin ? "Don't have an account? " : 'Already have an account? '}
          <span onClick={handleToggle} className={classes.links}>
            {showLogin ? 'Signup' : 'Signin'}
          </span>
        </p>
      </div>
    </div>
  )
}

export default SignupLogin
