import React, { useContext, useEffect, useState } from 'react';
import classes from "./TransactionHistory.module.css";
import { getDatabase, onValue, ref, remove } from "firebase/database";
import { app } from '../../Config/firebase';
import EditForm from './EditForm';
import ThemeContext from '../../Context/theme-context';


const db = getDatabase(app);

const TransactionHistory = () => {
    const [transactionData, setTransactionData] = useState(null);
    const [selectedTransaction, setSelecetedTransaction] = useState(null);
    const [selectedTransactionKey, setSelecetedTransactionKey] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const themeCtx = useContext(ThemeContext);
    const uid = localStorage.getItem("user");

    useEffect(() => {
        onValue(ref(db, `user/${uid}/transaction`), (snapShot) => {
            const data = snapShot.val();
            if (data) {
                setTransactionData(data);
            } else {
                setTransactionData(null);
            }
        })
    }, [])


    const onDelete = (key) => {
        const transactionRef = ref(db, `user/${uid}/transaction/${key}`);

        remove(transactionRef)
            .then(() => {
                onValue(transactionRef, (snapShot) => {
                    const data = snapShot.val();
                    if (!data) {
                        const updatedData = { ...transactionData };
                        delete updatedData[key];
                        setTransactionData(updatedData);
                    }
                });
            })
            .catch((error) => {
                console.error("Error deleting transaction:", error);
            });
    };


    const onEdit = (key) => {
        const selectedTransactionData = transactionData[key];
        setSelecetedTransaction(selectedTransactionData);
        setSelecetedTransactionKey(key);
        setIsOpen(true);
    }

    return (
        <div className={classes.mainContainer}>
            <h1>Transactions History</h1>
            <div className={classes.historyContainer} style={{backgroundColor : themeCtx.theme === "light" ? "aquamarine" : "#0066b2"}}>
                {
                    transactionData ?
                        Object.entries(transactionData).reverse().map(([key, value]) => (
                            <div key={key} className={classes.singleHistory} style={{ backgroundColor: value.transactionType === "income" ? "rgb(54, 162, 235)" : "rgb(255, 99, 132)" }}>
                                <p className={classes.dateSpan}>{value.time}</p>
                                <p className={classes.description}>{value.description.toUpperCase()}</p>
                                <p className={classes.amount}>&#8377;{value.amount}</p>
                                <div className={classes.btns}>
                                    <button onClick={() => onDelete(key)}>Delete</button>
                                    <button onClick={() => onEdit(key)}>Edit</button>
                                </div>
                            </div>
                        )) : null
                }
            </div>

            {
                isOpen &&
                <EditForm
                    selectedTransaction={selectedTransaction}
                    selectedTransactionKey={selectedTransactionKey}
                    openEdit={setIsOpen}
                />


            }

        </div>
    )
}

export default TransactionHistory
