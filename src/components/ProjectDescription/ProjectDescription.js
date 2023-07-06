import "./ProjectDescription.css";
import TaskItem from "../TaskItem/TaskItem";
import { useEffect, useState, useRef } from "react";
import { updateProject } from "../../indexedDatabase/connection";

const ProjectDescription = ({ project }) => {
  console.log(`I am inside project ${project.projectId}`);
  const [newTask, setNewTask] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [taskAddButtonActive, setTaskAddButtonActive] = useState(false);
  const [title, setTitle] = useState(project.projectTitle);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const taskItemTitleRef = useRef(null);

  const addTaskHandler = (event) => {
    event.preventDefault();
    let updatedProject = {
      projectId: project.projectId,
      projectTitle: project.projectTitle,
      tasks: [
        { taskId: 1, taskTitle: newTask, taskDescription: newTaskDescription },
      ],
    };

    // Add tasks to the projects store
    // I have to update the projects object
    // Update the Project object with tasks items
    updateProject(updatedProject)
      .then(() => {
        console.log("Success in putting requests");
      })
      .catch((error) => console.log("Error in udpating projects", error));
    console.log("Updated Project is", updatedProject);
    setNewTask("");
    setNewTaskDescription("");
    setTaskAddButtonActive(false);
  };

  const handleNewTask = (event) => {
    setNewTask(event.target.value);
    if (event.target.value.trim() && newTaskDescription.trim()) {
      setTaskAddButtonActive(true);
    } else {
      setTaskAddButtonActive(false);
    }
  };

  const handleNewTaskDescription = (event) => {
    setNewTaskDescription(event.target.value);
    if (newTask.trim() && event.target.value.trim()) {
      setTaskAddButtonActive(true);
    } else {
      setTaskAddButtonActive(false);
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

  useEffect(() => {
    taskItemTitleRef.current.focus();
    console.log("Title is", title);
  }, [title]);

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
      <form onSubmit={addTaskHandler}>
        <div className="todo-input-items-wrapper">
          <div className="todo-input-item">
            <label>Title</label>
            <input
              ref={taskItemTitleRef}
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
              type="submit"
              className="add-task-button"
              onClick={addTaskHandler}
              disabled={!taskAddButtonActive}
            >
              Add
            </button>
          </div>
        </div>
      </form>
      <ul className="todo-lists">
        {project.tasks &&
          project.tasks.map((task) => {
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
