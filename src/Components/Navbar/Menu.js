import React, { useContext, useState } from "react";
import "./Menu.css";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../../Context/auth-context";
import default_avatar from "../Assets/default_avatar.jpg";
import ThemeContext from "../../Context/theme-context";
import sun from "../Assets/sun.png";
import moon from "../Assets/moon2.png";

function Menu({ close }) {

  const [isOpen, setIsOpen] = useState(false);
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const themeCtx = useContext(ThemeContext);

  const menuCloseHandler = () => {
    close(false);
  }

  const logoutHandler = () => {
    themeCtx.toggleTheme("light");
    authCtx.logout();
    navigate("/", { replace: true })
  }

  const prfilePageHandler = () => {
    close(false);
    navigate("/home/userprofile", { replace: true })
  }

  return (
    <>
      <div className="Navbars" style={{ backgroundColor: themeCtx.theme === "light" ? "#fff" : "rgb(54, 69, 79)" , }}>
        <ul className="NavbarWrappers" style={{color: themeCtx.theme === "light" ? "rgb(5, 72, 117)" : "rgb(9, 150, 245)"}}>
          <li className="NavbarElement">
            <NavLink className="link" to="/home/welcome" onClick={menuCloseHandler} style={{color: themeCtx.theme === "light" ? "rgb(5, 72, 117)" : "rgb(9, 150, 245)"}}>
              Home
            </NavLink>
          </li>
          <li className="NavbarElement">
            <NavLink className="link" to="/home/dashboard" onClick={menuCloseHandler} style={{color: themeCtx.theme === "light" ? "rgb(5, 72, 117)" : "rgb(9, 150, 245)"}}>
              DashBoard
            </NavLink>
          </li>
          <li className="NavbarElement">
          {themeCtx.theme === "light" ? <img src={moon} alt='moon' className="themeIcon" onClick={() => themeCtx.toggleTheme("dark")}/> : <img src={sun} alt='sun' className="themeIcon" onClick={() => themeCtx.toggleTheme("light")}/>}
          </li>
          <li className="Navbutton">
            <div>
              <img src={default_avatar} alt='user_img'  className="avatar" onClick={() => setIsOpen(!isOpen)}/>
            </div>
            {
              isOpen ?
                <div className="profilers">
                  <div onClick={logoutHandler} className="options">Logout</div>
                  <div onClick={prfilePageHandler} className="options">Profile</div>
                </div> : null
            }
          </li>
        </ul>
      </div>
    </>
  );
}

export default Menu;