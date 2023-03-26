import { createContext, useContext, useState } from 'react';

const UserContext = createContext();


export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const loginUser = (userInfo) => {
    setUser(userInfo);
  };

  const logoutUser = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        showModal,
        loginUser,
        logoutUser,
        setShowModal
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
