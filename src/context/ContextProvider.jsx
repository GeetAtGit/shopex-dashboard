// src/context/ContextProvider.jsx
import React, { createContext, useContext, useState } from 'react';

// 1) Create contexts
const UserContext      = createContext();
const DashboardContext = createContext();

// 2) Single AppProvider
export const AppProvider = ({ children }) => {
  // --- User state ---
  const [user, setUser] = useState({
    name:      'Gitanjali Kumari',
    avatarUrl:'https://ui-avatars.com/api/?name=Gitanjali+Kumari'
  });

  // --- Dashboard mock data ---
  const [stats] = useState([
    { label: 'Total Users',   value: 1240 },
    { label: 'Active Users',  value: 987  },
    { label: 'Total Orders',  value: 532  },
    { label: 'Revenue (USD)', value: 10345 }
  ]);
  const [salesTrend] = useState([
    { month: 'Jan', sales: 4000 },
    { month: 'Feb', sales: 3000 },
    { month: 'Mar', sales: 5000 },
    { month: 'Apr', sales: 4200 },
    { month: 'May', sales: 5500 },
    { month: 'Jun', sales: 4800 }
  ]);
  const [users] = useState([
    { id: 1, name: 'Alice Johnson',   role: 'Admin',  lastLogin: '2025-06-20' },
    { id: 2, name: 'Bob Smith',       role: 'Editor', lastLogin: '2025-06-19' },
    { id: 3, name: 'Charlie Brown',   role: 'Viewer', lastLogin: '2025-06-18' },
    { id: 4, name: 'Diana Prince',    role: 'Editor', lastLogin: '2025-06-17' },
    { id: 5, name: 'Evan Davis',      role: 'Viewer', lastLogin: '2025-06-16' }
  ]);
  const [orders] = useState([
    { orderId: 1001, customer: 'Alice Johnson',   amount: 250.0,  status: 'Shipped'   },
    { orderId: 1002, customer: 'Bob Smith',       amount: 125.5,  status: 'Pending'   },
    { orderId: 1003, customer: 'Charlie Brown',   amount: 320.0,  status: 'Delivered' },
    { orderId: 1004, customer: 'Diana Prince',    amount: 450.75, status: 'Cancelled' },
    { orderId: 1005, customer: 'Evan Davis',      amount: 89.99,  status: 'Processing'}
  ]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <DashboardContext.Provider value={{ stats, salesTrend, users, orders }}>
        {children}
      </DashboardContext.Provider>
    </UserContext.Provider>
  );
};

// 3) Hooks to consume
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within AppProvider');
  return context;
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) throw new Error('useDashboard must be used within AppProvider');
  return context;
};
