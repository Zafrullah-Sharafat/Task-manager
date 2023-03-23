export const taskFilter = (tasks = [], filter = {}) => {
  const { search, selects } = filter;
  let filteredTasks = tasks;
  filteredTasks = filteredTasks.filter((task) => {
    return selects.indexOf(task.project.projectName) > -1;
  });
  if (search) {
    filteredTasks = filteredTasks.filter((task) => {
      return task.taskName.toLowerCase().includes(search.toLowerCase());
    });
  }

  return filteredTasks;
};
