import React, { Component } from "react";
import "../stylesheets/App.css";
import TaskGroupContainer from "./TaskGroupContainer";

/**
 * Entry point to the task list.
 */
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      payload: []
    };
  }

  /**
   * the example payload to be displayed (add bootstrap data).
   */
  generateSamplePayload() {
    let payload = [
      {
        id: 1,
        group: "Purchases",
        task: "Go to the bank",
        dependencyIds: [],
        completedAt: null,
      },
      {
        id: 2,
        group: "Purchases",
        task: "Buy hammer",
        dependencyIds: [1],
        completedAt: null,
      },
      {
        id: 3,
        group: "Purchases",
        task: "Buy wood",
        dependencyIds: [1],
        completedAt: null,
      },
      {
        id: 4,
        group: "Purchases",
        task: "Buy nails",
        dependencyIds: [1],
        completedAt: null,
      },
      {
        id: 5,
        group: "Purchases",
        task: "Buy paint",
        dependencyIds: [1],
        completedAt: null,
      },
      {
        id: 6,
        group: "Build Airplane",
        task: "Hammer nails into wood",
        dependencyIds: [2, 3, 4],
        completedAt: null,
      },
      {
        id: 7,
        group: "Build Airplane",
        task: "Paint wings",
        dependencyIds: [5, 6],
        completedAt: null,
      },
      {
        id: 8,
        group: "Build Airplane",
        task: "Have a snack",
        dependencyIds: [11],
        completedAt: null,
      }
    ];
    return payload;
  }

  /**
   * this is a function to setting sample hard-coded payload for testing.
   */
  componentWillMount() {
    let payload = this.generateSamplePayload();
    this.setPayload(payload);
  }

  setPayload(payload) {
    this.setState({
      payload: payload
    })
  }

  render() {
    this.generateSamplePayload();
    console.log(this.state.payload);
    return (
        <div className="container">
          <TaskGroupContainer tasks={this.state.payload}/>
        </div>
    );
  }
}

export default App