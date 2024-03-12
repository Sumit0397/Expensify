
export const monthArray = ["Jan" , "Feb" , "Mar" , "Apr" , "May" , "Jun" , "Jul" , "Aug" , "Sep" , "Oct" , "Nov" , "Dec"];

export const filterIncomeByMonth = (data) => {
    const incomeArray = [];
    for(let i=0; i<monthArray.length; i++){
        incomeArray[i] = checkMonthData(monthArray[i],data,"income");
    }
    return incomeArray;
}

export const filterExpenseByMonth = (data) => {
    const expenseArray = [];
    for(let i=0; i<monthArray.length; i++){
        expenseArray[i] = checkMonthData(monthArray[i],data,"expense");
    }
    return expenseArray;
}

export const filterBalanceByMonth = (data) => {
    const balanceArray = [];
    for(let i=0; i<monthArray.length; i++){
        balanceArray[i] = checkMonthData(monthArray[i] , data , "income") - checkMonthData(monthArray[i] , data , "expense");
    }
    return balanceArray;
}

function checkMonthData(month , data , type){
    return Object.values(data).filter((data) => data.transactionType === type && data.month === month).reduce((acc,curr) => acc + parseFloat(curr.amount) , 0);
}
