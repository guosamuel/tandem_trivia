import React from 'react'
import TriviaQuestionRefresher from './TriviaQuestionRefresher'
import { render } from '@testing-library/react'

const refreshQuestion = () => {
  console.log("I am a dummy function")
}

it("renders properly", () => {
  const { getByTestId } = render(<TriviaQuestionRefresher refreshQuestion={refreshQuestion}/>)

  expect(getByTestId("question-refresher").textContent).toBe("There seems to be an error. Please hit the Refresh button to load a new question.")
  expect(getByTestId("question-refresher-button").textContent).toBe("Refresh")
})
