import React, { useContext, useState, useEffect } from "react";
import { TriviaContext } from "../../context/TriviaContext/TriviaContext";

export default function TriviaQuestionAndChoices({
  currentData,
  chooseRandomQuestion,
}) {
  const [state, dispatch] = useContext(TriviaContext);
  const [answeredQuestion, setAnsweredQuestion] = useState(false);
  const [answeredCorrectly, setAnsweredCorrectly] = useState(null);
  const [randomizedChoices, setRandomizedChoices] = useState([]);

  useEffect(() => {
    const choices = [...currentData.incorrect, currentData.correct];
    const randomizedOrder = [];

    while (choices.length !== 0) {
      let randomIndex = Math.floor(Math.random() * choices.length);
      randomizedOrder.push(choices[randomIndex]);
      choices.splice(randomIndex, 1);
      setRandomizedChoices([...randomizedOrder]);
    }

    setAnsweredQuestion(false);
    setAnsweredCorrectly(null);
  }, [currentData]);

  const handleClick = (e) => {
    setAnsweredQuestion(true);
    if (e.target.innerText === currentData.correct) {
      dispatch({ type: "INCREASE_CORRECT_QUESTION_COUNT" });
      setAnsweredCorrectly(true);
    } else {
      setAnsweredCorrectly(false);
    }
  };

  const handleViewResults = () => {
    dispatch({ type: "FINISH_TRIVIA" });
  };

  return (
    <>
      <h2>Question {state.questionCount} of 10</h2>
      <h3>{currentData.question}</h3>
      <ol>
        {randomizedChoices.map((choice, idx) => (
          <li key={idx} onClick={answeredQuestion ? null : handleClick}>
            {choice}
          </li>
        ))}
      </ol>
      {state.questionCount === 10 ? (
        <button onClick={handleViewResults} disabled={!answeredQuestion}>
          View Results
        </button>
      ) : (
        <button onClick={chooseRandomQuestion} disabled={!answeredQuestion}>
          Next Question
        </button>
      )}
      {answeredQuestion ? (
        <h4>
          {answeredCorrectly
            ? "Correct!"
            : `Wrong! The correct answer is ${currentData.correct}.`}
        </h4>
      ) : null}
    </>
  );
}
