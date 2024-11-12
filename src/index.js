import { projectList, Project, Task } from "./todo.js";
import { userInterface } from './dom.js';

let projectBox = projectList;

const UI = userInterface();

let initialTask = new Task("title", 'description',  'due date', "high")
let secondTask = new Task("title2", 'description2', 'due date 2', "low")
let secondProject = new Project('New Project');

UI.displayProjects();