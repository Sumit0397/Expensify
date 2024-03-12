import React, { useContext, useState } from 'react';
import { getDatabase, set, ref } from "firebase/database";
import { app } from '../../Config/firebase';
import classes from "./TransactionForm.module.css";
import ThemeContext from '../../Context/theme-context';

const db = getDatabase(app);

const TransactionForm = () => {
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [transactionType, setTransactionType] = useState("expense");
    const [selectedDate, setSelectedDate] = useState(new Date());

    const themeCtx = useContext(ThemeContext);

    const uid = localStorage.getItem("user");
    const currentYear = new Date().getFullYear();
    const minDate = `${currentYear}-01-01`;
    const currTime = new Date();

    const formatDayWithSuffix = (day) => {
        if (day >= 11 && day <= 13) {
            return `${day}th`;
        }
        switch (day % 10) {
            case 1:
                return `${day}st`;
            case 2:
                return `${day}nd`;
            case 3:
                return `${day}rd`;
            default:
                return `${day}th`;
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();

        const formattedMonth = selectedDate.toLocaleString('default', { month: 'short' });
        const formattedDay = formatDayWithSuffix(selectedDate.getDate());

        set(ref(db, `user/${uid}/transaction/${currTime}`), {
            description: description,
            amount: amount,
            transactionType: transactionType,
            time: `${formattedDay} ${formattedMonth}`,
            month: formattedMonth
        }).then(() => {
            setDescription("");
            setAmount("");
            setTransactionType("expense");
            setSelectedDate(new Date());
        })
    }

    return (
        <form onSubmit={submitHandler} className={classes.formContainer} style={{backgroundColor : themeCtx.theme === "light" ? "aquamarine" : "#0066b2"}}>
            <div>
                <label>Description:</label>
                <input
                    type='text'
                    placeholder='description'
                    value={description}
                    required
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div>
                <label>Amount:</label>
                <input
                    type='number'
                    placeholder='amount'
                    value={amount}
                    required
                    onChange={(e) => setAmount(e.target.value)}
                />
            </div>
            <div>
                <label>Date:</label>
                <input
                    type="date"
                    value={selectedDate.toISOString().split('T')[0]}
                    min={minDate}
                    max={`${currentYear}-12-31`}
                    onChange={(e) => setSelectedDate(new Date(e.target.value))}
                />
            </div>
            <div className={classes.checkBox}>
                <input
                    type='checkbox'
                    value="expense"
                    id='expense'
                    name='expense'
                    checked={transactionType === "expense"}
                    onChange={(e) => setTransactionType(e.target.value)}
                />
                <label htmlFor='expense'>Expense</label>

                <input
                    type='checkbox'
                    value="income"
                    id='income'
                    name='income'
                    checked={transactionType === "income"}
                    onChange={(e) => setTransactionType(e.target.value)}
                />
                <label htmlFor='income'>Income</label>
            </div>
            <div className={classes.transactionBtn}>
                <button type='submit' className={classes.btn} style={{color : '#fff' , backgroundColor : themeCtx.theme === "dark" ? "rgb(25, 25, 112)" : "#0066b2"}}>Add Transaction</button>
            </div>
        </form>
    )
}

export default TransactionForm
