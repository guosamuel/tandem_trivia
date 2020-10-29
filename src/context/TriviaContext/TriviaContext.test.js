import React, { useContext } from 'react'
import { TriviaContext, TriviaContextProvider } from './TriviaContext'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const TestComponent = () => {
  const [state, dispatch] = useContext(TriviaContext)
  return (
    <>
      <div data-testid="trivia-data">{state.triviaData.length}</div>
      <div data-testid="question-count">{state.questionCount}</div>
      <div data-testid="correct-question-count">{state.correctQuestionCount}</div>
      <button data-testid="increase-correct-question-count">Increase Correct Question Count</button>
      <button data-testid="choose-random-question" onClick={() => dispatch({ type: "CHOOSE_RANDOM_QUESTION", payload: 5 })}>Choose Random Question</button>
      <button data-testid="increase-question-count" onClick={() => dispatch({ type: "INCREASE_QUESTION_COUNT"})}>Increase Question Count: {state.questionCount}</button>
      <button data-testid="start-trivia" onClick={() => dispatch({ type: "START_TRIVIA" })}>Start Trivia: {state.start.toString()}</button>
      <button data-testid="finish-trivia" onClick={() => dispatch({ type: "FINISH_TRIVIA" })}>Finish Trivia: {(!state.start).toString()}</button>
      <button data-testid="reset-to-initial-state" onClick={() => dispatch({ type: "RESET_TO_INITIAL_STATE" })}>Reset To Initial State</button>
    </>
  )
}

it("renders initial state properly", () => {
  const { getByTestId } = render(<TriviaContextProvider><TestComponent /></TriviaContextProvider>)

  expect(getByTestId("trivia-data").textContent).toBe("21")
  expect(getByTestId("start-trivia").textContent).toBe("Start Trivia: false")
  expect(getByTestId("finish-trivia").textContent).toBe("Finish Trivia: true")
  expect(getByTestId("increase-question-count").textContent).toBe("Increase Question Count: 0")
  expect(getByTestId("question-count").textContent).toBe("0")
  expect(getByTestId("correct-question-count").textContent).toBe("0")

})

it("dispatches actions properly", () => {
  const { getByTestId } = render(<TriviaContextProvider><TestComponent /></TriviaContextProvider>)

  userEvent.click(getByTestId("increase-correct-question-count"))
  expect(getByTestId("correct-question-count").textContent).toBe("0")

  userEvent.click(getByTestId("choose-random-question"))
  expect(getByTestId("trivia-data").textContent).toBe("20")
  userEvent.click(getByTestId("choose-random-question"))
  expect(getByTestId("trivia-data").textContent).toBe("19")
  userEvent.click(getByTestId("choose-random-question"))
  expect(getByTestId("trivia-data").textContent).toBe("18")

  userEvent.click(getByTestId("increase-question-count"))
  expect(getByTestId("increase-question-count").textContent).toBe("Increase Question Count: 1")
  userEvent.click(getByTestId("increase-question-count"))
  expect(getByTestId("increase-question-count").textContent).toBe("Increase Question Count: 2")
  userEvent.click(getByTestId("increase-question-count"))
  expect(getByTestId("increase-question-count").textContent).toBe("Increase Question Count: 3")

  userEvent.click(getByTestId("start-trivia"))
  expect(getByTestId("start-trivia").textContent).toBe("Start Trivia: true")
  expect(getByTestId("finish-trivia").textContent).toBe("Finish Trivia: false")


  userEvent.click(getByTestId("finish-trivia"))
  expect(getByTestId("start-trivia").textContent).toBe("Start Trivia: false")
  expect(getByTestId("finish-trivia").textContent).toBe("Finish Trivia: true")

  userEvent.click(getByTestId("reset-to-initial-state"))
  expect(getByTestId("trivia-data").textContent).toBe("21")
  expect(getByTestId("start-trivia").textContent).toBe("Start Trivia: false")
  expect(getByTestId("finish-trivia").textContent).toBe("Finish Trivia: true")
  expect(getByTestId("increase-question-count").textContent).toBe("Increase Question Count: 0")
  expect(getByTestId("question-count").textContent).toBe("0")
  expect(getByTestId("correct-question-count").textContent).toBe("0")

})
