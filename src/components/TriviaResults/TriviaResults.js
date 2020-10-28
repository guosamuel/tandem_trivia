import React, { useContext } from "react";
import { TriviaContext } from "../../context/TriviaContext/TriviaContext";

export default function TriviaResults({ resetTrivia }) {
  const [state] = useContext(TriviaContext);

  return (
    <>
      <h3>You answered {state.correctQuestionCount} out of 10 correctly!</h3>
      {state.correctQuestionCount !== 10 ? (
        <p>There's room for improvment! Let's give it another shot!</p>
      ) : (
        <p>
          Amazing, you got all {state.correctQuestionCount} questions right!
        </p>
      )}
      <button className="btn btn-primary" onClick={resetTrivia}>
        Play Again
      </button>
    </>
  );
}
