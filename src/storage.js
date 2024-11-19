import { projectList, Project, Task } from "./todo.js";

/* deprecated
function populateStorage() {
    localStorage.clear();
    projectList.forEach(project => {
        project.taskList.forEach(task => {
            let pIndex = task.project;
                let tIndex = task.index;
                let i = 0;
            for (const key in task) {
                localStorage.setItem(`${pIndex}${tIndex} ${key}`, task[key]);
                i++;
            }
        });
    })
}*/

function populateStorage() {
  localStorage.clear();
  let i = 0;
  projectList.forEach((project) => {
    localStorage.setItem(`${i}`, JSON.stringify(project));
    i++;
  });
}

function retrieveStorage() {
  const blockCount = localStorage.length - 1;
  for (let i = 0; i <= blockCount; i++) {
    let parsedBlock = JSON.parse(localStorage[i]);
    let projectHolder = new Project(parsedBlock.name);
    for (let j = 0; j < parsedBlock.taskList.length; j++) {
      new Task(
        parsedBlock.taskList[j].Title,
        parsedBlock.taskList[j].Description,
        parsedBlock.taskList[j].Due,
        parsedBlock.taskList[j].Priority,
        projectHolder,
      );
    }
  }
  //localStorage.clear();
}

export { populateStorage, retrieveStorage };
