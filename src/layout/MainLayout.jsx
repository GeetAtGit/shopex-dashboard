// src/layout/MainLayout.jsx
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

const user = {
  name: 'Gitanjali Kumari',
  avatarUrl: 'https://ui-avatars.com/api/?name=Gitanjali+Kumari'
};

export default function MainLayout() {
  // Open on desktop, collapse on mobile by default
  const [sidebarOpen, setSidebarOpen] = useState(() =>
    window.matchMedia('(min-width: 768px)').matches
  );
  const toggleSidebar = () => setSidebarOpen(o => !o);

  // Auto‐open/close when resizing across the 768px breakpoint
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const handle = e => setSidebarOpen(e.matches);
    mq.addEventListener('change', handle);
    return () => mq.removeEventListener('change', handle);
  }, []);

  return (
    <div className="flex h-screen bg-bg text-fg transition-colors">
      <Sidebar isOpen={sidebarOpen} toggle={toggleSidebar} />

      <div className="flex-1 flex flex-col bg-bg">
        <Navbar userName={user.name} userAvatar={user.avatarUrl} />

        {/* Hamburger on mobile */}
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 m-2 bg-white dark:bg-gray-800 rounded shadow z-20 self-start"
          aria-label="Toggle sidebar"
        >
          <FaBars size={24} />
        </button>

        <main className="main-content flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
