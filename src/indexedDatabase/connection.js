import { initialProjects } from "../utility/defaultProjects";

// declaring global variables for database
let db = null;
let objectStore = null;

export const initDB = () => {
  return new Promise((resolve, reject) => {
    const DBOpenReq = window.indexedDB.open("todo-todo", 2);
    DBOpenReq.onerror = (event) => {
      console.log("IndexedDB connection error");
      reject(event.target.error);
    };

    DBOpenReq.onsuccess = (event) => {
      db = event.target.result;
      console.log("IndexedDB connection success", db);
      resolve(db); // Resolve with the connected database
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
  });
};

const makeTX = (storeName, mode) => {
  console.log("", db);
  let tx = db.transaction(storeName, mode);
  tx.onerror = (err) => {
    console.warn(err);
  };
  return tx;
};

export const loadProjects = () => {
  return new Promise((resolve, reject) => {
    let projectsCount = 0;
    let tx = makeTX("projects", "readonly");
    tx.oncomplete = (event) => {};

    let store = tx.objectStore("projects");
    let getProjects = store.getAll();

    getProjects.onsuccess = (event) => {
      let request = event.target;
      let projects = request.result;
      projectsCount = projects.length;
      if (projectsCount > 0) {
        console.log(`I have ${projectsCount} projects.`);
      } else {
        console.log("I do not have any projects. I shall get default projects.")
      }
      if(projects){
        console.log("Projects retrieved", projects);
        resolve(projects); // Resolve with projects data
      } else {
        reject(new Error("No projects found."));
      }
    };

    getProjects.onerror = (error) => {
      console.log(`Error while reading projects: ${error}`);
      reject(error); // Reject with error
    };
  });
};

export const addDefaultProjects = () => {
  return new Promise((resolve, reject) => {
    let tx = makeTX("projects", "readwrite");
    tx.oncomplete = (event) => {
      resolve();
    };

    let store = tx.objectStore("projects");
    let addProject1 = store.add(initialProjects[0]);
    let addProject2 = store.add(initialProjects[1]);

    addProject1.onerror = (error) => {
      console.log("Error adding default project 1:", error);
      reject(error);
    };

    addProject2.onerror = (error) => {
      console.log("Error adding default project 2:", error);
      reject(error);
    };
  });
};