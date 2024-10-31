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

let item = new Task("Get Job", "You need to get a job", "11/1/2024", "High", "This is a test");

console.log('Hello, world!')