import { createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const NavigatorContext = createContext();

export const NavigatorProvider = ({ children }) => {
  const navigate = useNavigate();

  return (
    <NavigatorContext.Provider value={navigate}>
      {children}
    </NavigatorContext.Provider>
  );
};

export const useNavigator = () => {
  const navigate = useContext(NavigatorContext);
  if (!navigate) {
    throw new Error('useNavigator must be used within a NavigatorProvider');
  }
  return navigate;
};
