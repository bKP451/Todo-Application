import "./ProjectDescription.css";
import TaskItem from "../TaskItem/TaskItem";
import { useState } from "react";

const ProjectDescription = ({ project }) => {
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
    if (event.target.value && newTaskDescription) {
      setTaskAddButtonActive(true);
    }
  };

  const handleNewTaskDescription = (event) => {
    setNewTaskDescription(event.target.value);
    if (newTask && event.target.value) {
      setTaskAddButtonActive(true);
    }
  };

  return (
    <div className="project-description-section">
      <h2>{project.projectTitle}</h2>
      <div className="todo-input-items-wrapper">
        <div className="todo-input-item">
          <label>Title</label>
          <input
            type="text"
            placeholder="Task title"
            value={newTask}
            onChange={handleNewTask}
          />
        </div>
        <div className="todo-input-item">
          <label>Description</label>
          <input
            type="text"
            placeholder="Task description"
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
        <li>
          {project.tasks.map((task) => {
            return (
              <TaskItem
                title={task.taskTitle}
                description={task.taskDescription}
              />
            );
          })}
        </li>
      </ul>
    </div>
  );
};

export default ProjectDescription;
