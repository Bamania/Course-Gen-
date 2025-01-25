import React, { useState } from 'react';
import { User, Mail, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send POST request to backend signup route
      const response = await axios.post('http://localhost:5000/api/auth/signup', {
        name,
        email,
        password,
      });

      if (response.status === 201) {
        alert('Account created successfully!');
        navigate('/signin'); // Redirect to sign-in page
      }
    } catch (error) {
      console.error(error);
      // Handle errors
      setErrorMessage(error.response?.data?.error || 'An error occurred. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="Full name"
            required
          />
        </div>
      </div>
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
      {errorMessage && (
        <div className="text-red-500 text-sm">
          {errorMessage}
        </div>
      )}
      <div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg py-3 font-medium hover:opacity-90 transition-opacity"
        >
          Create account
        </button>
      </div>
      <div className="text-center">
        <button
          type="button"
          onClick={() => navigate('/signin')}
          className="text-gray-400 hover:text-cyan-500 transition-colors"
        >
          Already have an account? Sign in
        </button>
      </div>
    </form>
  );
}