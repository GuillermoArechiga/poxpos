import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
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
    <nav className='bg-indigo-500 p-3 flex justify-between items-center'>
      <div className='flex items-center'>
        <Link to='/' className='text-white text-2xl font-bold'>
          POXPOS
        </Link>
        <Link to='/stores' className='text-white text-2xl font-bold ml-4'>
          Stores
        </Link>
        <Link to='/items' className='text-white text-2xl font-bold ml-4'>
          Items
        </Link>
        <Link to='/category' className='text-white text-2xl font-bold ml-4'>
          Category
        </Link>
        <Link to='/pos' className='text-white text-2xl font-bold ml-4'>
          POS
        </Link>
        <Link to='/shifts' className='text-white text-2xl font-bold ml-4'>
          Shifts
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
