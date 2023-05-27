import React from 'react';

const ExpenseCard = ({ expense }) => {
  return (
    <div>
      <div>{expense.description.charAt(0).toUpperCase()}</div>
      <div>
        <div>{expense.description}</div>
        <p>Amount: {expense.amount}</p>
        <p>Date: {expense.date}</p>
      </div>
    </div>
  );
};

export default ExpenseCard;
