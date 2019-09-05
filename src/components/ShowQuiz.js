import React from "react";
import he from "he";

class ShowQuiz extends React.Component {
  state = { questions: [], count: 0 };

  componentDidUpdate() {
    if (this.props.questions !== this.state.questions) {
      this.setState({ questions: this.props.questions });
    }
  }

  nextQuestion = () => {
    this.setState(prevstate => ({ count: prevstate.count + 1 }));
  };

  render() {
    if (!this.state.questions.length) {
      return (
        <div>
          <div className="d-flex justify-content-center">
            <div
              className="spinner-border"
              style={{ width: "5rem", height: "5rem" }}
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      );
    } else {
      let currentQuestion = this.state.questions[this.state.count];
      let temporaryAnswers = [];
      let currentAnswers = [];
      let correctAnswer;

      console.log(currentQuestion);

      for (const key in currentQuestion) {
        if (key === "correct_answer" || key === "incorrect_answers") {
          temporaryAnswers.push(currentQuestion[key]);
        }
      }
      currentAnswers = temporaryAnswers.flat(2);
      console.log(currentAnswers);

      let answerButton = currentAnswers.map(answer => (
        <button type="button" className="btn btn-primary btn-lg">
          {he.decode(answer)}
        </button>
      ));

      return (
        <div>
          <div
            className="alert alert-primary w-50 mx-auto"
            style={{ fontSize: "2rem" }}
            role="alert"
          >
            {he.decode(currentQuestion.question)}
          </div>
          {answerButton}
          <button onClick={this.nextQuestion}>Next Question</button>
        </div>
      );
    }
  }
}

export default ShowQuiz;
