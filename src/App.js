import { useState } from "react";
import TaskItem from "./components/TaskItem/TaskItem";
import './App.css';

function App() {
  const [toBeAddedTask, setToBeAddedTask] = useState("");

  return (
    <div className="App">
      <div className="heading-wrapper">
        <h1 className="heading">TO-DOOOOO</h1>
      </div>
      {/* Wrapper section consisting of both left divs and right divs */}
      <div className="body-section">
        {/* project section is at left side */}
        <div className="project-section">
          <h2>Projects</h2>
          <ol>
            <li>Get yourself a umbrella</li>
            <li>Swimming lessons</li>
          </ol>
        </div>
        <div className="project-task-section">
          <h2>Project 1: Get yourself a umbrella</h2>
          <div className="todo-input-items-wrapper">
            <div className="todo-input-item">
              <label>Title</label>
              <input type="text" placeholder="Title umbrella color" />
            </div>
            <div className="todo-input-item">
              <label>Description</label>
              <input type="text" placeholder="Describe Umbrella color" />
            </div>
            <div className="todo-input-item">
              <button type="button" className="add-task-button">
                Add
              </button>
            </div>
          </div>
          <ul className="todo-lists">
            <TaskItem title="Get to the Umbrella Shop " />
            <TaskItem title="Select the color of the umbrella " />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
