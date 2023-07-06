import "./ProjectsListing.css";
import { GrAdd } from "react-icons/gr";
import ProjectDescription from "../ProjectDescription/ProjectDescription";
import { useState } from "react";
import { addProject } from "../../indexedDatabase/connection";

const ProjectsListing = ({ allProjects, updateProjectsList }) => {
  const [projectId, setProjectId] = useState(allProjects[0].projectId);
  const [projectName, setProjectName] = useState("");

  const handleProjectNameChange = (event) => {
    setProjectName(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      console.log(`Project title is ${projectName}`);
      projectName.trim().length > 0 &&
        addProject(projectName)
          .then((newProject) => {
            updateProjectsList(newProject);
            setProjectName("");
            setProjectId(newProject.projectId);
          })
          .catch((error) => console.log("Could not load added project", error));
    }
  };

  const handleProjectSelection = (projectId) => {
    setProjectId(projectId);
  };

  return (
    <>
      <div className="projects-listing-section">
        <h2>Projects</h2>
        <ol style={{ listStyle: "none" }}>
          {allProjects &&
            allProjects.map((project) => (
              <li key={project.projectId}>
                <button
                  type="button"
                  style={{ cursor: "pointer" }}
                  className="project-select-button"
                  onClick={() => handleProjectSelection(project.projectId)}
                >
                  {project.projectId === projectId ? (
                    <u>{project.projectTitle}</u>
                  ) : (
                    project.projectTitle
                  )}
                </button>
              </li>
            ))}
          <br />
          <div className="project-add-div">
            <GrAdd className="project-add-icon" />
            <input
              type="text"
              placeholder="New Project"
              onChange={handleProjectNameChange}
              onKeyDown={handleKeyDown}
              value={projectName}
            />
          </div>
        </ol>
      </div>
      <ProjectDescription
        project={allProjects.find((project) => project.projectId === projectId)}
      />
    </>
  );
};

export default ProjectsListing;
