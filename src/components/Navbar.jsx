// src/components/Navbar.jsx
import React from 'react';
import { FaBell, FaComments, FaUserCircle } from 'react-icons/fa';
import { useUser } from '../context/ContextProvider';
import logo from '../assets/logo.png';

const Navbar = () => {
  const { user } = useUser();
  // If user.avatarUrl is an empty string, we coalesce it to undefined
  const avatarSrc = user.avatarUrl || undefined;

  return (
    <nav className="flex items-center justify-between px-4 py-2 bg-bg text-fg border-b border-muted transition-colors">
      {/* Logo + company */}
      <div className="flex items-center space-x-3">
        <img src={logo} alt="Logo" className="h-8 w-8 object-contain" />
        <span className="text-xl font-semibold">Shopex</span>
      </div>

      {/* Controls */}
      <div className="flex items-center space-x-4">
        {/* Greeting */}
        <span className="hidden sm:inline-block text-lg">
          Hello, <span className="font-medium">{user.name}</span>
        </span>

        {/* Avatar or fallback icon */}
        {avatarSrc ? (
          <img
            src={avatarSrc}
            alt={`${user.name}’s avatar`}
            className="h-8 w-8 rounded-full object-cover"
          />
        ) : (
          <FaUserCircle className="h-8 w-8 text-muted" />
        )}

        {/* Notifications */}
        <button
          className="p-2 rounded-full hover:bg-secondary hover:dark:bg-secondary transition-colors"
          aria-label="Notifications"
        >
          <FaBell className="text-lg" />
        </button>

        {/* Chat */}
        <button
          className="p-2 rounded-full hover:bg-secondary hover:dark:bg-secondary transition-colors"
          aria-label="Messages"
        >
          <FaComments className="text-lg" />
        </button>

        {/* Theme switch */}
    
      </div>
    </nav>
  );
};

export default Navbar;
