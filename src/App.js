import ProjectsListing from "./components/ProjectsListing/ProjectsListing";
import "./App.css";
import {
  initDB,
  loadProjects,
  addDefaultProjects,
} from "./indexedDatabase/connection";
import { useEffect, useState } from "react";

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    initDB() // Establish IndexedDB connection
      .then(() => {
        loadProjects()
          .then((projectsData) => {
            console.log("Projects data:", projectsData);
            console.log(
              "Projects data length inside App.js ",
              projectsData.length
            );
            if (projectsData.length === 0) {
              addDefaultProjects().then((defaultProject) => {
                setProjects([defaultProject]);
              }).catch((error)=> console.log("Error while adding default projects", error));
            }
            setProjects(projectsData); // Update projects state with fetched data
          })
          .catch((error) => {
            console.log("Error fetching projects:", error);
          });
      })
      .catch((error) => {
        console.log("Error initializing IndexedDB:", error);
      });
  }, []);

  return (
    <div className="App">
      <div className="heading-wrapper">
        <h1 className="heading">TO-DOOOOO</h1>
      </div>
      <div className="body-section">
        {projects.length > 0 ? (
          <ProjectsListing allProjects={projects} />
        ) : (
          <p>Loading projects...</p>
        )}
      </div>
    </div>
  );
}

export default App;
