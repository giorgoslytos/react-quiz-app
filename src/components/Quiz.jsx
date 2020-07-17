import React, { useState, useEffect } from 'react';
import QuizData from './QuizData';
import QuizCard from './QuizCard';
import Results from './Results';
// import QuizCard from './QuizCard';

const Quiz = () => {
  const [userAnswer, setUserAnswer] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quiz, setQuiz] = useState({
    question: '',
    options: [],
    answer: '',
    id: '',
  });
  const [finished, setFinished] = useState(false);

  // ASSIGN DATA TO STATE
  const loadQuiz = () => {
    if (currentQuestion < QuizData.length)
      setQuiz({
        id: QuizData[currentQuestion].id,
        question: QuizData[currentQuestion].question,
        options: [...QuizData[currentQuestion].options],
        answer: QuizData[currentQuestion].answer,
      });
  };

  // TYPICAL SHUFFLE FUNCTION
  const shuffle = (array) => {
    var tmp,
      current,
      top = array.length;
    if (top)
      while (--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
      }
    return array;
  };

  const arraysEqual = (_arr1, _arr2) => {
    if (
      !Array.isArray(_arr1) ||
      !Array.isArray(_arr2) ||
      _arr1.length !== _arr2.length
    )
      return false;
    var arr1 = _arr1.concat().sort();
    var arr2 = _arr2.concat().sort();
    for (var i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  };

  // PREV NEXT BUTTONS
  const handleNavigation = (direction) => {
    setTimeout(() => {
      setCurrentQuestion(currentQuestion + direction);
    }, 50);
  };

  // CALC PERCENTAGE
  const calcPercentage = () => {
    let correctAnswers = 0;
    const ids = QuizData.map((q) => q.id);
    for (let i = 0; i < QuizData.length; i++) {
      if (
        Array.isArray(userAnswer[ids[i]]) &&
        arraysEqual(userAnswer[ids[i]], QuizData[i].answer)
      ) {
        correctAnswers++;
      } else {
        if (userAnswer[ids[i]] === QuizData[i].answer) {
          correctAnswers++;
        }
      }
    }
    return (correctAnswers / QuizData.length) * 100;
  };

  // SUBMIT ANSWERS
  const handleSubmission = () => {
    setFinished(true);
  };

  // INIT
  useEffect(() => {
    console.log(QuizData);
    shuffle(QuizData);
    QuizData.forEach((quiz) => shuffle(quiz.options));
  }, []);

  // NEXT QUESTION
  useEffect(() => {
    if (currentQuestion < QuizData.length)
      setQuiz({
        id: QuizData[currentQuestion].id,
        question: QuizData[currentQuestion].question,
        options: [...QuizData[currentQuestion].options],
        answer: QuizData[currentQuestion].answer,
      });
  }, [currentQuestion]);

  // ADD USER ANSWERS TO USERANSWER ARRAY
  const handleRadioSelection = (id, option) => {
    const tmp = { ...userAnswer };
    tmp[id] = option;
    setUserAnswer(tmp);
  };

  // ADD USER ANSWERS TO USERANSWER ARRAY
  const handleCheckboxSelection = (id, option) => {
    let tmp = { ...userAnswer };
    if (userAnswer[id] && Array.isArray(userAnswer[id])) {
      if (tmp[id].includes(option)) {
        tmp[id] = tmp[id].filter((x) => x !== option);
      } else tmp[id] = [...userAnswer[id], option];
    } else tmp[id] = [option];
    setUserAnswer(tmp);
  };

  // RE INIT
  const handleAgainBtn = () => {
    setFinished(false);
    setCurrentQuestion(0);
    setUserAnswer('');
    loadQuiz();
  };

  return (
    <div className="container">
      <h1 className="display-4 mb-4  mt-3 text-center">Quiz App</h1>
      {!finished ? (
        QuizData[currentQuestion].type === 'radio' ? (
          <QuizCard
            quiz={quiz}
            handleSelection={handleRadioSelection}
            userAnswer={userAnswer}
            currentQuestion={currentQuestion}
            QuizData={QuizData}
            handleNavigation={handleNavigation}
            handleSubmission={handleSubmission}
            type="radio"
          />
        ) : (
          <QuizCard
            quiz={quiz}
            handleSelection={handleCheckboxSelection}
            userAnswer={userAnswer}
            currentQuestion={currentQuestion}
            QuizData={QuizData}
            handleNavigation={handleNavigation}
            handleSubmission={handleSubmission}
            type="checkbox"
          />
        )
      ) : (
        <Results
          handleAgainBtn={handleAgainBtn}
          QuizData={QuizData}
          calcPercentage={calcPercentage}
        />
      )}
    </div>
  );
};

export default Quiz;
