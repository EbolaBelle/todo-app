import { projectList, Project, Task } from "./todo.js";
import {populateStorage} from "./storage.js";

function userInterface() {
    const newTaskBtn = document.querySelector('.task');
    const newProjectBtn = document.querySelector('.project')
    const taskDialog = document.querySelector('.task-dialog');
    const selector = document.querySelector('.selector')
    const submitTaskBtn = document.querySelector('.submit-task');
    const cancelTaskBtn = document.querySelector('.cancel-task');
    const projectDialog = document.querySelector('.project-dialog');
    const submitProjectBtn = document.querySelector('.submit-project');
    const cancelProjectBtn = document.querySelector('.cancel-project');

    newTaskBtn.addEventListener('click', () => {
        const list = document.createElement('select');
        list.id = "project";
        selector.appendChild(list);
        for (let i = 0; i < projectList.length; i++) {
            let option = document.createElement('option');
            option.value = projectList[i].index;
            option.text = projectList[i].name;
            list.appendChild(option);
        }
        taskDialog.showModal();
    })

    cancelTaskBtn.addEventListener('click', () => {
        taskDialog.close();
        document.getElementById('task-form').reset();
        selector.removeChild(selector.querySelector('select'));
    });

    submitTaskBtn.addEventListener('click', () => {
        new Task(document.getElementById('title').value, 
            document.getElementById('description').value, 
            document.getElementById('duedate').value, 
            document.querySelector('input[name="priority"]:checked').value, 
            projectList[document.getElementById('project').value]
            );
        populateStorage(); //NEW
        taskDialog.close();
        document.getElementById('task-form').reset();
        displayMicroTasks(projectList[document.getElementById('project').value]);
        selector.removeChild(selector.querySelector('select'));
    })

    newProjectBtn.addEventListener('click', () => projectDialog.showModal())

    cancelProjectBtn.addEventListener('click', () => {
        projectDialog.close()
        document.getElementById('project-form').reset();
    })

    submitProjectBtn.addEventListener('click', () => {
        new Project(document.getElementById('name').value);
        projectDialog.close();
        document.getElementById('project-form').reset();
        populateStorage();
        displayProjects();
    })

    function projectBtnAssign(nodeList) {
        nodeList.forEach((button) => {
            button.addEventListener('click', projectHandler);
        });
    }

    function projectHandler() {
        displayMicroTasks(projectList[this.dataset.task]);
    }

    function deleteTaskAssign() {
        document.querySelector('.delete-button').addEventListener('click', deleteTaskHandler)
    }

    function deleteTaskHandler(){
        projectList[this.dataset.project]
            .removeTask(projectList[this.dataset.project]
            .taskList[this.dataset.task]);
        displayMicroTasks(projectList[this.dataset.project]);
        populateStorage();
    }

    function deleteProjectAssign() {
        document.querySelector('.remove-project').addEventListener('click', deleteProjectHandler);
    }

    function deleteProjectHandler() {
            projectList[this.dataset.project].deleteSelf();            
            displayProjects();
            cleanSlate();
    }

    function completionToggleAssign() {
        document.querySelector('.complete-button').addEventListener('click', completionToggle)
        
    }

    function completionToggle() {
        projectList[this.dataset.project].taskList[this.dataset.task].toggleCompletion();
        displayFullTask(this.dataset.project, this.dataset.task);
    }

    function priorityBtnAssign() {
        document.querySelector('.priority-button').addEventListener('click', priorityToggle);
    }

    function priorityToggle() {
        projectList[this.dataset.project].taskList[this.dataset.task].changePriority();
        displayFullTask(this.dataset.project, this.dataset.task);
        console.log(`${this.dataset.project}, ${this.dataset.task}`);
    }

    function collapseAssign() {
        document.querySelector('.retract-button').addEventListener('click', () => {
            displayMicroTasks(projectList[document.querySelector('.retract-button').dataset.project]);
        })
    }

    function displayProjects() {
        const hanger = document.querySelector('.proj-hanger');
        while (hanger.firstChild) {
            hanger.removeChild(hanger.lastChild);
        }
        let i = 0;
        projectList.forEach((project) => {
            let listItem = document.createElement('li');
            hanger.appendChild(listItem);
            let proj = document.createElement('button');
            proj.classList.add('project-buttons')
            proj.setAttribute('type', 'button');
            proj.dataset.task = i;
            i++
            proj.textContent = project.name;
            listItem.appendChild(proj);
        })
        let projectBtns = document.querySelectorAll('.project-buttons');
        projectBtnAssign(projectBtns);
    }

    function createRemoveProjectButton(project) {
        let removeProjectBtn = document.createElement("button");
        removeProjectBtn.classList.add('remove-project');
        removeProjectBtn.dataset.project = project.index;
        removeProjectBtn.textContent = "Remove Project";
        return removeProjectBtn;
    }

    function createProjectCard(project) {
        let projectCard = document.createElement("div");
        let projectTitle = document.createElement('h1');
        let body = document.querySelector('.body');
        projectTitle.textContent = project.name;
        projectCard.classList.add('project-card');
        document.querySelector('.body').appendChild(projectTitle);
        return projectCard;
    }

    function displayProjectCard(project) {
        const body = document.querySelector('.body');
        cleanSlate();
        let removeProjectBtn = createRemoveProjectButton(project);
        body.appendChild(removeProjectBtn);
        let projectCard = createProjectCard(project);
        body.appendChild(projectCard);
        return projectCard;
    }

    function displayMicroTasks(project) {
        const body = document.querySelector('.body');
        cleanSlate();
        let projectCard = displayProjectCard(project);
        project.taskList.forEach(task => {
            let taskCard = document.createElement('div');
            taskCard.classList.add('task-card');
            for (const key in task) {
                if (key === "Title" || key === "Due") {
                    let heading = document.createElement('p');
                    heading.textContent = `${key}: ${task[key]}`;
                    taskCard.appendChild(heading);
                }
            }
            let xpandBtn = document.createElement('button');
            xpandBtn.textContent = "Expand";
            xpandBtn.classList.add('xpand');
            xpandBtn.dataset.task = task.index;
            xpandBtn.dataset.project = project.index;
            taskCard.appendChild(xpandBtn);
            projectCard.appendChild(taskCard);
        })
        xpandBtnAssign();
        deleteProjectAssign();
    }

    function xpandBtnAssign() {
        let xpanders = document.querySelectorAll('.xpand');
        xpanders.forEach((button) => 
            button.addEventListener('click', () => {
                displayFullTask(button.dataset.project, button.dataset.task)
            }))
    }
    //BUG - issues with button assignment
    function displayFullTask(projectIndex, taskIndex) {
        let project = projectList[projectIndex];
        let task = project.taskList[taskIndex];
        cleanSlate();
        let projectCard = displayProjectCard(project);
        let taskCard = document.createElement('div');
        taskCard.classList.add('task-card');
        let i = 0;
        for (const key in task) {
            let heading = document.createElement('p');
            if (key === "project") {
                buttonCreator(project, task, taskCard);
                buttonAssign();
                return;
            } else {
                heading.textContent = `${key}: ${task[key]}`;
                i++;
            }
            taskCard.appendChild(heading);
            projectCard.appendChild(taskCard);
        }
    }

    function buttonAssign() {
        deleteProjectAssign()
        deleteTaskAssign();
        completionToggleAssign();
        priorityBtnAssign();
        collapseAssign();
    }

    function buttonCreator(project, item, taskCard) {
        let btnBox = document.createElement('div');
        btnBox.classList.add('button-box');
        let priorityBtn = document.createElement('button');
        priorityBtn.classList.add('priority-button');
        priorityBtn.dataset.task = item.index;
        priorityBtn.dataset.project = project.index;
        priorityBtn.textContent = "Toggle Priority";
        btnBox.appendChild(priorityBtn);
        let toggleBtn = document.createElement('button');
        toggleBtn.classList.add('complete-button');
        toggleBtn.dataset.task = item.index;
        toggleBtn.dataset.project = project.index;
        toggleBtn.textContent = "Mark Complete";
        btnBox.appendChild(toggleBtn);
        let retractBtn = document.createElement('button');
        retractBtn.classList.add('retract-button');
        retractBtn.dataset.task = item.index;
        retractBtn.dataset.project = project.index;
        retractBtn.textContent = "Collapse";
        btnBox.appendChild(retractBtn);
        let deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-button');
        deleteBtn.dataset.task = item.index;
        deleteBtn.dataset.project = project.index;
        deleteBtn.textContent = "Remove Task";
        btnBox.appendChild(deleteBtn);
        taskCard.appendChild(btnBox);
    }
    
    function cleanSlate() {
        const body = document.querySelector('.body');
        while (body.firstChild) {
            body.removeChild(body.lastChild);
        }
    }

    displayProjects();
    displayMicroTasks(projectList[0]);
}

export { userInterface }