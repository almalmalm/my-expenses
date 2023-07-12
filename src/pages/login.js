import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import Link from 'next/link.js';
import { Inika } from '@next/font/google';

const inika = Inika({ subsets: ['latin'], weight: '400' });

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { user, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error(error.message);
        alert(error.message);
      } else {
        console.log('User logged in:', user);
        window.location.href = '/';
        // Redirect or perform additional actions upon successful login
      }
    } catch (error) {
      console.error('Login failed:', error.message);
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
              <h1
                className="text-2xl uppercase bg-emerald-100 inline-block p-2 rounded-md"
                data-test="title-login-page"
              >
                Login Page
              </h1>
            </div>
            <form
              onSubmit={handleLogin}
              className="flex flex-col gap-8 justify-center"
            >
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 rounded-md bg-amber-100 w-1/2 text-center mx-auto"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-2 rounded-md bg-amber-100 w-1/2 text-center mx-auto"
              />
              <button
                type="submit"
                className="bg-teal-100 p-2 rounded-md w-1/4 mx-auto"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
