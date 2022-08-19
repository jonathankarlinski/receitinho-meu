import React, { createContext } from 'react';

const UserContext = createContext({});

export const UserProvider = () => (
  <div>
    <UserContext.Provider value={ {} } />
  </div>
);

export default UserContext;
