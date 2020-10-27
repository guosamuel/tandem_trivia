import React, { useReducer, createContext } from "react";
import { data } from "../../assets/data/data";

export const TriviaContext = createContext();

const initialState = {
  triviaData: data,
  start: false
}

const reducer = (state, action) => {
  switch(action.type) {
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
