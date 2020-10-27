import React, { useReducer, createContext } from "react";
import { data } from "../../assets/data/data";

export const TriviaContext = createContext();

const initialState = {
  triviaData: data,
  start: false,
  questionCount: 0
}

const reducer = (state, action) => {
  switch(action.type) {
    case "CHOOSE_RANDOM_QUESTION":
      return {
        ...state,
        triviaData: [...state.triviaData.slice(0, action.payload), ...state.triviaData.slice(action.payload+1)]
      }
    case "INCREASE_QUESTION_COUNT":
      return {
        ...state,
        questionCount: state.questionCount + 1
      }
    case "START_TRIVIA":
      return {
        ...state, start: true
      }
    default:
      return state
  }
}

export const TriviaContextProvider = props => {
  const [ state, dispatch ] = useReducer(reducer, initialState)

  return (
    <TriviaContext.Provider value={[state, dispatch]}>
      {props.children}
    </TriviaContext.Provider>
  )
}
