import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import Link from 'next/link.js';
import { Inika } from '@next/font/google';

const inika = Inika({ subsets: ['latin'], weight: '400' });

export default function Registration() {
  const [emailregister, setEmailregister] = useState('');
  const [passwordregister, setPasswordregister] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signUp({
        email: emailregister,
        password: passwordregister,
      });

      if (error) {
        console.error(error.message);
        alert(error.message);
      } else {
        console.log('User sign up:', data.user);
        await supabase
          .from('users')
          .insert([{ email: emailregister, password: passwordregister }]);
        setEmailregister('');
        setPasswordregister('');
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Sign up failed:', error.message);
    }
  };

  return (
    <main className={inika.className}>
      <div className="bg-gradient-to-br from-cyan-500 to-blue-500 w-screen h-screen">
        <div className="mx-16">
          <Link href="/">
            <button className="bg-teal-100 p-2 rounded-md mt-8 mb-32">
              Back
            </button>
          </Link>
          <div className="flex flex-col gap-8">
            <div className="flex justify-center">
              <h1 className="text-2xl uppercase bg-emerald-100 inline-block p-2 rounded-md">
                Registration Page
              </h1>
            </div>
            <form
              onSubmit={handleSignup}
              className="flex flex-col gap-8 justify-center"
            >
              <input
                type="email"
                placeholder="Email"
                value={emailregister}
                onChange={(e) => setEmailregister(e.target.value)}
                className="p-2 rounded-md bg-amber-100 w-1/2 text-center mx-auto"
              />
              <input
                type="password"
                placeholder="Password"
                value={passwordregister}
                onChange={(e) => setPasswordregister(e.target.value)}
                className="p-2 rounded-md bg-amber-100 w-1/2 text-center mx-auto"
              />
              <button
                type="submit"
                className="bg-teal-100 p-2 rounded-md w-1/4 mx-auto"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
