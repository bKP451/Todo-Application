import "./ProjectDescription.css";
import TaskItem from "../TaskItem/TaskItem";
import { useEffect, useState } from "react";

const ProjectDescription = ({ project }) => {
  const [newTask, setNewTask] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [taskAddButtonActive, setTaskAddButtonActive] = useState(false);
  const [title, setTitle] = useState(project.projectTitle);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  console.log(`I am project prop`, project);
  const addTaskHandler = () => {
    let myNewTask = {
      taskTitle: newTask,
      taskDescription: newTaskDescription,
    };
    // localStorage.setItem("mytodoList", JSON.stringify(myNewTask));
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

  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const enableEditMode = (e) => {
    setIsEditing(true);
    setNewTitle(title);
  };

  const disableEditMode = (event) => {
    setIsEditing(false);
    setTitle(newTitle);
  };

  useEffect(() => {
    setTitle(project.projectTitle);
  }, [project]);

  return (
    <div className="project-description-section">
      {isEditing ? (
        <input
          type="text"
          value={newTitle}
          onChange={handleTitleChange}
          onBlur={disableEditMode}
        />
      ) : (
        <h2 onClick={enableEditMode}>{title}</h2>
      )}
      {/* <h2 onClick={enableEditMode}>{title}</h2> */}
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
        {project.tasks && project.tasks.map((task) => {
          return (
            <li key={task.id} className="single-todo-item">
              <TaskItem
                title={task.taskTitle}
                description={task.taskDescription}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProjectDescription;
