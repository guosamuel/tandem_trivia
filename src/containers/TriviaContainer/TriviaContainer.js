import React, { useContext } from 'react'
import { TriviaContext } from '../../context/TriviaContext/TriviaContext'

export default function TriviaContainer() {
  const [ state, dispatch ] = useContext(TriviaContext)

  return (
    <>
      {state.start ? (
        <div>Booop</div>
      ) : (
        <button onClick={() => dispatch({type: "START_TRIVIA"})}>Start!</button>
      )}
    </>
  )
}
