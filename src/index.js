import { Project, Task, projectList } from "./todo.js";
import { userInterface } from "./dom.js";
import { populateStorage, retrieveStorage } from "./storage.js";

let initialTask = new Task(
  "Initial Task",
  "description",
  "02/15/1992",
  "High",
  projectList[0],
);
let secondTask = new Task(
  "Secondary Task",
  "description2",
  "08/15/1992",
  "Low",
  projectList[0],
);
//let secondProject = new Project('New Project');

const UI = userInterface();
