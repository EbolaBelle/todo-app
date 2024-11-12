const projectList = [];

class Project {
    constructor(name) {
        this.name = name;
        this.taskList = [];
        projectList.push(this);
        this.index = projectList.length - 1;     
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
        projectList.splice(this.index, 1);
    }
}

const initialProject = new Project("Default Project");

class Task {
    constructor(title, description, due, priority = "normal", project = initialProject) {
        this.title = title,
        this.description = description,
        this.due = due,
        this.priority = priority,
        this.completed = "n";
        project.addTask(this);
    }

    moveToProject(destinationProject, sourceProject) {
        destinationProject.addTask(this);
        if (sourceProject != undefined) {
            sourceProject.removeTask(this);
        }
    }

    toggleCompletion() {
        this.completed === "n" 
        ? this.completed = "y"
        : this.completed = 'n'
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
export { projectList, Project, Task, initialProject };