import { useParams } from "react-router-dom";
import EditForm from "../components/forms/EditForm";
import Error from "../components/ui/Error";
import { useGetSingleTasksQuery } from "../features/tasks/tasksApi";

export default function Edit() {
  // Extract task id from the url
  const { taskId } = useParams();

  // Get data from api endpoints;
  const { data, isLoading, isError } = useGetSingleTasksQuery(taskId);

  //Decide what to render
  let content = "";
  if (isLoading) {
    content = <p>Loading.....</p>;
  } else if (!isLoading && isError) {
    content = <Error text="Can not fetch task Data!" />;
  } else if (!isLoading && !isError && data.length === 0) {
    content = "No task found!";
  } else {
    content = <EditForm data={data} />;
  }

  return (
    <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
      <h1 className="mt-4 mb-8 text-3xl font-bold text-center text-gray-800">
        Create Task for Your Team
      </h1>

      <div className="justify-center mb-10 space-y-2 md:flex md:space-y-0">
        {content}
      </div>
    </main>
  );
}
