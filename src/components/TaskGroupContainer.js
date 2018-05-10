import React, {Component} from "react";
import TaskGroup from "./TaskGroup";

/**
 * This component holds the logic used to build the TaskGroup component.
 */
class TaskGroupContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // holds the grouped tasks
      taskGroups: [],
      // keeps track of each individual task to a specific index within a group.
      indexOfIndividualTaskWithinGroup: {},
      // keeps track of what group the task maps to given its group name.
      indexOfGroupFromGroupName: {},
      // keeps track of the number of completed tasks in a group.
      completedTasksInGroup: [],
      // keeps track of what which group a task maps to based on its ID (not based on group name).
      indexOfGroupFromTaskId: {},
    };

    this.toggleTaskCompletion = this.toggleTaskCompletion.bind(this);
  }

  /**
   * @param tasks the "payload" (sample task input)
   * This traverses all the entered tasks and also adds in a property into each task to determine if it is
   * locked/complete/incomplete.
   * The tasks are grouped based on a "group" property.
   */
  parseTaskGroups(tasks) {
    /**
     * this takes in the original tasks (from the sample payload in the App class).
     */
    let taskGroups = this.state.taskGroups;
    let indexOfIndividualTaskWithinGroup = this.state.indexOfIndividualTaskWithinGroup;
    let indexOfGroupFromGroupName = this.state.indexOfGroupFromGroupName;
    let completedTasksInGroup = this.state.completedTasksInGroup;
    let indexOfGroupFromTaskId = this.state.indexOfGroupFromTaskId;
    tasks.map((task) => {
      let isTaskComplete = this.checkIfTaskIsComplete(task);

      let taskGroupName = task["group"];
      if (indexOfGroupFromGroupName[taskGroupName] != null) {
        this.parseTaskForExistingGroup(taskGroupName, isTaskComplete, task, taskGroups,
            indexOfIndividualTaskWithinGroup, indexOfGroupFromGroupName,
            completedTasksInGroup, indexOfGroupFromTaskId);
      }
      else {
        this.parseTaskForNewGroup(taskGroupName, isTaskComplete, task, taskGroups, indexOfIndividualTaskWithinGroup,
            indexOfGroupFromGroupName, completedTasksInGroup, indexOfGroupFromTaskId);
      }
      /**
       * the reason I have it out here initially at the group level is so that we can traverse through each task
       * inside of a loop but traversing through all tasks inside of a single task doesn't seem practical.
        */
      this.checkIfTaskIsLocked(task);
      return null;
    });

    this.setState = ({
      taskGroups: taskGroups,
      indexOfIndividualTaskWithinGroup: indexOfIndividualTaskWithinGroup,
      indexOfGroupFromGroupName: indexOfGroupFromGroupName,
      completedTasksInGroup: completedTasksInGroup,
      indexOfGroupFromTaskId: indexOfGroupFromTaskId,
    });
  }

  /**
   * @param taskGroupName The name of the group that the task is a part of.
   * @param isTaskComplete A boolean value to indicate if the task is incomplete or complete.
   * @param task The task object holding a variety of properties.
   * @param taskGroups An array holding an array of tasks (separated by group name).
   * @param indexOfIndividualTaskWithinGroup An integer value used to locate where an individual task is inside of the
   * taskGroups array.
   * @param indexOfGroupFromGroupName An integer value used to locate group based on the group name of the task.
   * @param completedTasksInGroup An array holding the number of tasks completed for each individual task group.
   * @param indexOfGroupFromTaskId An integer value used to locate the group based on the "id" property of the task.
   * Adds a task at the end of an existing group.
   */
  parseTaskForExistingGroup(taskGroupName, isTaskComplete, task, taskGroups, indexOfIndividualTaskWithinGroup,
                            indexOfGroupFromGroupName, completedTasksInGroup, indexOfGroupFromTaskId) {
    let indexOfGroup = indexOfGroupFromGroupName[taskGroupName];
    let tasksInGroup = taskGroups[indexOfGroup];
    // update the completed tasks of this group.
    let completedTasks = completedTasksInGroup[indexOfGroup];
    completedTasks = isTaskComplete === true ? completedTasks + 1 : completedTasks;
    completedTasksInGroup[indexOfGroup] = completedTasks;
    // note down the group index that the task is a part of.
    indexOfGroupFromTaskId[task.id] = indexOfGroup;
    // update the location of this task in the group
    indexOfIndividualTaskWithinGroup[task.id] = tasksInGroup.length;
    // add the task to the group.
    tasksInGroup.push(task);
  }

  /**
   * @param taskGroupName The name of the group that the task is a part of.
   * @param isTaskComplete A boolean value to indicate if the task is incomplete or complete.
   * @param task The task object holding a variety of properties.
   * @param taskGroups An array holding an array of tasks (separated by group name).
   * @param indexOfIndividualTaskWithinGroup An integer value used to locate where an individual task is inside of the
   * taskGroups array.
   * @param indexOfGroupFromGroupName An integer value used to locate group based on the group name of the task.
   * @param completedTasksInGroup An array holding the number of tasks completed for each individual task group.
   * @param indexOfGroupFromTaskId An integer value used to locate the group based on the "id" property of the task.
   * Adds a task into a new group.
   */
  parseTaskForNewGroup(taskGroupName, isTaskComplete, task, taskGroups, indexOfIndividualTaskWithinGroup,
                       indexOfGroupFromGroupName, completedTasksInGroup, indexOfGroupFromTaskId) {
    // note down what index this individual task is inside of this new group.
    indexOfIndividualTaskWithinGroup[task.id] = 0;
    // note down the index at which the group is at inside of the group array.
    indexOfGroupFromGroupName[taskGroupName] = taskGroups.length;
    // note down the group index that the task is a part of.
    indexOfGroupFromTaskId[task.id] = taskGroups.length;
    // update the number of completed tasks for this group.
    let numberOfCompletedTasks = 0;
    numberOfCompletedTasks = isTaskComplete === true ? numberOfCompletedTasks + 1 : numberOfCompletedTasks;
    completedTasksInGroup.push(numberOfCompletedTasks);
    // since the group doesn't exist add a new array into the taskGroups array.
    let newTaskGroup = [];
    newTaskGroup.push(task);
    taskGroups.push(newTaskGroup);
  }

  /**
   * @param task The task whose status will be toggled.
   * a function which is called when a task item (list item) inside of the TaskGroup component is clicked on.
   * tasks that are not locked will be toggled from complete to incomplete or incomplete to complete.
   * note: this is an inefficient algorithm as for now it is going to be checking over all tasks again to potentially
   * toggle them from locked to unlocked.
   */
  toggleTaskCompletion(task) {
    // get the index of the group to get the counter that holds the number of completed tasks.
    let indexOfGroupFromTask = this.state.indexOfGroupFromTaskId[task.id];
    let completedTasksInGroup = this.state.completedTasksInGroup;
    if ((!task.isLocked)) {
      this.updateTaskCompletion(task, completedTasksInGroup, indexOfGroupFromTask);
    } else {
      console.log("a locked task cannot be toggled!!");
    }
  }

  /**
   * @param task A task object used to modify the completedAt property.
   * @param completedTasksInGroup An array holding a value of how many tasks are completed in the group.
   * @param indexOfGroupFromTask The index of the group that this task is a part of.
   * Helper method to toggle a complete task into an incomplete task.
   */
  toggleCompletedTask(task, completedTasksInGroup, indexOfGroupFromTask) {
    task.completedAt = null;
    completedTasksInGroup[indexOfGroupFromTask] = completedTasksInGroup[indexOfGroupFromTask] - 1;
    console.log("task has been incompleted!");
  }

  /**
   * @param task A task object used to modify the completedAt property.
   * @param completedTasksInGroup An array holding a value of how many tasks are completed in the group.
   * @param indexOfGroupFromTask The index of the group that this task is a part of.
   * Helper method to toggle an incomplete task into a complete task.
   */
  toggleInCompleteTask(task, completedTasksInGroup, indexOfGroupFromTask) {
    task.completedAt = this.generateCurrentTime();
    completedTasksInGroup[indexOfGroupFromTask] = completedTasksInGroup[indexOfGroupFromTask] + 1;
    console.log("task has been completed!");
  }

  /**
   * @returns Generates a date formatted string of the current time.
   */
  generateCurrentTime() {
    let millisecondsFrom1970 = Date.now();
    let currentDate = new Date(millisecondsFrom1970);
    return currentDate.toLocaleString('en-US');
  }

  /**
   * @param task the individual task whose complete/incomplete/locked status is to be updated.
   * @param completedTasksInGroup an array holding the number of tasks completed for this specific task's group name.
   * @param indexOfGroupFromTask an integer value which is used to determine what index the task's group is (0 for first
   * group, 1 for second, etc).
   * A function which toggles the task's status (complete/incomplete).
   * After toggling the task, it is important to update the status of other tasks (dependent tasks will become locked
   * if a task is marked as incomplete).
   */
  updateTaskCompletion(task, completedTasksInGroup, indexOfGroupFromTask) {
    // task must be unlocked to toggle it.
    if (task.completedAt === null) {
      this.toggleInCompleteTask(task, completedTasksInGroup, indexOfGroupFromTask);
    } else {
      this.toggleCompletedTask(task, completedTasksInGroup, indexOfGroupFromTask);
    }
    /**
     * after marking a task as complete or incomplete you must ensure that dependent tasks are either locked
     * or unlocked.
     */
    this.updateTaskStatus();
    this.setState = ({
      completedTasksInGroup: completedTasksInGroup
    });
    this.updateCompletedTasksForGroup(completedTasksInGroup, indexOfGroupFromTask);
  }

  /**
   * @param completedTasksInGroup An array holding the completed tasks for each group.
   * @param indexOfGroupFromTask An integer value used to specify which group by index to update the number of
   * completed tasks.
   * Updates the number of completed tasks for a specified group via an index value.
   */
  updateCompletedTasksForGroup(completedTasksInGroup, indexOfGroupFromTask) {
    // this is not 0'th index based but 1'th index, so adding 1 is necessary here.
    let completedTaskSpanId = "completedTasks " + (indexOfGroupFromTask + 1);
    let spanWithCompletedTask = document.getElementById(completedTaskSpanId);
    // grab the span that holds the number of completed tasks and update it.
    if (spanWithCompletedTask !== null) {
      spanWithCompletedTask.innerHTML = completedTasksInGroup[indexOfGroupFromTask];
    }
  }

  /**
   * this updates the status of each task (locked/complete/incomplete).
   * a helper function is then called to change the class of individual list items and reflect changes such as
   * a list item going from being complete or incomplete to being locked.
   */
  updateTaskStatus() {
    let taskGroups = this.state.taskGroups;
    /**
     * go inside of each task group and check the individual tasks to see if they are now unlocked.
     * this is inefficient as it will check all tasks not just tasks that originally were called by this function
     * because of a dependent task being marked as complete.
     */
    taskGroups.map((taskGroup) => {
      taskGroup.map((task) => {
        this.checkIfTaskIsLocked(task);
        this.toggleTaskStatus(task);
        return null;
      });
      return null;
    });
  }

  /**
   * @param task The task item used to locate an individual list item
   * Changes the class name of a task such as going from being complete or incomplete to locked or locked to either
   * complete or incomplete.
   */
  toggleTaskStatus(task) {
    let taskId = "task " + task.id;
    let taskListItem = document.getElementById(taskId);
    if(taskListItem !== undefined) {
      if(task["isLocked"]) {
        taskListItem.className = "locked";
      } else {
        if(task.completedAt === null) {
          taskListItem.className = "incomplete";
        }
        else {
          taskListItem.className = "complete";
        }
      }
    }

  }

  /**
   * @returns false if the completedAt property is null otherwise true.
   */
  checkIfTaskIsComplete(task) {
    if (task.completedAt !== null) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * @param task The task whose isLocked property will be checked.
   * Checks if a task is locked by looking at all if its dependent tasks to see if they are all completed, if
   * there are no dependent tasks or if they dependent tasks are not a part of other groups (such as a task ID) that is
   * not currently stored inside of indexOfIndividualTaskWithinGroup property of the state then the task is unlocked.
   */
  checkIfTaskIsLocked(task) {
    if (task.dependencyIds.length === 0) {
      // unlocked because it has no dependencies.
      task["isLocked"] = false;
    } else {
      this.checkTaskLockedStatus(task);
    }
  }

  /**
   * @param task The task whose isLocked property will be checked.
   * Go through all the dependent tasks and check if they are all completed, if so the task is unlocked, otherwise
   * the task is locked (taskIsLocked will be true).
   */
  checkTaskLockedStatus(task) {
        // check all of its dependencies to see if they are unlocked.
    let dependencyIds = task.dependencyIds;
    let taskIsLocked = false;
    // go through the dependent tasks and make sure they are all complete (for the task to be unlocked).
    let indexOfIndividualTaskWithinGroup = this.state.indexOfIndividualTaskWithinGroup;
    let indexOfGroupFromTaskId = this.state.indexOfGroupFromTaskId;
    let taskGroups = this.state.taskGroups;
    for (let index = 0; index < dependencyIds.length; index++) {
      taskIsLocked = this.checkAllDependentTasks(dependencyIds, indexOfIndividualTaskWithinGroup,
          indexOfGroupFromTaskId, taskGroups, index);
    }
    task["isLocked"] = taskIsLocked;
  }

  /**
   * @param dependencyIds A list of task ids
   * @param indexOfIndividualTaskWithinGroup Maps a task id to its index inside of its group.
   * @param indexOfGroupFromTaskId Maps a task id to the index of an array (which holds the tasks of a group).
   * @param taskGroups An array which holds an array of tasks.
   * @param index The current dependent task from the dependentIds of a task.
   * @returns {boolean} true if the task is is locked otherwise false.
   * This function takes in an array of dependent task IDs and checks each one to see if any are incomplete, the
   * completedAt will be null and if so then the function returns "true" which means the task is locked otherwise
   * the task is unlocked and the function returns false.
   */
  checkAllDependentTasks(dependencyIds, indexOfIndividualTaskWithinGroup, indexOfGroupFromTaskId, taskGroups, index) {
    let taskIsLocked = false; // by default assume the task is unlocked.
    let taskId = dependencyIds[index];
    /**
     * need to use the task id to get the index of the group.
     * also need to use the task id to figure out where exactly the task is within the group.
     * the two variables below will be checked to ensure that there is a group that contains the task and that it
     * is part of a group (an array inside of an array).
     */
    let indexOfGroupFromId = indexOfGroupFromTaskId[taskId];
    let indexOfTaskWithinGroupFromId = indexOfIndividualTaskWithinGroup[taskId];
    if (indexOfGroupFromId !== undefined) {
      if (indexOfTaskWithinGroupFromId !== undefined) {
        // this check is to ensure that there is a group that contains this task id.
        if (taskGroups[indexOfGroupFromId] !== undefined) {
          let groupOfTask = taskGroups[indexOfGroupFromId];
          if (groupOfTask !== undefined) {
            let task = groupOfTask[indexOfTaskWithinGroupFromId];
            // this verifies that the passed in dependent task has already been grouped.
            if (task !== undefined) {
              if (task.completedAt === null) {
                // a task that the current task is dependent is not complete so locked.
                return true;
              }
            }
          }
        }
      }
    }
    return taskIsLocked;
  }

  render() {
    this.parseTaskGroups(this.props.tasks);
    return (
        <div className="TaskContainer">
          {this.state.taskGroups.map((taskGroup, index) => {
            let groupNumber = index + 1;
            let listId = "TaskGroupUL" + groupNumber;
            let taskGroupId = "TaskGroupId" + groupNumber;
            return (
                <TaskGroup
                  key={index}
                  groupNumber={groupNumber}
                  listId={listId}
                  taskGroupId={taskGroupId}
                  taskGroup={taskGroup}
                  toggleTaskCompletionHandler={this.toggleTaskCompletion}
                  completedTasks={this.state.completedTasksInGroup[index]}
                />
            );
          })}
        </div>
    );
  }
}

export default TaskGroupContainer;