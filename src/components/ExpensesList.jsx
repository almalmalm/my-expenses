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
    <div className="mt-8">
      <div className="flex justify-center mb-8">
        <h1
          className="text-2xl uppercase bg-emerald-100 inline-block p-2 rounded-md"
          data-test="title-account-page"
        >
          Expenses
        </h1>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col gap-2" data-test="list">
          {expenses.map((expense) => (
            <ExpenseCard key={expense.id} expense={expense} />
          ))}
        </div>
      </div>
    </div>
  );
  s;
}
