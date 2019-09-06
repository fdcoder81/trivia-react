import React from "react";
import he from "he";

class ShowQuiz extends React.Component {
  state = { count: 0 };

  handleNext = () => {
    this.setState(prevState => ({ count: prevState.count + 1 }));
  };

  render() {
    let questions = this.props.questions;
    console.log(questions);

    if (!questions.length) {
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
      let currentQuestion = questions[this.state.count];
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
        <div className="my-4">
          <div
            className="alert alert-primary"
            style={{ fontSize: "2rem", marginTop: "4rem" }}
            role="alert"
          >
            {he.decode(currentQuestion.question)}
          </div>

          <div style={{ paddingTop: "4rem" }}>{answerButton}</div>

          <div className="d-flex justify-content-center my-4">
            <div className="alert alert-info mr-4" role="alert">
              Question : 0 / {questions.length}
            </div>
            <div className="alert alert-dark ml-4" role="alert">
              Score : 0
            </div>
            <button
              onClick={this.handleNext}
              type="button"
              className="btn btn-primary btn-lg"
            >
              NEXT QUESTION
            </button>
          </div>
        </div>
      );
    }
  }
}

export default ShowQuiz;
