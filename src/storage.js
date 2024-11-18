import {projectList} from './todo.js'

function populateStorage() {
    localStorage.clear();
    projectList.forEach(project => {
        project.taskList.forEach(task => {
            let pIndex = task.project;
                let tIndex = task.index;
            for (const key in task) {
                
                localStorage.setItem(`${pIndex}${tIndex} ${key}`, task[key]);
            }
        });
    })
}

export {populateStorage}