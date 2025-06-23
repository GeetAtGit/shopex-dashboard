import React, { createContext, useState, useContext } from 'react';

// 1️⃣ Create the context
const UserContext = createContext({
  user: { name: '', avatarUrl: '' },
  setUser: () => {}
});

// 2️⃣ Build a Provider component
export const UserProvider = ({ children }) => {
  // initialize with whatever static data or localStorage you like
  const [user, setUser] = useState({
    name: 'Gitanjali Kumari',
    avatarUrl: 'https://ui-avatars.com/api/?name=Gitanjali+Kumari'
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// 3️⃣ Custom hook for easy consumption
export const useUser = () => useContext(UserContext);
