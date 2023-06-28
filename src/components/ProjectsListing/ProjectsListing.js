import "./ProjectsListing.css";
import { GrAdd } from "react-icons/gr";
import ProjectDescription from "../ProjectDescription/ProjectDescription";
import { useState } from "react";

const ProjectsListing = ({ allProjects }) => {
  const [projectId, setProjectId] = useState(0);

  const handleProjectSelection = (projectId) => {
    setProjectId(projectId);
  };

  return (
    <>
      <div className="projects-listing-section">
        <h2>Projects</h2>
        <ol style={{ listStyle: "none" }}>
          {allProjects.map((project) => (
            <li key={project.projectId}>
              <button
                type="button"
                style={{ cursor: "pointer" }}
                className="project-select-button"
                onClick={() => handleProjectSelection(project.projectId)}
              >
                {project.projectTitle}
              </button>
            </li>
          ))}
          <br />
          <GrAdd />
          {} Project
        </ol>
      </div>
      <ProjectDescription project={allProjects[projectId]} />
    </>
  );
};

export default ProjectsListing;
