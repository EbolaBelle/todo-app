import { Project, Task, projectList } from "./todo.js";
import { userInterface } from './dom.js';
import { populateStorage, retrieveStorage } from "./storage.js";

/*let initialTask = new Task("title", 'description',  'due date', "High")
let secondTask = new Task("title2", 'description2', 'due date 2', "Low")
let secondProject = new Project('New Project');
*/
const UI = userInterface();