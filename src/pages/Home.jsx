import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/AuthContext'; // Import useAuth from your context

const HomePage = () => {
  const { isAuthenticated } = useAuth(); // Use useAuth hook to access isAuthenticated

  return (
    <div className='h-screen flex flex-col justify-center items-center bg-gradient-to-b from-blue-400 to-blue-700 text-white'>
      <div>
        <img src='./logopox.png' className='my-4' alt='Logo' />
      </div>
      <h1 className='text-4xl font-semibold mb-4'>Site Under Construction</h1>
      <div className='space-x-4'>
        <button>
          {isAuthenticated ? (
            <Link
              to='/dashboard' // You can replace this with the appropriate route
              className='group relative w-full flex justify-center py-2 px-6 border border-transparent font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
            >
              Enter
            </Link>
          ) : (
            <Link
              to='/login' // You can replace this with the appropriate route
              className='group relative w-full flex justify-center py-2 px-6 border border-transparent font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
            >
              Login
            </Link>
          )}
        </button>
      </div>
    </div>
  );
};

export default HomePage;
