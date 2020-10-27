import React from 'react'

export default function TriviaQuestionAndChoices({ currentData, chooseRandomQuestion }) {
  return (
    <>
      <div>{currentData.question}</div>
      <div>{currentData.correct}</div>
      <button onClick={chooseRandomQuestion}>Next</button>
    </>
  )
}
