import React, { Component } from "react";

/**
 * This component displays a list of the group names and each group name (list item) has an event handler registered
 * to it that allows for displaying tasks inside of the selected group.
 */
class TaskGroup extends Component {
  render() {
    /**
     * this just takes in an array of group names and displays them and uses
     * an on click event handler to modify the parent container to display a different component
     * which displays the tasks inside of the group.
     */
    return (
        <div className="TaskGroupList">
          <ul>
            {this.props.groupNames.map((group, index) => {
              return (
                <li
                  key={index}
                  onClick={() => {this.props.getTaskListFromIndex(index)}}>
                  {group}
                </li>
              );
            })}
          </ul>
        </div>
    );
  }
}

export default TaskGroup;