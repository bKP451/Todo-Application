import "./ProjectsListing.css";
import { GrAdd } from "react-icons/gr";
import ProjectDescription from "../ProjectDescription/ProjectDescription";

const ProjectsListing = ({ allProjects }) => {
  console.log("I am first project", allProjects[0]);
  return (
    <>
      <div className="projects-listing-section">
        <h2>Projects</h2>
        <ol>
          {/* <li className="project-item">
            <u>Get yourself a umbrella</u>
          </li>
          <li className="project-item">Swimming lessons</li> */}
          {allProjects && allProjects.forEach((project) => {
            <li className="project-item">{project.projectTitle}</li>
          })}
          <GrAdd />
          {} Project
        </ol>
      </div>
      <ProjectDescription />
    </>
  );
};

export default ProjectsListing;
