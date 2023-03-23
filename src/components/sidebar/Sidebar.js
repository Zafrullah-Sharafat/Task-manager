import ProjectList from "../lists/ProjectList";
import TeamList from "../lists/TeamList";

export default function Sidebar() {
  return (
    <div className="sidebar">
      {/*  Projects List */}
      <ProjectList />
      {/*  Team Members  */}
      <TeamList />
    </div>
  );
}
