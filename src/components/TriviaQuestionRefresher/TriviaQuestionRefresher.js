import React from "react";

export default function TriviaQuestionRefresher({ refreshQuestion }) {
  return (
    <>
      <h3 data-testid="question-refresher">
        There seems to be an error. Please hit the Refresh button to load a new
        question.
      </h3>
      <button data-testid="question-refresher-button" onClick={refreshQuestion}>
        Refresh
      </button>
    </>
  );
}
