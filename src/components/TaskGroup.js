import React, { Component } from "react";
import "../stylesheets/TaskGroup.css";
import "../stylesheets/ListItem.css";
import Task from "./Task";
import groupImage from "../images/Group.svg";

/**
 * This component represents each individual TaskGroup that holds individual tasks which are grouped/separated by
 * the "group" property from the original payload sample data.
 */
class TaskGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShowing: false,
      groupNumber: this.props.groupNumber,
      numberOfTasks: this.props.taskGroup.length,
      completedTasks: this.props.completedTasks
    }
  }

  /**
   * This is an event handler which is responsible for handling when the TaskGroup is clicked on and toggles between
   * displaying the list of tasks inside of a group or hiding them.
   */
  hideGroup() {
    let isShowing = this.state.isShowing;
    isShowing = !isShowing;
    this.setState({
      isShowing: isShowing
    });
  }

  render() {
    let displayType = this.state.isShowing? '' : 'hideGroup';
    let completedTaskSpanId = "completedTasks " + this.state.groupNumber;
    /**
     * takes in an array with the groups and then prints them in separate unordered list groups.
     */
    return (
        <div>
          <div className="TaskGroup">
            <div className="TaskGroupButton">
              <input type="image"
                     src={groupImage}
                     alt="Group"
                     onClick={() => this.hideGroup()}/>
            </div>
            <div className="TaskGroupContent">
              <div>
                Task Group {this.state.groupNumber}
              </div>
              <div>
                <span id={completedTaskSpanId}>{this.state.completedTasks}</span> OF {this.state.numberOfTasks} TASKS COMPLETE
                <ul className={displayType} id={this.props.listId}>
                  {this.props.taskGroup.map((task, index) => {
                    return (
                        <Task
                            key={index}
                            toggleTaskCompletionHandler={this.props.toggleTaskCompletionHandler}
                            task={task}/>
                    )
                  })}
                </ul>
              </div>
            </div>
          </div>
          <hr/>
        </div>

    );
  }
}

export default TaskGroup;