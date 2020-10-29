import React from 'react'
import TriviaChoice from './TriviaChoice'

import { render } from '@testing-library/react'

const handleClick = () => {
  console.log("I've been clicked!")
}

it("renders properly without any props", () => {
  render(<TriviaChoice />)
})

it("renders properly with props", () => {
  render(<TriviaChoice answeredQuestion={true} handleClick={handleClick} choice={"Potato"}/>)
  const component = document.getElementsByTagName("li")[0]
  expect(component.textContent).toBe("Potato")
})
