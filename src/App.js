import React from "react";
import Selection from "./components/Selection";
import ShowQuiz from "./components/ShowQuiz";
import getQuestions from "./apis/trivia";
import categoryCode from "./utils/categoryCode";

class App extends React.Component {
  state = {
    isVisible: true,
    questions: [],
    count: 0,
    score: 0
  };

  newGame = () => {
    this.setState(prevState => ({ isVisible: !prevState.isVisible }));
  };

  handleStart = data => {
    const category = categoryCode(data.category);
    const difficulty = data.difficulty.toLowerCase();
    getQuestions(category, difficulty)
      .then(response =>
        this.setState({
          questions: response
        })
      )
      .catch(err => console.log(err));
    this.setState(prevState => ({ isVisible: !prevState.isVisible }));
  };

  render() {
    return (
      <div className="container text-center">
        <h1>TRIVIA QUIZ</h1>
        <p>Created by Carlo Anselmi</p>

        {this.state.isVisible ? (
          <Selection handleStart={this.handleStart} />
        ) : (
          <ShowQuiz questions={this.state.questions} newGame={this.newGame} />
        )}
      </div>
    );
  }
}

export default App;
