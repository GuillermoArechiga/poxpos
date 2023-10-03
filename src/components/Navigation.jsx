import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
    console.log('navbar:', isAuthenticated)
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await Auth.signOut();
      setIsAuthenticated(false); // Set isAuthenticated to false
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className='bg-indigo-500 p-4 flex justify-between'>
      <div>
        <Link to='/' className='text-white text-2xl font-bold'>
          POXPOS
        </Link>
      </div>
      <div>
        {isAuthenticated ? (
          <button className='text-white mr-4' onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <>
            <Link to='/login' className='text-white mr-4'>
              Login
            </Link>
            <Link to='/register' className='text-white'>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
