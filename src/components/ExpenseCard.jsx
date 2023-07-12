import React from 'react';

const ExpenseCard = ({ expense }) => {
  return (
    <div className="flex gap-2" data-test="item">
      <div className="p-2 bg-orange-300 rounded text-center w-8">
        {expense.description.charAt(0).toUpperCase()}
      </div>
      <div className="flex gap-1">
        <div
          className="bg-neutral-200 p-2 rounded text-left w-64"
          data-test="description"
        >
          {expense.description}
        </div>
        <div
          className="bg-neutral-200 p-2 rounded text-center w-8"
          data-test="amount"
        >
          {expense.amount}
        </div>
        <div className="bg-neutral-200 p-2 rounded text-center w-24">
          {expense.date}
        </div>
      </div>
    </div>
  );
};

export default ExpenseCard;
