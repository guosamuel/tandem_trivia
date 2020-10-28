import React, { useState } from "react";

export default function TriviaChoice({
  answeredQuestion,
  handleClick,
  choice,
}) {
  const [isHover, setIsHover] = useState(false);
  const handleOnMouseEnter = (e) => {
    setIsHover(true);
  };

  const handleOnMouseLeave = (e) => {
    setIsHover(false);
  };

  return (
    <li
      className={isHover ? "hover-outline" : ""}
      onMouseEnter={answeredQuestion ? null : handleOnMouseEnter}
      onMouseLeave={answeredQuestion ? null : handleOnMouseLeave}
      onClick={answeredQuestion ? null : handleClick}
    >
      {choice}
    </li>
  );
}
