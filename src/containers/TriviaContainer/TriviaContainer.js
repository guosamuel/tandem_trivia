import React, { useContext, useState } from "react";
import { TriviaContext } from "../../context/TriviaContext/TriviaContext";
import TriviaQuestionAndChoices from "../../components/TriviaQuestionAndChoices/TriviaQuestionAndChoices";
import TriviaResults from "../../components/TriviaResults/TriviaResults";
import TriviaQuestionRefresher from "../../components/TriviaQuestionRefresher/TriviaQuestionRefresher";

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
          <TriviaQuestionRefresher refreshQuestion={refreshQuestion} />
        )
      ) : state.questionCount === 10 ? (
        <TriviaResults resetTrivia={resetTrivia} />
      ) : (
        <button
          data-testid="start-button"
          className="btn btn-primary"
          onClick={startTrivia}
        >
          Start!
        </button>
      )}
    </>
  );
}
