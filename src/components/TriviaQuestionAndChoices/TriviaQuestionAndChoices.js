import React, { useContext, useState, useEffect } from "react";
import { TriviaContext } from "../../context/TriviaContext/TriviaContext";
import TriviaChoice from "../TriviaChoice/TriviaChoice";

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

    /* THE CODE BELOW RESETS ALL OF THE CLASS NAMES FOR THE TRIVIA CHOICES */
    [...document.getElementsByTagName("li")].forEach(
      (el) => (el.className = "")
    );
  }, [currentData]);

  const handleClick = (e) => {
    setAnsweredQuestion(true);
    e.target.className = "selected-outline";
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
      <h2 data-testid="question-tracker">
        Question {state.questionCount} of 10
      </h2>
      <h3 data-testid="question">{currentData.question}</h3>
      <ol data-testid="choices" type="A">
        {randomizedChoices.map((choice, idx) => (
          <TriviaChoice
            key={idx}
            idx={idx}
            choice={choice}
            handleClick={handleClick}
            answeredQuestion={answeredQuestion}
          />
        ))}
      </ol>
      <br />
      {state.questionCount === 10 ? (
        <button
          data-testid="view-results-button"
          className="btn btn-primary"
          onClick={handleViewResults}
          disabled={!answeredQuestion}
        >
          View Results
        </button>
      ) : (
        <button
          data-testid="next-question-button"
          className="btn btn-primary"
          onClick={chooseRandomQuestion}
          disabled={!answeredQuestion}
        >
          Next Question
        </button>
      )}
      <br />
      <br />
      {answeredQuestion ? (
        <h4 data-testid="answer-response">
          {answeredCorrectly
            ? "Correct!"
            : `Wrong! The correct answer is ${currentData.correct}.`}
        </h4>
      ) : null}
    </>
  );
}
