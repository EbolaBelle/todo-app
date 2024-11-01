const projectAggregate = [];

class Task {
    constructor(title, description, dueDate, priority, notes) {
        this.title = title,
        this.description = description,
        this. dueDate = dueDate,
        this.priority = priority,
        this.notes = notes
    }
}

class Project {
    constructor(name) {
        this.name = name;
        this.taskList = [];
        projectAggregate.push(this);       
    }
    addTask(task) {
        this.taskList.push(task);
        this.assignIndices();
    }
    assignIndices() {
        let index = 0;
        this.taskList.forEach(task => {
            task.index = index;
            index++;
        })
    }
    removeTask(task) {
        this.taskList.splice(task.index, 1);
        this.assignIndices();
    }
}

function pushTaskToProject(project, task) {
    project.addTask(task);
}

function printProject(project) {
    console.log(project.name);
    project.taskList.forEach(task => {
        for (const key in task) {
            console.log(`${key}: ${task[key]}`)
        };
        console.log(`\n`);
    });
}

function printAggregate() {
    projectAggregate.forEach(project => {
        printProject(project);
    })
}

let initialTask = new Task("title", 'description', 'due date', "high", "notes")
let secondTask = new Task("title2", 'description2', 'due date 2', "low", "notes2")
let initialProject = new Project("Project #1");
pushTaskToProject(initialProject, initialTask);
pushTaskToProject(initialProject, secondTask);
printAggregate();