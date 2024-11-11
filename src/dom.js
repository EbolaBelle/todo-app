import { projectList, Project, Task, createNewProject, initialProject } from "./todo.js";

function userInterface() {
    const newTaskBtn = document.querySelector('.task');
    const newProjectBtn = document.querySelector('.project')
    const taskDialog = document.querySelector('.task-dialog');
    const submitTaskBtn = document.querySelector('.submit-task');
    const cancelTaskBtn = document.querySelector('.cancel-task');
    const projectDialog = document.querySelector('.project-dialog');
    const submitProjectBtn = document.querySelector('.submit-project');
    const cancelProjectBtn = document.querySelector('.cancel-project');

    newTaskBtn.addEventListener('click', () => {
        taskDialog.showModal();
    })

    cancelTaskBtn.addEventListener('click', () => {
        taskDialog.close();
    });

    submitTaskBtn.addEventListener('click', () => {
        let newTask = new Task(document.getElementById('title').value, document.getElementById('description').value, document.getElementById('duedate').value, document.querySelector('input[name="priority"]:checked').value)
        printAggregate();
        taskDialog.close();
    })

    newProjectBtn.addEventListener('click', () => projectDialog.showModal())

    cancelProjectBtn.addEventListener('click', () => projectDialog.close())

    submitProjectBtn.addEventListener('click', () => {
        new Project(document.getElementById('name').value);
        projectDialog.close();
        displayProjects();
    })

    function displayProjects() {
        const hanger = document.querySelector('.proj-hanger');
        while (hanger.firstChild) {
            hanger.removeChild(hanger.lastChild);
        }
        let i = 0;
        projectList.forEach((project) => {
            let proj = document.createElement('button');
            proj.dataset.index = i;
            i++
            proj.textContent = project.name;
            hanger.appendChild(proj);
        })
    }

    function displayTasks(project) {
        const body = document.querySelector('.body');
        while (body.firstChild) {
            body.removeChild(body.lastChild);
        }
        let projectCard = document.createElement("div");
        let projectTitle = document.createElement('h1');
        projectTitle.textContent = project.name;    
        body.appendChild(projectCard);
        projectCard.appendChild(projectTitle);
        project.taskList.forEach(item => {
            for (const key in item) {
                let heading = document.createElement('p');
                if (key === "index") {
                    heading.innerHTML = "<br>";
                } else {
                    heading.textContent = `${key}: ${item[key]}`;
                }
                projectCard.appendChild(heading);
            }
            /*let task = document.createElement('p');
            task.textContent = item.title
            projectCard.appendChild(task);*/
        })
    }
    return { displayProjects, displayTasks};
}

export { userInterface }