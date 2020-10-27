import React, { useContext, useState } from "react";
import { TriviaContext } from "../../context/TriviaContext/TriviaContext";
import TriviaQuestionAndChoices from "../../components/TriviaQuestionAndChoices/TriviaQuestionAndChoices";
import TriviaResults from "../../components/TriviaResults/TriviaResults";

export default function TriviaContainer() {
  const [state, dispatch] = useContext(TriviaContext);
  const [currentData, setCurrentData] = useState(null);

  const chooseRandomQuestion = () => {
    let randomIndex = Math.floor(Math.random() * state.triviaData.length);
    setCurrentData(state.triviaData[randomIndex]);
    dispatch({ type: "CHOOSE_RANDOM_QUESTION", payload: randomIndex });
    dispatch({ type: "INCREASE_QUESTION_COUNT" });
  };

  const refreshQuestion = () => {
    let randomIndex = Math.floor(Math.random() * (state.triviaData.length + 1));
    setCurrentData(state.triviaData[randomIndex]);
  };

  const startTrivia = () => {
    chooseRandomQuestion();
    dispatch({ type: "START_TRIVIA" });
  };

  const resetTrivia = () => {
    dispatch({ type: "RESET_TO_INITIAL_STATE" });
  };

  return (
    <>
      {state.start ? (
        currentData ? (
          <TriviaQuestionAndChoices
            currentData={currentData}
            chooseRandomQuestion={chooseRandomQuestion}
          />
        ) : (
          <>
            <h3>
              There seems to be an error. Please hit the Refresh button to load
              a new question.
            </h3>
            <button onClick={refreshQuestion}>Refresh</button>
          </>
        )
      ) : state.questionCount === 10 ? (
        <>
          <TriviaResults />
          <button className="btn btn-primary" onClick={resetTrivia}>Play Again</button>
        </>
      ) : (
        <button className="btn btn-primary" onClick={startTrivia}>Start!</button>
      )}
    </>
  );
}
