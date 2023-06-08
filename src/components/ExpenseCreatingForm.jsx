import { useState } from 'react';
import { createExpense } from '@/pages/api/expenses';
import { getUserId } from '@/pages/api/expenses';
import { useUser } from 'hooks/useUser';

export default function CreateExpensePage() {
  const { user } = useUser();

  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category_id, setCategory_id] = useState('');

  // Add other expense fields as needed
  const handleCreateExpense = async (e) => {
    e.preventDefault();

    const expenseData = {
      description,
      amount,
      category_id,
      // Add other expense fields as needed
    };

    const userEmail = user.email;
    const user_id = await getUserId(userEmail);

    try {
      if (user_id !== null) {
        const createdExpense = await createExpense(expenseData, user_id);

        console.log('Expense created:', createdExpense);
        setAmount('');
        setDescription('');
      }
      // Redirect or perform additional actions upon successful creation
    } catch (error) {
      console.error('Expense creation failed:', error.message);
    }
  };

  return (
    <div className="flex justify-center">
      <form onSubmit={handleCreateExpense} className="flex gap-2">
        <input
          className="p-2 rounded"
          type="text"
          placeholder="Title"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          className="p-2 rounded"
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value))}
        />
        <select
          className="p-2 rounded"
          value={category_id}
          onChange={(e) => setCategory_id(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          <option value="1">Food</option>
          <option value="4">Entertainment</option>
          {/* Add more options as needed */}
        </select>
        {/* Add other input fields for expense data */}
        <button type="submit" className="p-2 rounded bg-teal-100">
          Create Expense
        </button>
      </form>
    </div>
  );
}
