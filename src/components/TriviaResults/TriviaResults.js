import React, { useContext } from "react";
import { TriviaContext } from "../../context/TriviaContext/TriviaContext";

export default function TriviaResults({ resetTrivia }) {
  const [state] = useContext(TriviaContext);

  return (
    <>
      <h3 data-testid="results-message">You answered {state.correctQuestionCount} out of 10 correctly!</h3>
      {state.correctQuestionCount !== 10 ? (
        <p data-testid="partial-correct-message">There's room for improvement! Let's give it another shot!</p>
      ) : (
        <p data-testid="all-correct-message">
          Amazing, you got all {state.correctQuestionCount} questions right!
        </p>
      )}
      <button data-testid="play-again-button" className="btn btn-primary" onClick={resetTrivia}>
        Play Again
      </button>
    </>
  );
}
