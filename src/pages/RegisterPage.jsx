import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerificationCodeInput, setShowVerificationCodeInput] =
    useState(false);

  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      if (!showVerificationCodeInput) {
        await Auth.signUp({
          username,
          password, // Use the password state variable
          attributes: {
            email,
          },
        });
        setShowVerificationCodeInput(true);
        toast.success('Registration successful! Please check your email for a verification code.');
      } else {
        await confirmSignUp();
        // Redirect or handle successful registration here
        navigate('/login');
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  async function confirmSignUp() {
    try {
      await Auth.confirmSignUp(username, verificationCode);
      // Redirect or handle successful confirmation here
      toast.success('Registration confirmed. You can now login.');
    } catch (error) {
      console.log('Error confirming sign up', error);
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <div>
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            Create an account
          </h2>
        </div>
        <form className='mt-8 space-y-6' onSubmit={handleRegistration}>
          <input
            type='text'
            autoComplete='username'
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
            placeholder='Username'
          />
          <input
            type='email'
            autoComplete='email'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
            placeholder='Email'
          />
          <input
            type='password'
            autoComplete='new-password'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
            placeholder='Password'
          />
          {showVerificationCodeInput && (
            <input
              type='text'
              required
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className='appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
              placeholder='Verification Code'
            />
          )}
          <div>
            <button
              type='submit'
              className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              {showVerificationCodeInput ? 'Verify' : 'Sign up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
