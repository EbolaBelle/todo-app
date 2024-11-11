import { projectList, Project, Task, createNewProject, initialProject } from "./todo.js";
import { userInterface } from './dom.js';


// console only
function printProject(project) {
    console.log(project.name, `\n`, "");
    project.taskList.forEach(task => {
        for (const key in task) {
            if (key === "index") {
                console.log(`\n`);
            } else {
                console.log(`${key}: ${task[key]}`)
            }            
        };        
    });
}
//console only
function printAggregate() {
    projectList.forEach(project => {
        printProject(project);
    })
}
let projectBox = projectList;
let projectCreator = createNewProject

const UI = userInterface(projectBox, projectCreator);

let initialTask = new Task("title", 'description',  'due date', "high", "n",)
let secondTask = new Task("title2", 'description2', 'due date 2', "low", "y")
let secondProject = new Project('New Project');
printAggregate();

UI.displayProjects();
UI.displayTasks(projectList[0]);

/*DOM Manipulation & UI*/

