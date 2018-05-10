import React, { Component } from "react";
import "../stylesheets/TaskGroupList.css";
import "../stylesheets/ListItem.css";
import TaskGroupListItem from "./TaskGroupListItem";

class TaskGroupList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groups: [
        {
          className: "locked",
          groupDescription: "Locked Task"
        },
        {
          className: "incomplete",
          groupDescription: "Incomplete Task"
        },
        {
          className: "complete",
          groupDescription: "Completed Task"
        },
      ],
      taskSeparatorClass: "taskGroupSeparator"
    };
  }

  render() {
    return (
      <div className="TaskGroupList">
        <div className="TaskGroupListLabel">
          <h1>Task Group</h1>
        </div>
        <div className="TaskGroupListDisplay">
          <h1>All Groups</h1>
        </div>
        <hr/>
        <div className="TaskGroups">
          <ul>
            {this.state.groups.map((group, index) => {
              return (
                <TaskGroupListItem
                    key={index}
                    group={group}
                    taskSeparatorClass={this.state.taskSeparatorClass}/>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default TaskGroupList;