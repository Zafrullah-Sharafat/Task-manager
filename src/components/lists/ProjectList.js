import { useGetProjectsQuery } from "../../features/api/apiSlice";
import ProjectItem from "../listItems/ProjectItem";
import Error from "../ui/Error";

export default function ProjectList() {
  // Get data from api endpoints;
  const { data: projects, isLoading, isError } = useGetProjectsQuery();

  // Decide what to render;
  let content = "";
  if (isLoading) {
    content = <p>Loading.....</p>;
  } else if (!isLoading && isError) {
    content = <Error text="Can not fetch Projects!" />;
  } else if (!isLoading && !isError && projects.length === 0) {
    content = "No Projects found!";
  } else {
    content = (
      <>
        {projects.map((project) => (
          <ProjectItem key={project.id} data={project} />
        ))}
      </>
    );
  }
  return (
    <div>
      <h3 className="text-xl font-bold">Projects</h3>
      <div className="mt-3 space-y-4">{content}</div>
    </div>
  );
}
