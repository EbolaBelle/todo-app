import { Project, Task, projectList } from "./todo.js";
import { userInterface } from './dom.js';

let initialTask = new Task("title", 'description',  'due date', "high")
let secondTask = new Task("title2", 'description2', 'due date 2', "low")
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

function populateStorage() {
    //let taskArray = project.taskList;
    projectList.forEach(project => {
        project.taskList.forEach(task => {
            let pIndex = task.project;
                let tIndex = task.index;
            for (const key in task) {
                
                localStorage.setItem(`${pIndex}${tIndex} ${key}`, task[key]);
            }
        });
    })
        /*taskArray.forEach(element => {
            for (const key in element) {
                localStorage.setItem(key, element[key]);
            }
        });*/
}