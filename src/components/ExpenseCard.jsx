import React from 'react';

const ExpenseCard = ({ expense }) => {
  return (
    <div className="flex">
      <div className="p-2 bg-orange-300 rounded rounded-r-none">
        {expense.description.charAt(0).toUpperCase()}
      </div>
      <div className="flex gap-4 bg-neutral-200 p-2 rounded rounded-l-none">
        <div>{expense.description}</div>
        <p>Amount: {expense.amount}</p>
        <p>Date: {expense.date}</p>
      </div>
    </div>
  );
};

export default ExpenseCard;
