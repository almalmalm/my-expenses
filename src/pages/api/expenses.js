import { supabase } from '../../../lib/supabase';

export const getExpenses = async (userId) => {
  const { data, error } = await supabase
    .from('expenses')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const createExpense = async (expenseData, userId) => {
  const currentDate = new Date();
  expenseData.date = currentDate.toISOString();

  expenseData.user_id = userId; // Add the user ID to the expense data
  const { data, error } = await supabase.from('expenses').insert([expenseData]);

  if (error) {
    throw new Error(error.message);
  }

  return data[0];
};

export const getUserId = async (userEmail) => {
  const { data, error } = await supabase
    .from('users')
    .select('id')
    .eq('email', userEmail);
  const user_id = data.find((user) => user.id).id;
  if (error) {
    throw new Error(error.message);
  }

  return user_id;
};
