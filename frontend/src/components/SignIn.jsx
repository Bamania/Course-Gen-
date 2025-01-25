import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State to track error messages
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear any previous error messages

    try {
      const response = await axios.post('http://localhost:5000/api/auth/signin', {
        email,
        password,
      });

      // Handle success - you could store the token in localStorage or a cookie
      const { token } = response.data;
      localStorage.setItem('token', token);

      // Redirect to a protected route (e.g., dashboard)
      navigate('/dashboard');
    } catch (error) {
      // Handle errors (e.g., invalid credentials or server errors)
      if (error.response && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errorMessage && (
        <div className="bg-red-500 text-white text-center py-2 rounded-md">
          {errorMessage}
        </div>
      )}
      <div>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="Email address"
            required
          />
        </div>
      </div>
      <div>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="Password"
            required
          />
        </div>
      </div>
      <div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg py-3 font-medium hover:opacity-90 transition-opacity"
        >
          Sign in
        </button>
      </div>
      <div className="text-center">
        <button
          type="button"
          onClick={() => navigate('/signup')}
          className="text-gray-400 hover:text-cyan-500 transition-colors"
        >
          Don't have an account? Sign up
        </button>
      </div>
    </form>
  );
}