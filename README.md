# Wonderschool Task List Prototype

## Discussion about the algorithm(s):
- Inside of the TaskGroupContainer component I decided to define a series of functions (starting with 
toggleTaskCompletion()) that respond to a list item Onclick event which can potentially unlock Task(s) components 
(list items) if another task becomes complete.
	- The algorithm I used is inefficient because it traverses each task to ensure if it becomes unlocked for the next 
	time a user attempts to click on it to mark it as either incomplete or complete. However, I decided to implement 
	the algorithm this way as I figured it was the most complete way to ensure that there was no side effect to make 
	sure tasks would be able to be properly unlocked (able to be toggled as incomplete or complete).

## Some extra documentation related to some of the class(es).
- The below points refer to the TaskGroupContainer class (found in TaskGroupContainer.js)
    - Since I am storing the tasks into groups (an array which holds arrays (taskGroups)) I also needed a few extra data
    structures such as objects and other arrays to help track where each individual task would be.
        - I also needed a way to grab the index of a task group given both a task's individual ID through the property,
        indexOfGroupFromTaskId, and through the "group" (which is the group name) through the property, 
        indexOfGroupFromGroupName.
    - There is also an array, completedTasksInGroup, which holds the number of completed tasks for each individual group.
        - For example: performing "completedTasksInGroup[0]" would give the number of completed tasks from the tasks 
        inside of the first group which can be obtained by using "taskGroups[0]".
   - Inside of a function, parseTaskGroups I am traversing through each individual task, while going through this I also
   create a property for the task called, "isLocked" which is later used to determine if the task is either locked,
   complete, or incomplete, I was debating about having this inside of a different class, such as "TaskContainer", but
   I ultimately decided against this for now because I didn't feel that one task could update all the tasks but
   a TaskGroup (which holds Tasks can do so).     
   
- In order to update a task's status (locked/complete/incomplete) I decided to get each individual list item by the ID
attribute and then to modify the className attribute based on the locked status and the completedAt properties.
		
## Background Information:
- Some reasons I created this app/prototype
	- Another reason why I decided to do this challenge is because it was a good way for me to get my feet wet using
	React as I had no prior experience using it.
	- I decided to do this challenge as it was recommended by WonderSchool and the position I was interested in
	applying for.
	
- At the time I am writing this, I am not sure how to fully certain code/functions in the best way. If I were writing
for/with a team I would ask for a code review as I have doubts on how to organize the logic and functions.

## Running this application:
    - Make sure you have NodeJS installed, installation can be found [here](https://nodejs.org/en/download/)
	- To run this application cd into the root directory and just run it with "npm start", some introductory information
	can be found [here](https://www.npmjs.com/get-npm)
	- Going to http://localhost:3000/ will display the task list, with npm start this should automatically launch on
	your default browser.