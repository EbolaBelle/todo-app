function populateStorage(project) {
    let taskArray = project.tasklist;
    taskArray.forEach(element => {
        localStorage.setItem('Title', element.Title);
        localStorage.setItem('Description', element.Description);
        localStorage.setItem('Due', element.Due);
        localStorage.setItem("Priority", element.Priority);
        localStorage.setItem("Completed", element.Completed);
        localStorage.setItem('project', element.project);
        localStorage.setItem(Title, element.Title);
    });
}