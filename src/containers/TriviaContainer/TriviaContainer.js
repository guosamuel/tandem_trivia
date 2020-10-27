import React, { useContext, useState } from 'react'
import { TriviaContext } from '../../context/TriviaContext/TriviaContext'
import TriviaQuestionAndChoices from '../../components/TriviaQuestionAndChoices/TriviaQuestionAndChoices'

export default function TriviaContainer() {
  const [ state, dispatch ] = useContext(TriviaContext);
  const [ currentData, setCurrentData ] = useState(null)

  console.log(state.triviaData.length, state.questionCount)

  const chooseRandomQuestion = () => {
    let randomIndex = Math.floor(Math.random() * (state.triviaData.length + 1))
    console.log("randomIndex", randomIndex)
    setCurrentData(state.triviaData[randomIndex])
    dispatch({type: "CHOOSE_RANDOM_QUESTION", payload: randomIndex})
    dispatch({type: "INCREASE_QUESTION_COUNT"})
  }

  const refreshQuestion = () => {
    let randomIndex = Math.floor(Math.random() * (state.triviaData.length + 1))
    setCurrentData(state.triviaData[randomIndex])
  }

  const handleOnClick = () => {
    chooseRandomQuestion()
    dispatch({type: "START_TRIVIA"})
  }

  return (
    <>
      {state.start ? (

        currentData ? (
          <TriviaQuestionAndChoices currentData={currentData} chooseRandomQuestion={chooseRandomQuestion}/>
        ) : (
          <>
            <h3>There seems to be an error. Please hit the Refresh button to load a new question.</h3>
            <button onClick={refreshQuestion}>Refresh</button>
          </>
        )

      ) : (
        <button onClick={handleOnClick}>Start!</button>
      )}
    </>
  )
}
