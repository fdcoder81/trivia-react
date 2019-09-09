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

  divRef = React.createRef();

  handleNext = () => {
    this.setState(prevState => ({ count: prevState.count + 1 }));
    console.log(this.divRef);
    this.divRef.current.childNodes.forEach(e => {
      console.log(e.classList);
      if (
        e.classList.contains("btn-success") ||
        e.classList.contains("btn-danger")
      ) {
        e.classList.replace("btn-success", "btn-primary");
        e.classList.replace("btn-danger", "btn-primary");
      }
    });
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

    currentAnswers = currentAnswers
      .map(a => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map(a => a[1]);

    this.setState({ currentAnswers });
    this.setState({ correctAnswer });
  };

  handleAnswer = e => {
    console.log(this.state.currentAnswers);
    console.log(e.target.textContent);
    console.log(this.state.correctAnswer);
    if (e.target.textContent === this.state.correctAnswer) {
      e.target.classList.replace("btn-primary", "btn-success");
      this.setState(prevState => ({ score: prevState.score + 1 }));
    } else {
      e.target.classList.replace("btn-primary", "btn-danger");
    }
  };

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
          className="btn btn-primary btn-lg m-4"
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

          <div ref={this.divRef} style={{ paddingTop: "4rem" }}>
            {answerButton}
          </div>

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
