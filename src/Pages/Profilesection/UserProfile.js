import React, { useContext, useEffect, useState } from 'react';
import classes from "./UserProfile.module.css";
import { Link } from 'react-router-dom';
import default_avatar from "../../Components/Assets/default_avatar.jpg";

import { getDatabase, ref, onValue } from "firebase/database";
import { app } from '../../Config/firebase';
import ThemeContext from '../../Context/theme-context';


const db = getDatabase(app);

const UserProfile = () => {

  const [userName, setUserName] = useState("Set Your Name By Updating Your Profile");
  const [userAge, setUserAge] = useState("Set Your Age By Updating Your Profile");
  const [userGender, setUserGeder] = useState("Set Your Gender By Updating Your Profile");
  const [userImg, setUserImg] = useState(default_avatar);


  const userSince = localStorage.getItem("usersince");
  const loacluserSince = new Date(userSince).toLocaleString();
  const uid = localStorage.getItem("user");

  const themeCtx = useContext(ThemeContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  useEffect(() => {
    onValue(ref(db, `user/${uid}/profile`), (snapShot) => {
      const data = snapShot.val();
      if (data) {
        setUserName(data.userName);
        setUserAge(data.userAge);
        setUserGeder(data.userGender);
        setUserImg(data.userImg ? data.userImg : default_avatar);
      } else {
        setUserName("Set Your Name By Updating Your Profile");
        setUserAge("Set Your Age By Updating Your Profile");
        setUserGeder("Set Your Gender By Updating Your Profile")
        setUserImg(default_avatar);
      }
    })
  }, [])

  return (
    <div className={classes.userProfileContainer}>
      <div className={classes.userContainer} style={{backgroundColor : themeCtx.theme === "light" ? "#B9D9EB" : "rgb(54, 69, 79)"}}>
        <h1>Your Profile</h1>
        <div className={classes.usermainsection}>
          <div className={classes.imgDiv}>
            <img src={userImg} alt='profile-img' className={classes.profileImg}/>
          </div>
          <div className={classes.userdetails}>
            <p style={{ textAlign: "left" }}>Your Name : {userName.toUpperCase()}</p>
            <p style={{ textAlign: "left" }}>Age : {userAge}</p>
            <p style={{ textAlign: "left" }}>Gender : {userGender.toUpperCase()}</p>
            <p style={{ textAlign: "left" }}>User Since : {loacluserSince.toUpperCase()}</p>
          </div>
        </div>
        <div className={classes.btn}>
          <Link to="/home/profile">Update Profile</Link>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
