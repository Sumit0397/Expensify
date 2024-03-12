import React, { useEffect, useState } from 'react'
import { Chart, ArcElement ,CategoryScale , LinearScale, Tooltip, Legend} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from '../../Config/firebase';
import classes from "./PieChart.module.css";

const db = getDatabase(app);

Chart.register(ArcElement , CategoryScale , LinearScale, Tooltip, Legend );

const PieChart = () => {
    const [income, setIncome] = useState(0);
    const [expense, setExpense] = useState(0);
    const [incomePercentage, setIncomePercentage] = useState(0);
    const [expensePercentage, setExpensePercentage] = useState(0);

    const uid = localStorage.getItem("user");

    useEffect(() => {
        onValue(ref(db, `user/${uid}/transaction`), (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const incomeTransactions = Object.values(data).filter(transaction => transaction.transactionType === "income");
                const expenseTransactions = Object.values(data).filter(transaction => transaction.transactionType === "expense");

                const totalIncome = incomeTransactions.reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0);
                const totalExpense = expenseTransactions.reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0);

                setIncome(totalIncome);
                setExpense(totalExpense);
            } else {
                setIncome(0);
                setExpense(0);
            }
        })
    }, [])

    const config = {
        data: {
            labels: [
                "Income",
                "Expense"
            ],
            datasets: [{
                label: 'Amount',
                data: [income, expense],
                backgroundColor: [
                    'rgb(54, 162, 235)',
                    'rgb(255, 99, 132)'
                ],
                hoverOffset: 4,
                borderRadius: 30,
                spacing: 10
            }]
        },
        options: {
            cutout: 80,
            responsive : true,
            maintainAspectRatio : true,
            plugins: {
                legend: {
                    labels: {
                        color: 'white',
                    }
                }
            }
        }
    }

    useEffect(() => {
        if (income !== 0) {
            let incomepercent = ((income * 100) / (income + expense)).toFixed(2);
            setIncomePercentage(incomepercent);
        }
        if (expense !== 0) {
            let expensepercent = ((expense * 100) / (income + expense)).toFixed(2);
            setExpensePercentage(expensepercent);
        }
    }, [income, expense])


    return (
        <div className={classes.piechart}>
            <Doughnut {...config}></Doughnut>
            <div>
                <p className={classes.incomePercent}>Income: {incomePercentage}%</p>
                <p className={classes.expensePercent}>Expense: {expensePercentage}%</p>
            </div>
        </div>
    )
}

export default PieChart
