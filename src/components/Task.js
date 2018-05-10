import React, { Component } from "react";
import "../stylesheets/Task.css";

/**
 * This class represents a component which is just the individual task which is displayed back as individual list items
 * to the user.
 */
class Task extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listItemClass: this.getListItemClass()
    };
  }

  /**
   * @returns {string} A class name based on the status of the task (such as being locked, complete, or incomplete).
   */
  getListItemClass() {
    let task = this.props.task;
    if(task.isLocked) {
      return "locked";
    } else {
      if(task.completedAt !== null) {
        return "complete";
      }
      else {
        return "incomplete";
      }
    }
  }


  /**
   * this function calls a function which toggles the status of the task: (locked, complete, or incomplete)
   * this function also calls another function which updates the status of all other tasks to ensure that tasks
   * that should be locked after a dependent task becomes incomplete.
   */
  toggleListItem(task) {
    this.props.toggleTaskCompletionHandler(task);
  }

  render() {
    let taskId = "task " + this.props.task.id;
    return (
      <li
        className = {this.state.listItemClass}
        onClick={() => {
          this.toggleListItem(this.props.task);
        }}
        ref={taskId}
        id={taskId}>{this.props.task.task}
      </li>
    );
  }
}

export default Task;