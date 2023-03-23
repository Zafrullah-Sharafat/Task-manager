import { useSelector } from "react-redux";
import { useGetTasksQuery } from "../../features/tasks/tasksApi";
import { taskFilter } from "../../utils/taskFilter";
import TaskItem from "../listItems/TaskItem";
import Error from "../ui/Error";

export default function TasksList() {
  // Get data from api endpoints;
  const { data: tasks, isLoading, isError } = useGetTasksQuery();

  // Get filter state form Redux store;
  const filter = useSelector((state) => state.filter);

  // Decide what to render;
  let content = "";
  if (isLoading) {
    content = <p>Loading.....</p>;
  } else if (!isLoading && isError) {
    content = <Error text="Can not fetch tasks!" />;
  } else if (!isLoading && !isError && tasks.length === 0) {
    content = "No tasks found!";
  } else {
    content = (
      <>
        {taskFilter(tasks, filter).map((task) => (
          <TaskItem key={task.id} data={task} />
        ))}
      </>
    );
  }
  return <div className="lws-task-list">{content}</div>;
}
