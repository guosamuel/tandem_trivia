# Tandem Trivia

Welcome to Tandem Trivia! Tandem Trivia is an application to test and increase your trivia knowledge. All questions are sourced from Tandem.

## Frameworks and Libraries

Built with [React](https://reactjs.org/)

Tested with [DOM Testing Library](https://testing-library.com/docs/dom-testing-library/intro) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)

## System Dependencies

1. node (version >= 12.19.0)
2. npm (version >= 6.14.8)

## Installation

You can copy this repo into your local machine with or without git.

__Copying with git__: In your terminal, run the following command: `git clone git@github.com:guosamuel/tandem_trivia.git`

__Copying without git__: Download the .zip file. Unzip the in your chosen directory.

When the repo is in your local machine, change into the directory where you saved the repo.

Run the following command to install all the packages: `npm install`

## Testing

All components for Tandem Trivia have their own respective testing files. The component file and its respective test are all grouped within their respective folder.

To execute all of the tests, in your terminal, run the following command: `npm test`.

If you would like to execute specific tests, please follow the prompts shown on your terminal after all the tests are executed.

## Starting Trivia Tandem

Tandem Trivia, by default, uses port 3000. Please ensure that you do not have any other applications running on that port prior to running Tandem Trivia.

To start the application, run the following command in your terminal: `npm start`

Your default browser should automatically open a new window or browser for Tandem Trivia. If not, you can type in `localhost:3000` into your browser's navigation bar to open Tandem Trivia.

## Playing Tandem Trivia

You will be greeted at the home page and a Start button to begin playing Tandem Trivia.

There will be 10 questions randomly chosen from the question pile. You must answer the current question before moving onto the next question. You will know if you answered correctly for each question as shown below the button. You will not be able to go back and change your answer once you have selected your answer.

After answering the last question, you will be directed to your results page which is a summary on the number of questions you answered correctly for the round. You can play a new round of Tandem Trivia by clicking on the `Play Again` button.

There may be times where a question does not load properly. A message will appear stating that and a `Refresh` button will appear. Clicking on the `Refresh` button will bring you back where you last left off and load a new question.
