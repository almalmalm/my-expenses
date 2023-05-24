// pages/index.js

import Head from 'next/head';
import { useUser } from '../../hooks/useUser.js';
import Image from 'next/image';
import Link from 'next/link.js';
import { Inter } from '@next/font/google';
import styles from '@/styles/Home.module.css';
import ExpensesList from '@/components/ExpensesList';
import { supabase } from '../../lib/supabase';
import CreateExpensePage from '@/components/ExpenseCreatingForm.jsx';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const { user } = useUser();

  const handleSignout = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signOut();

      if (error) {
        console.error(error.message);
      } else {
        console.log('User sign out', data);
      }
    } catch (error) {
      console.error('Sign out failed:', error.message);
    }
  };

  if (!user) {
    return (
      <>
        <Head>
          <title>My Expenses</title>
          <meta name="description" content="Expenses app." />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
          <h1>My expenses app.</h1>
          <div>If you want to start, login.</div>
          <Link href="/login">Login</Link>
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>My Expenses</title>
        <meta name="description" content="Expenses app." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <ExpensesList />
        <h3>Create new expenses</h3>
        <CreateExpensePage />
        <div>{user.email}</div>
        <button onClick={handleSignout}>Logout</button>
      </main>
    </>
  );
}
