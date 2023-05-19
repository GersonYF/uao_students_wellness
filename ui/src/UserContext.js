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
  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [questionaryStats, setQuestionaryStats] = useState(null);
  const [genderCounts, setGenderCounts] = useState([])
  const [smokingCigarretesCounts, setSmokingCigarretesCounts] = useState([])
  const [alcoholCounts, setAlcoholCounts] = useState([])
  const [sleepQualityCounts, setSleepQualityCounts] = useState([])

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
        categories,
        questions,
        answers,
        questionaryStats,
        genderCounts,
        smokingCigarretesCounts,
        alcoholCounts,
        sleepQualityCounts,
        setGenderCounts,
        setSmokingCigarretesCounts,
        setAlcoholCounts,
        setSleepQualityCounts,
        loginUser,
        logoutUser,
        setSelectedQuestionary,
        setQuestionaries,
        setShowModal,
        setSelectedCategory,
        setCategories,
        setQuestions,
        setAnswers,
        setQuestionaryStats,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
