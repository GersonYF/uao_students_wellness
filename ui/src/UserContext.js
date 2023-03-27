import { createContext, useContext, useState } from 'react';

const UserContext = createContext();


export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [selectedQuestionary, setSelectedQuestionary] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questionaries, setQuestionaries] = useState([]);
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
        selectedQuestionary,
        questionaries,
        user,
        showModal,
        selectedCategory,
        loginUser,
        logoutUser,
        setSelectedQuestionary,
        setQuestionaries,
        setShowModal,
        setSelectedCategory
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
