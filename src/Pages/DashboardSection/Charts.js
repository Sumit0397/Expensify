import React, { useContext, useEffect, useState } from 'react';
import { Bar } from "react-chartjs-2";
import { Chart as Chartjs, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from '../../Config/firebase';
import { filterBalanceByMonth, filterExpenseByMonth, filterIncomeByMonth, monthArray } from './data';
import ThemeContext from '../../Context/theme-context';

const db = getDatabase(app);

Chartjs.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Charts = () => {

    const [incomeData, setIncomeData] = useState([]);
    const [expenseData, setExpenseData] = useState([]);
    const [balanceData, setBalanceData] = useState([]);

    const uid = localStorage.getItem("user");
    const themeCtx = useContext(ThemeContext);

    useEffect(() => {
        onValue(ref(db, `user/${uid}/transaction`), (snapShot) => {
            const data = snapShot.val();
            if (data) {
                console.log(data);
                setIncomeData(filterIncomeByMonth(data));
                setBalanceData(filterBalanceByMonth(data));
                setExpenseData(filterExpenseByMonth(data));
            }
        })
    }, [])

    const data = {
        labels: monthArray,
        datasets: [
            {
                label: 'income',
                data: incomeData,
                backgroundColor: "rgb(54, 162, 235)",
                borderColor: 'black',
                borderWidth: 1
            },
            {
                label: 'expense',
                data: expenseData,
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: 'black',
                borderWidth: 1
            },
            {
                label: 'balance',
                data: balanceData,
                backgroundColor: "orange",
                borderColor: 'black',
                borderWidth: 1
            },
        ]
    }

    const options = {
        responsive : true,
        maintainAspectRation : false,
        scales: {
            x: {
                grid: {
                    color: `${themeCtx.theme === "light" ? "#000" : "#fff"}` // Change the color of x-axis grid lines
                },
                ticks: {
                    color: `${themeCtx.theme === "light" ? "#000" : "#fff"}`, // Change the color of x-axis labels
                },
            },
            y: {
                grid: {
                    color: `${themeCtx.theme === "light" ? "#000" : "#fff"}`, // Change the color of y-axis grid lines
                },
                ticks: {
                    color: `${themeCtx.theme === "light" ? "#000" : "#fff"}`, // Change the color of y-axis labels
                },
            },
        },
        plugins: {
            legend: {
                labels: {
                    color: `${themeCtx.theme === "light" ? "#000" : "#fff"}`, 
                }
            },
        },
    }

    return (
        <>
            <div>
                <Bar data={data} options={options}></Bar>
            </div>
        </>
    )
}

export default Charts
