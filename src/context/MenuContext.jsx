import React, { createContext, useContext, useState } from 'react';

const MenuContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useMenu = () => useContext(MenuContext);

export const MenuProvider = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <MenuContext.Provider value={{ isMenuOpen, setIsMenuOpen }}>
      {children}
    </MenuContext.Provider>
  );
};
