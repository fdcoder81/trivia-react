import React from "react";
import he from "he";

class ShowQuiz extends React.Component {
  state = {
    count: 0,
    score: 0,
    questions: [],
    currentAnswers: [],
    correctAnswer: ""
  };

  handleNext = () => {
    this.setState(prevState => ({ count: prevState.count + 1 }));
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.questions !== this.props.questions) {
      let questions = this.props.questions;
      this.setState({ questions });
      this.createAnswersArr();
    }

    if (prevState.count !== this.state.count) {
      this.createAnswersArr();
    }
  }

  createAnswersArr = () => {
    let currentQuestion = this.state.questions[this.state.count];
    let temporaryAnswers = [];
    let currentAnswers = [];
    let correctAnswer;

    for (const key in currentQuestion) {
      if (key === "correct_answer" || key === "incorrect_answers") {
        temporaryAnswers.push(currentQuestion[key]);
      }
    }
    currentAnswers = temporaryAnswers.flat(2);
    correctAnswer = currentAnswers[0];

    this.setState({ currentAnswers });
    this.setState({ correctAnswer });
  };

  /* handleAnswer = e => {
    console.log(e.target.textContent);
    console.log(questions);
  }; */

  render() {
    if (!this.state.questions.length) {
      return (
        <div>
          <div
            style={{ marginTop: "5rem" }}
            className="d-flex justify-content-center"
          >
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
      let answerButton = this.state.currentAnswers.map(answer => (
        <button
          onClick={this.handleAnswer}
          type="button"
          className="btn btn-primary btn-lg"
        >
          {he.decode(answer)}
        </button>
      ));

      return (
        <div className="my-4">
          <div
            className="alert alert-primary"
            style={{ fontSize: "2rem", marginTop: "4rem" }}
            role="alert"
          >
            {he.decode(this.state.questions[this.state.count].question)}
          </div>

          <div style={{ paddingTop: "4rem" }}>{answerButton}</div>

          <div className="d-flex justify-content-center my-4">
            <div className="alert alert-info mr-4" role="alert">
              Question : {this.state.count + 1} / {this.state.questions.length}
            </div>
            <div className="alert alert-dark ml-4" role="alert">
              Score : {this.state.score}
            </div>
          </div>
          <button
            onClick={this.handleNext}
            type="button"
            className="btn btn-primary btn-lg"
          >
            NEXT QUESTION
          </button>
        </div>
      );
    }
  }
}

export default ShowQuiz;

/* let currentQuestion = questions[this.state.count];
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
      console.log(currentAnswers); */
