import React, { useContext, useEffect, useState } from 'react';
import classes from "./Profile.module.css";
import ThemeContext from '../../Context/theme-context';
import { sucessNotify, errorNotify } from '../../Components/Notify/Toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {getDatabase ,ref , set} from "firebase/database";
import {getStorage , ref as storageRef , uploadBytes , getDownloadURL} from "firebase/storage";
import { app } from '../../Config/firebase';
import { useNavigate } from 'react-router-dom';

const db = getDatabase(app);
const storage = getStorage(app);

const Profile = () => {

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [file  ,setFile] = useState(null);


  const themeCtx = useContext(ThemeContext);
  const uid = localStorage.getItem("user");
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])


  const handleSubmit = async (event) => {
    event.preventDefault();
    if(uid){

      const myRef = storageRef(storage , `images/${uid}`)
      await uploadBytes(myRef , file);

      const imageUrl = await getDownloadURL(myRef);

      set(ref(db , `user/${uid}/profile`) , {
        userName : name,
        userAge : age,
        userGender : gender,
        userImg : imageUrl
      }).then(() => {
        sucessNotify("Profile Updated");
        setName("");
        setAge("");
        setGender("male");
        event.target.reset();
        setTimeout(() => {
          navigate("/home/userprofile" , {replace : true});
        },3200)
      })
    }else{
      errorNotify("Something is wrong please login again!!")
    }
  }

  const handleCancelBtn = () => {
    navigate("/home/userprofile" , {replace : true});
  }

  return (
    <div className={classes.parentConatiner}>
      <div className={classes.profileContainer} style={{ color: themeCtx.theme === "light" ? "rgb(9, 68, 116)" : "#000" }}>
        <div className={classes.profileHeading}>
          <h1>Your</h1>
          <h1>Profile</h1>
          <p>Update your profile</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={classes.formContainer}>
            <div>
              <label htmlFor='name'>Your Name:</label>
              <input
                type='text'
                placeholder='Enter Your Name'
                id='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required />
            </div>
            <div>
              <label htmlFor='age'>Age:</label>
              <input
                type='number'
                placeholder='Enter Your Age'
                id='age'
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required />
            </div>
            <div>
              <label>Gender:</label>
              <div className={classes.gender}>
                <input type='checkbox' checked={gender === "male"} value="male" onChange={(e) => setGender(e.target.value)} />
                <label>Male</label>
                <input type='checkbox' checked={gender === "female"} value="female" onChange={(e) => setGender(e.target.value)} />
                <label>Female</label>
              </div>
            </div>
            <div>
              <label htmlFor='photo'>Upload Your Photo:</label>
              <input
                type='file'
                id="photo"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <div className={classes.btnContainer}>
              <button className={classes.profileButton} type='submit'>Update</button>
              <button className={classes.profileButton} style={{backgroundColor: "red"}} onClick={handleCancelBtn}>Cancel</button>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Profile
