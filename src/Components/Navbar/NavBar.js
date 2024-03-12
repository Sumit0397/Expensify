import React, { useState, useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ImCross } from "react-icons/im";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaRupeeSign } from "react-icons/fa";
import classes from "./navbar.module.css";
import Menu from './Menu';
import AuthContext from '../../Context/auth-context';
import default_avatar from "../Assets/default_avatar.jpg";
import ThemeContext from '../../Context/theme-context';
import sun from "../Assets/sun.png";
import moon from "../Assets/moon2.png";


const NavBar = () => {

    const [isOpen, setIsOpen] = useState(false);

    const authCtx = useContext(AuthContext);
    const themeCtx = useContext(ThemeContext);
    const navigate = useNavigate();

    function handleOpen() {
        setIsOpen(!isOpen);
    }


    const logoutHandler = () => {
        themeCtx.toggleTheme("light");
        authCtx.logout();
        navigate("/", { replace: true })
    }

    const prfilePageHandler = () => {
        navigate("/home/userprofile", { replace: true })
        setIsOpen(false);
    }

    return (
        <>
            <div className={classes.Nav} style={{ backgroundColor: themeCtx.theme === "light" ? "#fff" : "rgb(54, 69, 79)" }}>
                <ul className={classes.NavbarWrapper}>
                    <li className={classes.NavLogo}>
                        <Link style={{ textDecoration: 'none' }} to="/home/welcome">
                            <div style={{ display: "flex", justifyContent: "center", alignItems: 'center', color: themeCtx.theme === "light" ? "rgb(5, 72, 117)" : "rgb(9, 150, 245)" }}>
                                <span style={{ marginTop: "5px" }}><FaRupeeSign size={30} /></span>
                                <span>Expensify</span>
                            </div>
                        </Link>
                    </li>
                    <li className={classes.NavElements}>
                        <NavLink className={classes.Link} to="/home/welcome" style={{ color: themeCtx.theme === "light" ? "rgb(5, 72, 117)" : "rgb(9, 150, 245)", fontWeight: "800", fontSize: "18px" }}>
                            Home
                        </NavLink>
                    </li>
                    <li className={classes.NavElements}>
                        <NavLink className={classes.Link} to="/home/dashboard" style={{ color: themeCtx.theme === "light" ? "rgb(5, 72, 117)" : "rgb(9, 150, 245)", fontWeight: "800", fontSize: "18px" }}>
                            DashBoard
                        </NavLink>
                    </li>
                    <li className={classes.ThemeToggle} >
                        {themeCtx.theme === "light" ? <img src={moon} alt='moon' className={classes.themeIcon} onClick={() => themeCtx.toggleTheme("dark")}/> : <img src={sun} alt='sun' className={classes.themeIcon} onClick={() => themeCtx.toggleTheme("light")}/>}
                    </li>
                    <li className={classes.NavButton}>
                        <div>
                            <img src={default_avatar} alt='user_img' className='avatar' onClick={handleOpen} />
                        </div>
                        {
                            isOpen ?
                                <div className={classes.popup} style={{backgroundColor: themeCtx.theme === "light" ? "#fff" : "rgb(54, 69, 79)"}}>
                                    <div onClick={prfilePageHandler} className={classes.options}>Profile</div>
                                    <div onClick={logoutHandler} className={classes.options}>Logout</div>
                                </div> : null
                        }
                    </li>
                </ul>
                {!isOpen ? (
                    <GiHamburgerMenu onClick={handleOpen} className={classes.Icon} />
                ) : (
                    <ImCross onClick={handleOpen} className={classes.Icon} />
                )}
            </div>
            {isOpen ? <Menu close={setIsOpen} /> : null}
        </>
    )
}

export default NavBar
