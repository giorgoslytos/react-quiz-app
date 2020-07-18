import React, { useEffect } from 'react';

const QuizCard = ({
  quiz,
  handleSelection,
  userAnswer,
  currentQuestion,
  QuizData,
  handleNavigation,
  handleSubmission,
  type,
}) => {
  useEffect(() => {
    console.log(quiz);
  }, []);
  return (
    <div className="card" style={{}}>
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <h5 className="card-title">{quiz.question}</h5>
          <p className="counter">{`${currentQuestion + 1} out of ${
            QuizData.length
          }`}</p>
        </div>
        <form>
          {quiz &&
            type === 'radio' &&
            quiz.options.map((option) => {
              return (
                <div
                  className="form-check p-0"
                  key={option}
                  onChange={() => handleSelection(quiz.id, option)}
                >
                  <input
                    className="form-check-input"
                    type="radio"
                    name={option}
                    id={quiz.question + option}
                    value={quiz.question + option}
                    checked={userAnswer[quiz.id] === option}
                    readOnly
                  />
                  <label
                    className="form-check-label btn btn-outline-secondary w-100 my-1"
                    htmlFor={quiz.question + option}
                  >
                    {option}
                  </label>
                </div>
              );
            })}
          {quiz &&
            type === 'checkbox' &&
            quiz.options.map((option) => {
              return (
                <div className="form-check p-0" key={option}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name={option || ''}
                    id={option}
                    value={option}
                    checked={
                      userAnswer[quiz.id] &&
                      Array.isArray(userAnswer[quiz.id]) &&
                      userAnswer[quiz.id].includes(option)
                    }
                    readOnly
                  />
                  <label
                    onClick={() => handleSelection(quiz.id, option)}
                    className="form-check-label btn btn-outline-secondary w-100 my-1"
                    htmlFor={quiz.question + option}
                  >
                    {option}
                  </label>
                </div>
              );
            })}
        </form>
        <div className="buttons mt-3">
          {currentQuestion !== 0 ? (
            <a
              className="previous btn btn-info text-white"
              onClick={() => handleNavigation(-1)}
            >
              Previous
            </a>
          ) : (
            ''
          )}
          {currentQuestion < QuizData.length - 1 ? (
            <a
              className="next btn btn-info text-white"
              onClick={() => handleNavigation(1)}
            >
              Next
            </a>
          ) : (
            <a
              className="next btn btn-info text-white"
              onClick={() => handleSubmission()}
            >
              Submit All Answers
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizCard;
