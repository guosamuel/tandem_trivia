import React, { useContext, useState } from 'react'
import { TriviaContext } from '../../context/TriviaContext/TriviaContext'

export default function TriviaQuestionAndChoices({ currentData, chooseRandomQuestion }) {
  const [ state, dispatch ] = useContext(TriviaContext)
  const [ answeredQuestion, setAnsweredQuestion ] = useState(false)
  const [ answeredCorrectly, setAnsweredCorrectly ] = useState(null)

  const choices = [...currentData.incorrect, currentData.correct]
  const randomizedOrder = []

  while ( choices.length !== 0 ) {
    let randomIndex = Math.floor(Math.random() * (choices.length))
    randomizedOrder.push(choices[randomIndex])
    choices.splice(randomIndex, 1)
  }

  const handleClick = (e) => {
    setAnsweredQuestion(true)
    if (e.target.innerText === currentData.correct) {
      dispatch({type: "INCREASE_CORRECT_QUESTION_COUNT"})
      setAnsweredCorrectly(true)
      console.log("CORRECT!")
    } else {
      setAnsweredCorrectly(false)
      console.log("NOPE!")
    }
  }

  return (
    <>
      <h3>{currentData.question}</h3>
      <ol>
        {randomizedOrder.map( (choice, idx) => <li key={idx} onClick={answeredQuestion ? null : handleClick}>{choice}</li>)}
      </ol>
      <button onClick={chooseRandomQuestion} disabled={!answeredQuestion}>Next Question</button>
      { answeredQuestion ? (<h4>{answeredCorrectly ? "Correct!" : "Wrong!" }</h4>) : null}
    </>
  )
}
