const projectAggregate = [];

class Task {
    constructor(title, description, due, priority, completed, notes) {
        this.title = title,
        this.description = description,
        this.due = due,
        this.priority = priority,
        this.completed = completed,
        this.notes = notes
    }

    moveToProject(destinationProject, sourceProject) {
        destinationProject.addTask(this);
        if (sourceProject != undefined) {
            sourceProject.removeTask(this);
        }
        printAggregate();
    }

    toggleCompletion() {
        this.completed === "n" 
        ? this.completed = "y"
        : this.completed =  'n'
    }

    changePriority() {
        if (this.priority === "high") {
            this.priority = "low"
        } else if (this.priority === "normal") {
            this.priority = "high"
        } else if (this.priority === "low") {
            this.priority = "normal"
        }
    }
}

class Project {
    constructor(name) {
        this.name = name;
        this.taskList = [];
        projectAggregate.push(this);
        this.index = projectAggregate.length - 1;     
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
    deleteSelf() {
        projectAggregate.splice(this.index, 1);
    }
}

function printProject(project) {
    console.log(project.name, `\n`, "");
    project.taskList.forEach(task => {
        for (const key in task) {
            if (key === "index") {
                console.log(`\n`);
            } else {
                console.log(`${key}: ${task[key]}`)
            }            
        };        
    });
}

function printAggregate() {
    projectAggregate.forEach(project => {
        printProject(project);
    })
}

function createNewProject(projectName) {
    let newProject = new Project(projectName);
    printAggregate();
}

let initialTask = new Task("title", 'description', 'due date', "high", "n", "notes")
let secondTask = new Task("title2", 'description2', 'due date 2', "low", "y", "notes2")
let initialProject = new Project("Project #1");
initialProject.addTask(initialTask);
initialProject.addTask(secondTask);
printAggregate();