import ProjectsListing from "./components/ProjectsListing/ProjectsListing";
import "./App.css";
import { initDB, loadProjects } from "./indexedDatabase/connection";
import { useEffect, useState } from "react";

function App() {
  const [projects, setProjects] = useState([]);
  
  useEffect(() => {
    initDB() // Establish IndexedDB connection
      .then(() => {
        // Fetch projects data after the connection is established
        // I must check the number of projects in the indexed Databaase. 
        // I must check the number of projects stored in the indexed database
        // If number of projects is not more than 1, then default projects,
        // will be loaded else existing projects will be loaded
        // Now connection to Indexed Database is successful, I should check the number
        // of projects residing "projects" store.
        loadProjects()
          .then((projectsData) => {
            console.log("Projects data:", projectsData);
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
        {/* <button onClick={loadProjects}>Load Projects</button> */}
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
