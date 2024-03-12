import React, { useContext, useEffect, useState } from 'react'
import Charts from './Charts'
import classes from "./Dashboard.module.css";
import ThemeContext from '../../Context/theme-context';
import { getDatabase , ref , onValue} from "firebase/database";
import { app } from '../../Config/firebase';

const db = getDatabase(app);

const Dashboard = () => {

  const [income , setIncome] = useState(0.00);
  const [expense , setExpense] = useState(0.00);
  const [balance , setBalance] = useState(0.00);

  const themeCtx = useContext(ThemeContext);
  const uid = localStorage.getItem("user");

  useEffect(() => {
    onValue(ref(db , `user/${uid}/transaction`) , (snapshot) => {
      const data = snapshot.val();
      if(data){
        const incomeTransaction = Object.values(data).filter((item) => item.transactionType === "income");
        const totalIncome = incomeTransaction.reduce((acc , data) => acc + parseFloat(data.amount) , 0);
        setIncome(totalIncome);

        const expenseTransaction = Object.values(data).filter((item) => item.transactionType === "expense");
        const totalExpense = expenseTransaction.reduce((acc , data) => acc + parseFloat(data.amount) , 0);
        setExpense(totalExpense);

        setBalance(totalIncome-totalExpense);
      }
    })
  },[income , expense , balance])
  
  console.log(income , expense , balance);

  useEffect(() => {
    window.scrollTo(0,0);
  }, [])

  return (
    <div className={classes.parentContainer} style={{ backgroundColor: themeCtx.theme === "light" ? "#fff" : "rgb(25, 25, 112)"}}>
      <div className={classes.childContainer}>
        <div>
          <h1>Total Balance: &#8377;{balance}</h1>
          <h1>Total Income: &#8377;{income}</h1>
          <h1>Total Expense: &#8377;{expense}</h1>
        </div>
        <div className={classes.chart} style={{backgroundColor: themeCtx.theme === "light" ? "#89CFF0" : "rgb(54, 69, 79)"}}>
          <Charts />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
