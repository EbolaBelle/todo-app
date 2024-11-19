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
    this.taskList.forEach((task) => {
      task.index = index;
      index++;
    });
  }
  removeTask(task) {
    this.taskList.splice(task.index, 1);
    this.assignIndices();
  }
  deleteSelf() {
    projectList.splice(this.index, 1);
    for (let i = 0; i < projectList.length; i++) {
      //prevent project index from breaking
      projectList[i].index = i;
    }
  }
}

const initialProject = new Project("Default Project");

class Task {
  constructor(title, description, due, priority = "normal", project) {
    (this.Title = title),
      (this.Description = description),
      (this.Due = due),
      (this.Priority = priority),
      (this.Completed = "No");
    this.project = project.index;
    project.addTask(this);
  }
  //currently unused
  moveToProject(destinationProject, sourceProject) {
    destinationProject.addTask(this);
    if (sourceProject != undefined) {
      sourceProject.removeTask(this);
    }
  }

  toggleCompletion() {
    this.Completed === "No"
      ? (this.Completed = "Yes")
      : (this.Completed = "No");
  }

  changePriority() {
    if (this.Priority === "High") {
      this.Priority = "Low";
    } else if (this.Priority === "Normal") {
      this.Priority = "High";
    } else if (this.Priority === "Low") {
      this.Priority = "Normal";
    }
  }
}
export { projectList, Project, Task };
