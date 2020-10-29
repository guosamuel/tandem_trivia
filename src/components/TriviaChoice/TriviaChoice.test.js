import React from "react";
import TriviaChoice from "./TriviaChoice";

import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const handleClick = () => {
  console.log("I am just a dummy function");
};

it("renders properly without any props", () => {
  render(<TriviaChoice />);
});

it("renders properly with props", () => {
  render(
    <TriviaChoice
      answeredQuestion={true}
      handleClick={handleClick}
      choice={"Potato"}
    />
  );
  const component = document.getElementsByTagName("li")[0];
  expect(component.textContent).toBe("Potato");
  expect(component.className).toBe("");
});

it("changes class name when hovering over option", () => {
  render(
    <TriviaChoice
      answeredQuestion={false}
      handleClick={handleClick}
      choice={"Potato"}
    />
  );
  const component = document.getElementsByTagName("li")[0];

  userEvent.hover(component);
  expect(component.className).toBe("hover-outline");

  userEvent.unhover(component);
  expect(component.className).toBe("");
});

it("stays the same class name when question is answered", () => {
  render(
    <TriviaChoice
      answeredQuestion={true}
      handleClick={handleClick}
      choice={"Potato"}
    />
  );
  const component = document.getElementsByTagName("li")[0];

  userEvent.hover(component);
  expect(component.className).toBe("");

  userEvent.unhover(component);
  expect(component.className).toBe("");
});
