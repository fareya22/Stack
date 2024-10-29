import { useState } from 'react';
import PropTypes from 'prop-types';

function Auth({ setToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      const res = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        alert('Signup successful');
      } else {
        const errorData = await res.json();
        alert(errorData.message || 'Signup failed. Please try again.');
      }
    } catch (error) {
      alert('An error occurred during sign-up: ' + error.message);
    }
  };

  const handleSignIn = async () => {
    try {
      const res = await fetch('http://localhost:3000/signIn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        setToken(data.token);
        alert('Sign-in successful');
      } else {
        const errorData = await res.json();
        alert(errorData.message || 'Sign-in failed. Please check your credentials.');
      }
    } catch (error) {
      alert('An error occurred during sign-in: ' + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold text-blue-500 mb-6 text-center">
          Stack Overflow
        </h1>
        <div className="w-full">
          <input
            type="email"
            placeholder="Email"
            className="block w-full p-3 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-400"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="block w-full p-3 mb-6 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-400"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button
            onClick={handleSignUp}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold mb-4 shadow-md transition duration-200"
          >
            Sign Up
          </button>
          <button
            onClick={handleSignIn}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold shadow-md transition duration-200"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
  
}

Auth.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Auth;