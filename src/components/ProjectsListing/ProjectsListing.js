import "./ProjectsListing.css";
import { GrAdd } from "react-icons/gr";
import ProjectDescription from "../ProjectDescription/ProjectDescription";
import { useEffect, useState } from "react";
import { uid } from "./uid";
import { makeTX } from "../../indexedDatabase/connection";

const ProjectsListing = ({ allProjects }) => {
  const [projectId, setProjectId] = useState(allProjects[0].projectId);
  console.log(`I am allProjects ${allProjects}`);
  // return allProjects.map((project) => project.projectTitle);

  const handleProjectSelection = (projectId) => {
    console.log(`Project Id is ${projectId}`);
    setProjectId(projectId);
  };


  return (
    <>
      <div className="projects-listing-section">
        <h2>Projects</h2>
        <ol style={{ listStyle: "none" }}>
          {allProjects && allProjects.map((project) => (
            <li key={project.projectId}>
              <button
                type="button"
                style={{ cursor: "pointer" }}
                className="project-select-button"
                onClick={() => handleProjectSelection(project.projectId)}
              >
                {project.projectId === projectId ? (<u>{project.projectTitle}</u>) : project.projectTitle}
              </button>
            </li>
          ))}
          <br />
          {/* <button> */}
          <div className="project-add-div">
            <GrAdd className="project-add-icon" />
            <input
              type="text"
              placeholder="New Project"
              // onChange={handleProjectNameChange}
              // onKeyDown={handleKeyDown}
              // value={projectName}
            />
          </div>
        </ol>
      </div>
      <ProjectDescription project={allProjects.find(project => project.projectId === projectId)} />
    </>
  );
};

export default ProjectsListing;
