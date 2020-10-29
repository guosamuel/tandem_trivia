import React, { useState } from 'react'
import TriviaResults from './TriviaResults'
import { TriviaContext } from '../../context/TriviaContext/TriviaContext'
import { render } from '@testing-library/react'

const resetTrivia = () => {
  console.log("I am just a dummy function")
}

it("renders properly with less than 10 questions answered correctly", () => {
  const startingState = {
    correctQuestionCount: 7
  }

  const DummyProvider = (props) => {

    const [state] = useState(startingState)

    return (
      <TriviaContext.Provider value={[state]}>
        {props.children}
      </TriviaContext.Provider>
    )
  }

  const { getByTestId } = render(
    <DummyProvider>
      <TriviaResults resetTrivia={resetTrivia} />
    </DummyProvider>
  )

  expect(getByTestId("results-message").textContent).toBe("You answered 7 out of 10 correctly!")
  expect(getByTestId("partial-correct-message").textContent).toBe("There's room for improvement! Let's give it another shot!")
  expect(getByTestId("play-again-button").textContent).toBe("Play Again")
})

it("renders properly with less than 10 questions answered correctly", () => {
  const startingState = {
    correctQuestionCount: 10
  }

  const DummyProvider = (props) => {

    const [state] = useState(startingState)

    return (
      <TriviaContext.Provider value={[state]}>
        {props.children}
      </TriviaContext.Provider>
    )
  }

  const { getByTestId } = render(
    <DummyProvider>
      <TriviaResults resetTrivia={resetTrivia} />
    </DummyProvider>
  )

  expect(getByTestId("results-message").textContent).toBe("You answered 10 out of 10 correctly!")
  expect(getByTestId("all-correct-message").textContent).toBe("Amazing, you got all 10 questions right!")
  expect(getByTestId("play-again-button").textContent).toBe("Play Again")

})
