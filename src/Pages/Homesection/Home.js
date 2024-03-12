import React, { useContext, useEffect } from 'react'
import classes from "./Home.module.css";
import ThemeContext from '../../Context/theme-context';
import TransactionForm from './TransactionForm';
import PieChart from './PieChart';
import TransactionHistory from './TransactionHistory';


const Home = () => {

  const themeCtx = useContext(ThemeContext);

  useEffect(() => {
    window.scrollTo(0,0);
  },[])

  return (
    <div className={classes.homeContainer} style={{ backgroundColor: themeCtx.theme === "light" ? "#fff" : "rgb(25, 25, 112)" }}>
      <div className={classes.transactionContainer} style={{ backgroundColor: themeCtx.theme === "light" ? "#0066b2" : "rgb(54, 69, 79)" }}>
        <div className={classes.transactionForm}>
          <TransactionForm />
        </div>
        <div className={classes.pieChart}>
          <PieChart/>
        </div>
      </div>
      <div className={classes.transactionHistory} style={{ backgroundColor: themeCtx.theme === "light" ? "#0066b2" : "rgb(54, 69, 79)" }}>
        <TransactionHistory/>
      </div>
    </div>
  )
}

export default Home
