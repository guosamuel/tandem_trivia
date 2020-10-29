import React, { useReducer } from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TriviaQuestionAndChoices from "./TriviaQuestionAndChoices";
import {
  TriviaContextProvider,
  reducer,
  TriviaContext,
} from "../../context/TriviaContext/TriviaContext";

const data = {
  question: "What was Tandem previous name?",
  incorrect: ["Tandem", "Burger Shack", "Extraordinary Humans"],
  correct: "Devmynd",
};

const chooseRandomQuestion = () => {
  console.log("I am a dummy function");
};

it("renders properly on intial render", () => {
  const { getByTestId } = render(
    <TriviaContextProvider>
      <TriviaQuestionAndChoices
        currentData={data}
        chooseRandomQuestion={chooseRandomQuestion}
      />
    </TriviaContextProvider>
  );

  expect(getByTestId("question-tracker").textContent).toBe("Question 0 of 10");
  expect(getByTestId("question").textContent).toBe(
    "What was Tandem previous name?"
  );
  expect(document.getElementsByTagName("ol").length).toBe(1);
  expect(document.getElementsByTagName("li").length).toBeGreaterThanOrEqual(2);
  expect(getByTestId("next-question-button").textContent).toBe("Next Question");
  expect(getByTestId("next-question-button")).toHaveAttribute("disabled");
});

it("renders view results button", () => {
  const startingState = {
    questionCount: 10,
    start: true,
  };

  const DummyProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, startingState);

    return (
      <TriviaContext.Provider value={[state, dispatch]}>
        {props.children}
      </TriviaContext.Provider>
    );
  };

  const { getByTestId } = render(
    <DummyProvider>
      <TriviaQuestionAndChoices
        currentData={data}
        chooseRandomQuestion={chooseRandomQuestion}
      />
    </DummyProvider>
  );

  expect(getByTestId("question-tracker").textContent).toBe("Question 10 of 10");
  expect(getByTestId("question").textContent).toBe(
    "What was Tandem previous name?"
  );
  expect(document.getElementsByTagName("ol").length).toBe(1);
  expect(document.getElementsByTagName("li").length).toBeGreaterThanOrEqual(2);
  expect(getByTestId("view-results-button").textContent).toBe("View Results");
});

it("renders incorrect statement", () => {
  const startingState = {
    questionCount: 1,
    start: true,
  };

  const DummyProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, startingState);

    return (
      <TriviaContext.Provider value={[state, dispatch]}>
        {props.children}
      </TriviaContext.Provider>
    );
  };

  const { getByTestId, getByText } = render(
    <DummyProvider>
      <TriviaQuestionAndChoices
        currentData={data}
        chooseRandomQuestion={chooseRandomQuestion}
      />
    </DummyProvider>
  );

  expect(getByTestId("question-tracker").textContent).toBe("Question 1 of 10");
  expect(getByTestId("question").textContent).toBe(
    "What was Tandem previous name?"
  );
  expect(document.getElementsByTagName("ol").length).toBe(1);
  expect(document.getElementsByTagName("li").length).toBeGreaterThanOrEqual(2);
  expect(getByTestId("next-question-button").textContent).toBe("Next Question");
  expect(getByTestId("next-question-button")).not.toHaveAttribute(
    `disabled=""`
  );

  let index;
  for (let i = 1; i < 5; i++) {
    if (getByTestId(`choice-${i}`).textContent !== "Devmynd") {
      index = i;
      break;
    }
  }

  userEvent.click(getByTestId(`choice-${index}`));
  expect(getByTestId("answer-response").textContent).toBe(
    "Wrong! The correct answer is Devmynd."
  );
});
