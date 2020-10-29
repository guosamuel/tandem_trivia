import React, { useReducer } from 'react'
import { render } from '@testing-library/react'
import TriviaQuestionAndChoices from './TriviaQuestionAndChoices'
import { TriviaContextProvider } from '../../context/TriviaContext/TriviaContext'

const data = {
  question: "What was Tandem previous name?",
  incorrect: ["Tandem", "Burger Shack", "Extraordinary Humans"],
  correct: "Devmynd",
}

const chooseRandomQuestion = () => {
  console.log("I am a dummy function")
}

it("renders properly on intial render", () => {
  const { getByTestId } = render(
    <TriviaContextProvider>
      <TriviaQuestionAndChoices currentData={data} chooseRandomQuestion={chooseRandomQuestion} />
    </TriviaContextProvider>
  )

  expect(getByTestId("question-tracker").textContent).toBe("Question 0 of 10")
  expect(getByTestId("question").textContent).toBe("What was Tandem previous name?")
  expect(document.getElementsByTagName("ol").length).toBe(1)
  expect(document.getElementsByTagName("li").length).toBe(4)
  expect(getByTestId("next-question-button").textContent).toBe("Next Question")
})

it("renders view results button", () => {
  const initialState = {
    questionCount: 10,
    start: true
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case "FINISH_TRIVIA":
        return {
          ...state,
          start: false
        }
      default:
        return state
    }
  }

  const DummyProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
      <DummyProvider
    )
  }

  const { getByTestId } = render(
    <TriviaContextProvider value={[state, dispatch]}>
      <TriviaQuestionAndChoices currentData={data} chooseRandomQuestion={chooseRandomQuestion} />
    </TriviaContextProvider>
  )

  expect(getByTestId("question-tracker").textContent).toBe("Question 10 of 10")
  expect(getByTestId("question").textContent).toBe("What was Tandem previous name?")
  expect(document.getElementsByTagName("ol").length).toBe(1)
  expect(document.getElementsByTagName("li").length).toBe(4)
  expect(getByTestId("next-question-button").textContent).toBe("Next Question")
  expect(getByTestId("view-results-button").textContent).toBe("View Results")
})
