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
    }
    addTask(task) {
        this.project.push(task);
    }
}

function pushTaskToProject(project, task) {
    project.addTask(task);
}

function printProject(project) {
    project.project.forEach(element => {
        console.log(element);
    });
}

let task = new Task("title", 'description', 'due date', "high", "notes")
let project = new Project;