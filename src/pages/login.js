import { useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
      } else {
        console.log('User sign up:', data.user);
        await supabase
          .from('users')
          .insert([{ email: emailregister, password: passwordregister }]);
      }
      setEmailregister('');
      setPasswordregister('');
    } catch (error) {
      console.error('Sign up failed:', error.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { user, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error(error.message);
      } else {
        console.log('User logged in:', user);
        // Redirect or perform additional actions upon successful login
      }

      window.location.href = '/';
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <div>Login</div>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <div>Registration</div>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          value={emailregister}
          onChange={(e) => setEmailregister(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={passwordregister}
          onChange={(e) => setPasswordregister(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
