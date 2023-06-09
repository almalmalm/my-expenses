// pages/index.js

import Head from 'next/head';
import { useUser } from '../../hooks/useUser.js';
import Link from 'next/link.js';
import { Inika } from '@next/font/google';
import ExpensesList from '@/components/ExpensesList';
import { supabase } from '../../lib/supabase';
import CreateExpensePage from '@/components/ExpenseCreatingForm.jsx';

const inika = Inika({ subsets: ['latin'], weight: '400' });

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
          <meta name="description" content="My expenses app." />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={inika.className}>
          <div className="bg-gradient-to-br from-cyan-500 to-blue-500 w-screen h-screen">
            <div className="mx-16 flex flex-col gap-32">
              <div className="flex justify-end gap-8 text-base my-8">
                <Link href="/login">
                  <button
                    className="bg-teal-100 p-2 rounded-md"
                    data-test="sign-in"
                  >
                    Sign in
                  </button>
                </Link>
                <Link href="/registration">
                  <button
                    className="bg-teal-100 p-2 rounded-md"
                    data-test="sign-up"
                  >
                    Sign up
                  </button>
                </Link>
              </div>
              <div className="flex flex-col gap-8" data-test="information">
                <div className="flex justify-center">
                  <h1
                    className="text-2xl uppercase bg-emerald-100 inline-block p-2 rounded-md"
                    data-test="title"
                  >
                    My expenses
                  </h1>
                </div>
                <div className="flex justify-center">
                  <p
                    className="text-xl bg-amber-100 rounded-md inline-block p-2"
                    data-test="description"
                  >
                    You can track your money expenses, view monthly statistics
                    and more.
                  </p>
                </div>
              </div>
            </div>
          </div>
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
      <main className={inika.className}>
        <div className="bg-gradient-to-br from-cyan-500 to-blue-500 w-screen h-screen">
          <div className="mx-16 flex flex-col">
            <ExpensesList />
            <div className="flex justify-center my-8">
              <h2 className="text-2xl uppercase bg-emerald-100 inline-block p-2 rounded-md">
                Create new expenses
              </h2>
            </div>
            <CreateExpensePage />
            <div className="flex flex-col gap-2 absolute bottom-8 left-16">
              <div
                className="bg-zinc-200 p-2 rounded w-fit"
                data-test="user-email"
              >
                {user.email}
              </div>
              <button
                onClick={handleSignout}
                className="bg-orange-300 p-2 rounded w-fit"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
