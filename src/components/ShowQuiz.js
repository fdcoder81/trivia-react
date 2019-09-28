import React from "react";
import he from "he";

class ShowQuiz extends React.Component {
  state = {
    count: 0,
    score: 0,
    questions: [],
    currentAnswers: [],
    correctAnswer: "",
    isNextVisible: false,
    isCorrect: null,
    endGame: false
  };

  divRef = React.createRef();

  handleNext = () => {
    this.setState({ isCorrect: null });
    this.setState(prevState => ({ isNextVisible: !prevState.isNextVisible }));

    this.enableButtons();
    this.divRef.current.childNodes.forEach(e => {
      if (
        e.classList.contains("btn-success") ||
        e.classList.contains("btn-danger")
      ) {
        e.classList.replace("btn-success", "btn-primary");
        e.classList.replace("btn-danger", "btn-primary");
      }
    });

    if (this.state.count < 9) {
      this.setState(prevState => ({ count: prevState.count + 1 }));
    } else {
      this.disableButtons();
      this.setState(prevState => ({ endGame: !prevState.endGame }));
    }
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
    if (e.target.textContent === this.state.correctAnswer) {
      e.target.classList.replace("btn-primary", "btn-success");
      this.setState(prevState => ({ score: prevState.score + 1 }));
      this.setState({ isCorrect: true });
    } else {
      e.target.classList.replace("btn-primary", "btn-danger");
      this.setState({ isCorrect: false });
    }
    this.disableButtons();
    this.setState(prevState => ({ isNextVisible: !prevState.isNextVisible }));
  };

  disableButtons = () => {
    this.divRef.current.childNodes.forEach(e => {
      e.setAttribute("disabled", "disabled");
    });
  };

  enableButtons = () => {
    this.divRef.current.childNodes.forEach(e => {
      e.removeAttribute("disabled");
    });
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
      let answerButton = this.state.currentAnswers.map((answer, index) => (
        <button
          key={index}
          onClick={this.handleAnswer}
          type="button"
          className="btn btn-primary btn-lg m-2"
        >
          {he.decode(answer)}
        </button>
      ));

      let infoAlert;
      if (this.state.isCorrect === true) {
        infoAlert = (
          <div
            className="alert alert-warning font-weight-bold ml-4"
            role="alert"
          >
            Correct!
          </div>
        );
      } else if (this.state.isCorrect === false) {
        infoAlert = (
          <div
            className="alert alert-warning font-weight-bold ml-4"
            role="alert"
          >
            Wrong
          </div>
        );
      }

      return (
        <div className="my-2">
          <div className="alert alert-primary questions-title" role="alert">
            {he.decode(this.state.questions[this.state.count].question)}
          </div>

          <div className="answer-button" ref={this.divRef}>
            {answerButton}
          </div>

          <div className="d-flex justify-content-center my-4">
            <div className="alert alert-info mr-2" role="alert">
              Question : {this.state.count + 1} / {this.state.questions.length}
            </div>
            <div className="alert alert-dark ml-2" role="alert">
              Score : {this.state.score}{" "}
            </div>
            {infoAlert}
          </div>

          {this.state.isNextVisible ? (
            <button
              onClick={this.handleNext}
              type="button"
              className="btn btn-primary btn-lg"
            >
              NEXT QUESTION
            </button>
          ) : null}

          {this.state.endGame ? (
            <div
              style={{ top: "50%" }}
              className="alert alert-success position-absolute fixed-top w-25 mx-auto"
              role="alert"
            >
              <h2 className="alert-heading mt-4">Quiz done!</h2>
              <h4 className="my-4">Your score : {this.state.score}</h4>
              <button
                onClick={this.props.newGame}
                type="button"
                className="btn btn-primary btn-lg my-4"
              >
                NEW GAME
              </button>
            </div>
          ) : null}
        </div>
      );
    }
  }
}

export default ShowQuiz;
