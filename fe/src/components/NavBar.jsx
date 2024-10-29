import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function NavBar({ onLogout }) {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 shadow-lg">
      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          <Link
            to="/posts"
            className="text-white hover:bg-blue-500 hover:text-gray-100 px-4 py-2 rounded transition duration-200"
          >
            Posts
          </Link>
          <Link
            to="/notifications"
            className="text-white hover:bg-blue-500 hover:text-gray-100 px-4 py-2 rounded transition duration-200"
          >
            Notifications
          </Link>
        </div>
        <button
          onClick={onLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md font-semibold transition duration-200"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}


NavBar.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default NavBar;
