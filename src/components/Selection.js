import React from "react";

class Selection extends React.Component {
  state = { category: "Mix", difficulty: "Easy" };

  sendData = () => {
    this.props.handleStart(this.state);
  };

  render() {
    const categories = ["Mix", "Sports", "History", "Movies", "Geography"];
    const difficulty = ["Easy", "Medium", "Hard"];

    const categoryButton = categories.map(category => (
      <button
        type="button"
        className={`list-group-item list-group-item-action ${
          this.state.category === category ? "active" : ""
        } `}
        onClick={() => this.setState({ category: category })}
      >
        {category}
      </button>
    ));

    const difficultyButton = difficulty.map(difficulty => (
      <button
        type="button"
        className={`list-group-item list-group-item-action ${
          this.state.difficulty === difficulty ? "active" : ""
        } `}
        onClick={() => this.setState({ difficulty: difficulty })}
      >
        {difficulty}
      </button>
    ));

    return (
      <div className="border rounded w-75 mx-auto">
        <div className="row pt-4">
          <div className="col-6">
            <div className="list-group w-75 ml-auto">
              <p>Choose a category</p>
              {categoryButton}
            </div>
          </div>
          <div className="col-6">
            <div className="list-group w-50 mr-auto">
              <p>Choose the difficulty</p>
              {difficultyButton}
            </div>
          </div>
        </div>
        <button
          onClick={this.sendData}
          className="btn btn-outline-primary my-4"
        >
          START
        </button>
      </div>
    );
  }
}

export default Selection;
