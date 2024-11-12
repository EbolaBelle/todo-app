import { projectList, Project, Task } from "./todo.js";

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

    function projectBtnAssign(nodeList) {
        nodeList.forEach((button) => {
            button.addEventListener('click', projectHandler);
        });
    }

    function projectHandler() {
        displayTasks(projectList[this.dataset.index]);
        console.log(this.dataset.index);
    }

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
        selector.removeChild(selector.querySelector('select'));
    });

    submitTaskBtn.addEventListener('click', () => {
        new Task(document.getElementById('title').value, 
            document.getElementById('description').value, 
            document.getElementById('duedate').value, 
            document.querySelector('input[name="priority"]:checked').value, 
            projectList[document.getElementById('project').value]
            );
        selector.removeChild(selector.querySelector('select'));
        taskDialog.close();
        displayTasks(projectList[document.getElementById('project').value]);
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
            proj.classList.add('project-buttons')
            proj.setAttribute('type', 'button');
            proj.dataset.index = i;
            i++
            proj.textContent = project.name;
            hanger.appendChild(proj);
        })
        let projectBtns = document.querySelectorAll('.project-buttons');
        projectBtnAssign(projectBtns);
    }

    function deleteTaskAssign() {
        let deleteBtns = document.querySelectorAll('.delete-button');
        deleteBtns.forEach(button => {
            button.addEventListener('click', deleteTaskHandler)
        })
    }

    function deleteTaskHandler(){
        projectList[this.dataset.index2].removeTask(projectList[this.dataset.index2].taskList[this.dataset.index]);
        displayTasks(projectList[this.dataset.index2]);
    }

    function deleteProjectAssign() {
        document.querySelector('.remove-project').addEventListener('click', deleteProjectHandler);
    }

    function deleteProjectHandler() {
        if (projectList.length === 1) {
            alert('Cannot delete default project');
        } else {
            projectList[this.dataset.index].deleteSelf();
            displayProjects();
            cleanSlate();
        }
    }

    function cleanSlate() {
        const body = document.querySelector('.body');
        while (body.firstChild) {
            body.removeChild(body.lastChild);
        }
    }

    function completionToggleAssign() {
        let completeBtns = document.querySelectorAll('.complete-button');
        completeBtns.forEach(button => {
            button.addEventListener('click', completionToggle)
        })
    }

    function completionToggle() {
        projectList[this.dataset.index2].taskList[this.dataset.index].toggleCompletion();
        displayTasks(projectList[this.dataset.index2]);
    }

    function priorityBtnAssign() {
        let priorityBtns = document.querySelectorAll('.priority-button');
        priorityBtns.forEach(button => {
            button.addEventListener('click', priorityToggle)
        })
    }

    function priorityToggle() {
        projectList[this.dataset.index2].taskList[this.dataset.index].changePriority();
        displayTasks(projectList[this.dataset.index2]);
    }

    function displayTasks(project) {
        const body = document.querySelector('.body');
        cleanSlate();
        let removeProjectBtn = document.createElement("button");
        removeProjectBtn.classList.add('remove-project');
        removeProjectBtn.dataset.index = project.index;
        removeProjectBtn.textContent = "Remove Project";
        body.appendChild(removeProjectBtn);
        deleteProjectAssign();
        let projectCard = document.createElement("div");
        let projectTitle = document.createElement('h1');
        projectTitle.textContent = project.name;    
        body.appendChild(projectCard);
        projectCard.appendChild(projectTitle);
        project.taskList.forEach(item => {
            let taskCard = document.createElement('div');
            taskCard.classList.add('task-card');
            for (const key in item) {
                let heading = document.createElement('p');
                if (key === "index") {
                    buttonCreator(project, item, taskCard);
                } else {
                    heading.textContent = `${key}: ${item[key]}`;
                } taskCard.appendChild(heading);
                projectCard.appendChild(taskCard);
            }
            deleteTaskAssign();
            completionToggleAssign();
            priorityBtnAssign();
        })
    }
    return { displayProjects };
}

function buttonCreator(project, item, taskCard) {
    let priorityBtn = document.createElement('button');
    priorityBtn.classList.add('priority-button');
    priorityBtn.dataset.index = item.index;
    priorityBtn.dataset.index2 = project.index;
    priorityBtn.textContent = "Toggle Priority";
    taskCard.appendChild(priorityBtn);
    let toggleBtn = document.createElement('button');
    toggleBtn.classList.add('complete-button');
    toggleBtn.dataset.index = item.index;
    toggleBtn.dataset.index2 = project.index;
    toggleBtn.textContent = "Mark Complete";
    taskCard.appendChild(toggleBtn);
    let deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-button');
    deleteBtn.dataset.index = item.index;
    deleteBtn.dataset.index2 = project.index;
    deleteBtn.textContent = "Remove Task";
    taskCard.appendChild(deleteBtn);
}

export { userInterface }