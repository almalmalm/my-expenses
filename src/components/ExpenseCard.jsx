import React from 'react';
import styles from '../styles/Home.module.css';

const ExpenseCard = ({ expense }) => {
  const getRandomColorClass = () => {
    const colors = ['blue', 'green', 'red', 'yellow', 'purple'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    return styles[`expense-card-${randomColor}`];
  };

  return (
    <div className={`${styles['expense-card']} ${getRandomColorClass()}`}>
      <div className={styles['expense-card-header']}>
        {expense.description.charAt(0).toUpperCase()}
      </div>
      <div className={styles['expense-card-content']}>
        <div className={styles['expense-card-title']}>
          {expense.description}
        </div>
        <p className={styles['expense-card-text']}>Amount: {expense.amount}</p>
        <p className={styles['expense-card-text']}>Date: {expense.date}</p>
        {/* Add additional information you want to display */}
      </div>
    </div>
  );
};

export default ExpenseCard;
