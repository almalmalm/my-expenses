import { useEffect, useState } from 'react';
import ExpenseCard from './ExpenseCard';
import { getExpenses } from '@/pages/api/expenses';
import { useUser } from '../../hooks/useUser.js';
import { supabase } from '../../lib/supabase';

export default function ExpenseList() {
  const { user } = useUser();
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      if (user) {
        const userEmail = user.email;
        let userId = await supabase
          .from('users')
          .select('id')
          .eq('email', userEmail);
        userId = userId.data.find((user) => user.id).id;
        const expenses = await getExpenses(userId);
        setExpenses(expenses);
      }
    };

    fetchExpenses();
  }, [user]);

  return (
    <div>
      <h2>Expense List</h2>
      <div>
        {expenses.map((expense) => (
          <ExpenseCard key={expense.id} expense={expense} />
        ))}
      </div>
    </div>
  );
}
