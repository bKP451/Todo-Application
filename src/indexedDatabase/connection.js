import { initialProjects } from "../utility/defaultProjects";

// declaring global variables for database
let db = null;
let objectStore = null;

export const initDB = () => {
  return new Promise((resolve, reject) => {
    const DBOpenReq = window.indexedDB.open("todo-todo", 2);
    DBOpenReq.onerror = (event) => {
      reject(event.target.error);
    };

    DBOpenReq.onsuccess = (event) => {
      db = event.target.result;
      resolve(db); // Resolve with the connected database
    };

    DBOpenReq.onupgradeneeded = (event) => {
      db = event.target.result;
      if (!db.objectStoreNames.contains("projects")) {
        objectStore = db.createObjectStore("projects", {
          keyPath: "projectId",
        });
      }
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
      if (projects) {
        resolve(projects); // Resolve with stored projects data
      } else {
        reject(new Error("No projects found."));
      }
    };

    getProjects.onerror = (error) => {
      reject(error); // Reject with error
    };
  });
};

export const addDefaultProjects = () => {
  return new Promise((resolve, reject) => {
    let tx = makeTX("projects", "readwrite");
    tx.oncomplete = (event) => {};

    let store = tx.objectStore("projects");
    let addDefaultProjectReq = store.add(initialProjects[0]);

    addDefaultProjectReq.onsuccess = (event) => {
      let request = event.target;
      let defaultProjectKey = request.result;
      let getAddedDefaultProRequest = store.get(defaultProjectKey);

      getAddedDefaultProRequest.onsuccess = (event) => {
        let addedDefaultProject = event.target.result;
        resolve(addedDefaultProject);
      };

      getAddedDefaultProRequest.onerror = (error) => {
        reject(error);
      };
    };

    addDefaultProjectReq.onerror = (error) => {
      console.log(`Error while writing projects: ${error}`);
      reject(error); // Reject with error
    };
  });
};
