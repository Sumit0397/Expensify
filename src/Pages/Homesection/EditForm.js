import React, { useContext, useState } from 'react';
import { getDatabase, set, ref } from "firebase/database";
import { app } from '../../Config/firebase';
import Modal from '../../Components/UI/Modal';
import classes from "./EditForm.module.css";
import ThemeContext from '../../Context/theme-context';

const db = getDatabase(app)

const Editform = ({ selectedTransaction, selectedTransactionKey, openEdit }) => {


    const [description, setDescription] = useState(selectedTransaction ? selectedTransaction.description : "");
    const [amount, setAmount] = useState(selectedTransaction ? selectedTransaction.amount : "");
    const [transactionType, setTransactionType] = useState(selectedTransaction ? selectedTransaction.transactionType : "expense");

    const uid = localStorage.getItem("user");
    const themeCtx = useContext(ThemeContext);

    const submitHandler = (e) => {
        e.preventDefault();

        set(ref(db, `user/${uid}/transaction/${selectedTransactionKey}`), {
            description: description,
            amount: amount,
            transactionType: transactionType,
            time: selectedTransaction.time
        }).then(() => {
            setDescription("");
            setAmount("");
            setTransactionType("expense");
            openEdit(false)
        })
    }

    return (
        <Modal>
            <form onSubmit={submitHandler} className={classes.formContainer} style={{backgroundColor : themeCtx.theme === "light" ? "#0066b2" : "rgb(54, 69, 79)" , color : "#fff"}}>
                <div className={classes.firstDiv}>
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
                </div>
                <div className={classes.checkBoxes}>
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
                <div className={classes.btns}>
                    <button type='submit'className={classes.updateBtn}>Update Transaction</button>
                    <button onClick={() => openEdit(false)} className={classes.closeBtn}>Close</button>
                </div>
            </form>
        </Modal>
    )
}

export default Editform
