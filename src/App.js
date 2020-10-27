import React from "react";
import { TriviaContextProvider } from './context/TriviaContext/TriviaContext'
import TriviaContainer from './containers/TriviaContainer/TriviaContainer'
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Tandem Trivia!</h1>
        <TriviaContextProvider>
          <TriviaContainer />
        </TriviaContextProvider>
    </div>
  );
}

export default App;
