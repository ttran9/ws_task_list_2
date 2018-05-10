import React, { Component } from "react";

class TaskGroupListItem extends Component {

  render() {
    return [
      <li
          className={this.props.group.className}>{this.props.group.groupDescription}
      </li>,
      <hr className={this.props.taskSeparatorClass}/>
    ];
  }
}

export default TaskGroupListItem;