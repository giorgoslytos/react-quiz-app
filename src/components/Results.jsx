import React from 'react';

const Results = ({
  handleAgainBtn,
  correctAnswers,
  QuizData,
  calcPercentage,
}) => {
  const percentage = calcPercentage();
  return (
    <div className="Results card">
      <div className="card-body text-center">
        <h4 className="card-title">
          Your result was : <span>{percentage}%</span>
        </h4>
        {percentage === 100 ? (
          <h2 className="text-success">Ace!!!</h2>
        ) : percentage >= 85 ? (
          <h2 className="text-success">Excellent!</h2>
        ) : percentage >= 75 ? (
          <h2 className="text-success">Very Good!</h2>
        ) : percentage >= 60 ? (
          <h2 className="text-success">Good!</h2>
        ) : percentage >= 50 ? (
          <h2 className="text-success">You pass!</h2>
        ) : (
          <h2 className="text-danger">You failed ;(</h2>
        )}
        <a
          className="btn btn-info text-white my-3"
          onClick={() => {
            handleAgainBtn();
          }}
        >
          Try again!
        </a>
      </div>
    </div>
  );
};

export default Results;
