import React, { useReducer } from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TriviaContainer from './TriviaContainer'
import { TriviaContextProvider, TriviaContext, reducer } from '../../context/TriviaContext/TriviaContext'

const component = () => {
  return render(
    <TriviaContextProvider>
      <TriviaContainer />
    </TriviaContextProvider>
  )
}

it("renders properly on initial render", () => {
  const { getByTestId } = component()

  expect(getByTestId("start-button").textContent).toBe("Start!")

})

it("clicks on the start button", () => {
  const { getByTestId } = component()

  userEvent.click(getByTestId("start-button"))

  /* SHOWS TriviaQuestionAndChoices COMPONENT RENDERED */
  expect(getByTestId("question-tracker"))
})

it("renders the question refresher component", () => {
  const startingState = {
    currentData: null,
    start: true
  }

  const DummyProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, startingState)

    return (
      <TriviaContext.Provider value={[state, dispatch]}>
        {props.children}
      </TriviaContext.Provider>
    )
  }

  const { getByTestId } = render(
    <DummyProvider>
      <TriviaContainer />
    </DummyProvider>
  )

  /* SHOWS TriviaQuestionRefresher COMPONENT RENDERED */
  expect(getByTestId("question-refresher"))
})

it("renders the trivia results component", () => {
  const startingState = {
    start: false,
    questionCount: 10
  }

  const DummyProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, startingState)

    return (
      <TriviaContext.Provider value={[state, dispatch]}>
        {props.children}
      </TriviaContext.Provider>
    )
  }

  const { getByTestId } = render(
    <DummyProvider>
      <TriviaContainer />
    </DummyProvider>
  )

  /* SHOWS TriviaReuslts COMPONENT RENDERED */
  expect(getByTestId("results-message"))
})
