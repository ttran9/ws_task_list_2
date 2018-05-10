import React, { Component } from "react";
import "../stylesheets/ThingsToDo.css";
import TaskGroupContainer from "./TaskGroupContainer";

/**
 * This class represents a component which holds one of the two main containers for this task list application.
 */
class ThingsToDo extends Component {
  render() {
    return (
        <div className="ThingsToDo">
          <h1>Things To Do</h1>
          <hr/>
          <TaskGroupContainer tasks={this.props.tasks}/>
        </div>
    );
  }
}

export default ThingsToDo;