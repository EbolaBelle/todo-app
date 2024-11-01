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
    constructor() {
        this.project = [];
        projectAggregate.push(this);
    }
    addTask(task) {
        this.project.push(task);
    }
}

function pushTaskToProject(project, task) {
    project.addTask(task);
}

function printProject(project) {
    project.project.forEach(task => {
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
let initialProject = new Project;
pushTaskToProject(initialProject, initialTask);
pushTaskToProject(initialProject, secondTask);
printAggregate();