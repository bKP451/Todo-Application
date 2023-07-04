import "./ProjectsListing.css";
import { GrAdd } from "react-icons/gr";
import ProjectDescription from "../ProjectDescription/ProjectDescription";
import { useEffect, useState } from "react";
import { uid } from "./uid";

const ProjectsListing = ({ allProjects }) => {
  const [projectId, setProjectId] = useState(0);
  const [projectName, setProjectName] = useState("");

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
      request.result.map((project) => {
        console.log(project.projectTitle);
      });
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
  // useEffect(() => {
  //   const handleSuccess = (event) => {
  //     const db = event.target.result;
  //     console.log("IndexedDB connection success", db);
  //     loadSeedProjectsData();
  //     // listProjects();
  //   };

  //   DBOpenReq.onsuccess = handleSuccess;

  //   return () => {
  //     DBOpenReq.onsuccess = null;
  //   };
  // }, []);
  

  DBOpenReq.onsuccess = (event) => {
    db = event.target.result;
    console.log("IndexedDB connection success", db);
    listProjects();
    addProjectsInitally();
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
    // let addRequest = store.add({initialProjects[0], initialProjects[1]});
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
      <ProjectDescription project={allProjects[projectId]} />
    </>
  );
};

export default ProjectsListing;
