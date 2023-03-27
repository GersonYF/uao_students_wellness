// src/components/TrelloBoard.js

import React, {useEffect, useState} from 'react';
import Loading from '../components/Loading';
import { useUserContext } from '../UserContext';
import QuestionaryBody from '../components/QuestionaryBody';
import QuestionaryCategory from '../components/QuestionaryCategory';

const Questionary = () => {
  const { user, selectedCategory, selectedQuestionary } = useUserContext();

  useEffect(() => {
    // fetch data
  }, []);

  if (!selectedQuestionary) {
    return <Loading />
  }
  
  return (
    
    <>
      {!!selectedCategory && <QuestionaryBody title={selectedQuestionary.title} date={selectedQuestionary.date} categories={[]} />}
      {selectedCategory && <QuestionaryCategory category={selectedCategory} questions={selectedQuestionary.questions} /> }
    </>
  )
};

export default Questionary;