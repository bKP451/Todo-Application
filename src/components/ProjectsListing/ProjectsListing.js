import "./ProjectsListing.css";
import { GrAdd } from "react-icons/gr";
import ProjectDescription from "../ProjectDescription/ProjectDescription";
import { useEffect, useState } from "react";
import { uid } from "./uid";

const ProjectsListing = ({ allProjects }) => {
  const [projectId, setProjectId] = useState(1);
  const [projectName, setProjectName] = useState("");
  // useState to keep track of project List, so when we add a new project successfully to the indexed database, the UI will re-render
  const [projectsList, setProjectList] = useState([]);
  // Here at present, allProjects is passed from the App component, But I have to fetch the projects listed in the index database

  // Let me make a useEffect function which will be called
  // useEffect(() => {
  //   // Get all the project Lists and populate in projectList
  //   // listProjects();
  //   console.log("I need to update the UI");
  //   // console.log(`projects List is ${projectsList}`)
  // }, [])

  let projectsCount = 0;

  const handleProjectSelection = (projectId) => {
    console.log(`Project Id is ${projectId}`);
    setProjectId(projectId);
  };

  const handleProjectNameChange = (event) => {
    setProjectName(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      console.log(`Project title is ${projectName}`);
      projectName.trim().length > 0 && addProject();
    }
  };

  // declaring global variables for database
  let db = null;
  let objectStore = null;
  const DBOpenReq = window.indexedDB.open("todo-todo", 2);
  DBOpenReq.onerror = (event) => {
    console.log("IndexedDB connection error");
  };

  DBOpenReq.onupgradeneeded = (event) => {
    db = event.target.result;
    if (!db.objectStoreNames.contains("projects")) {
      objectStore = db.createObjectStore("projects", {
        keyPath: "projectId",
      });
    }

    console.log("upgrade", db);
  };

  const loadSeedProjectsData = () => {
    console.log("I am the intial Projects section ");
    // Here I will add two projects data into the indexedDB
    // Check the projects store to check for existing projects. If there are two projects, then do not do write operation
    // So do Read operation

    // I must get the number of projects stored in the indexed Database
    addProjectsInitally();
  };

  const listProjects = () => {
    let tx = makeTX("projects", "readonly");
    tx.oncomplete = (event) => {};

    let store = tx.objectStore("projects");
    let getProjects = store.getAll();

    // returns an array
    // options can pass in a key or a keyRange
    getProjects.onsuccess = (event) => {
      let request = event.target;
      projectsCount = request.result.length;
      if (projectsCount > 0) {
        // setProjectList(request.result)
        request.result.map((project) => {
          console.log(`I am project Title ${project.projectTitle}`);
        });
        // setProjectList(request.result)
        console.log("I will populate the projectList state");
        return;
      } else {
        loadSeedProjectsData();
      }
    };

    getProjects.onerror = (error) => {
      console.warn(error);
    };
  };

  const initialProjects = [
    {
      projectId: uid(),
      projectTitle: "Get yourself a umbrella",
      tasks: [
        {
          taskId: 1,
          taskTitle: "Get to the Umbrella Shop",
          taskDescription:
            "You have to know where to get the good umbrellas. You can ask your pals about it.",
        },
        {
          taskId: 2,
          taskTitle: "Select the color of the Umbrella",
          taskDescription:
            "The color the your umbrella is very important. The color of the umbrella sets your mood. Which color makes you pleasant ?",
        },
      ],
    },
    {
      projectId: uid(),
      projectTitle: "Swimming Lessons",
      tasks: [
        {
          taskId: 1,
          taskTitle: "Visit a swimming trainer",
          taskDescription:
            "You got to visit a swimming trainer. He/She will have proper information to learn swimming",
        },
        {
          taskId: 2,
          taskTitle: "Explore water bodies",
          taskDescription:
            "If you want to be a real life swimmer. You have got to go into the rivers, lakes and seas. It will be good for you.",
        },
      ],
    },
  ];

  DBOpenReq.onsuccess = (event) => {
    db = event.target.result;
    console.log("IndexedDB connection success", db);
    listProjects();
  };

  const makeTX = (storeName, mode) => {
    console.log("", db);
    let tx = db.transaction(storeName, mode);
    tx.onerror = (err) => {
      console.warn(err);
    };
    return tx;
  };

  const addProjectsInitally = () => {
    let tx = makeTX("projects", "readwrite");
    tx.oncomplete = (event) => {
      console.log(event);
    };

    let store = tx.objectStore("projects");
    initialProjects.forEach((project) => {
      let addRequest = store.add(project);
      addRequest.onsuccess = (event) => {
        console.log("successfully added an object");
        console.log("Now I should display project description component");
      };

      addRequest.onerror = (event) => {
        console.log("Error to add a project object to the store");
      };
    });
    console.log("I am running running");
  };

  const addProject = () => {
    let tx = makeTX("projects", "readwrite");
    tx.oncomplete = (event) => {
      console.log(event);
    };

    let store = tx.objectStore("projects");
    let addRequest = store.add({
      projectId: uid(),
      projectTitle: projectName,
    });

    addRequest.onsuccess = (event) => {
      console.log("successfully added an object");
      console.log("Now I should display project description component");
    };

    addRequest.onerror = (event) => {
      console.log("Error to add a project object to the store");
    };
  };

  console.log(`I am projectsCount inside ProjectListing ${projectsCount}`);

  return (
    <>
      <div className="projects-listing-section">
        <h2>Projects</h2>
        <ol style={{ listStyle: "none" }}>
          {projectsList && projectsList.map((project) => (
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
          {/* <button> */}
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
      {/* <ProjectDescription project={allProjects[projectId]} /> */}
    </>
  );
};

export default ProjectsListing;
