import { Project, Task, projectList } from "./todo.js";
import { userInterface } from './dom.js';
import { populateStorage } from "./storage.js";

let initialTask = new Task("title", 'description',  'due date', "High")
let secondTask = new Task("title2", 'description2', 'due date 2', "Low")
let secondProject = new Project('New Project');

const UI = userInterface();

//print();

populateStorage();

function print() {
    console.log(projectList[0].taskList);
    projectList[0].taskList.forEach((task) =>{
        for (const key in task) {
            console.log(task[key]);
        }
    }
    )
}