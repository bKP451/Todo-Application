import "./ProjectDescription.css";
import TaskItem from "../TaskItem/TaskItem";
import { useState } from "react";

const ProjectDescription = () => {
  const [newTask, setNewTask] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [taskAddButtonActive, setTaskAddButtonActive] = useState(false);

  const addTaskHandler = () => {
    let myNewTask = {
      taskTitle: newTask,
      taskDescription: newTaskDescription,
    };
    localStorage.setItem("mytodoList", JSON.stringify(myNewTask));
    setNewTask("");
    setNewTaskDescription("");
  };

  const handleNewTask = (event) => {
    setNewTask(event.target.value);
    if(event.target.value && newTaskDescription){setTaskAddButtonActive(true)}
  };

  const handleNewTaskDescription = (event) => {
    setNewTaskDescription(event.target.value);
    if(newTask && event.target.value){setTaskAddButtonActive(true)}
  };

  

  return (
    <div className="project-description-section">
      <h2>Project 1: Get yourself a umbrella</h2>
      <div className="todo-input-items-wrapper">
        <div className="todo-input-item">
          <label>Title</label>
          <input
            type="text"
            placeholder="Choose Umbrella color"
            value={newTask}
            onChange={handleNewTask}
          />
        </div>
        <div className="todo-input-item">
          <label>Description</label>
          <input
            type="text"
            placeholder="Describe Umbrella color"
            value={newTaskDescription}
            onChange={handleNewTaskDescription}
          />
        </div>
        <div className="todo-input-item">
          <button
            type="button"
            className="add-task-button"
            onClick={addTaskHandler}
            disabled={!taskAddButtonActive}
          >
            Add
          </button>
        </div>
      </div>
      <ul className="todo-lists">
        <TaskItem
          title="Get to the Umbrella Shop "
          description="You have to know where to get the good umbrellas. You can ask your pals about it."
        />
        <TaskItem
          title="Select the color of the umbrella "
          description="The color of the new umbrella is very important. The color of the umbrella sets your mood. Which color makes you pleasant?"
        />
      </ul>
    </div>
  );
};

export default ProjectDescription;
