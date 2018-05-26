import React, {Component} from "react";
import Task from "./Task";
import "../stylesheets/TaskList.css";

/**
 * This component generates a list of the tasks of a group and allows the user to view all the task group names.
 */
class TaskList extends Component {
  render() {
    return (
      <div className="TaskListContainer">
        <div className="TaskListLabel">
          <div className="TasksInformation">
            <span id={this.props.completedTaskSpanId}>
              {this.props.completedTasksInGroup[this.props.indexOfCurrentGroup]}
            </span> OF {this.props.listOfTasksFromGroup.length} TASKS COMPLETE
          </div>
          <div className="DisplayGroups">
            <h5 onClick={() => {this.props.showTaskGroups()}}>View All Groups</h5>
          </div>
          <div className="TaskList">
            <ul>
              {this.props.listOfTasksFromGroup.map((task, index) => {
                this.props.toggleTaskStatus(task); // ensure tasks have the proper status (incomplete/complete/locked).
                return (
                    <Task
                        key={index}
                        toggleTaskCompletionHandler={this.props.toggleTaskCompletion}
                        task={task}/>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default TaskList;