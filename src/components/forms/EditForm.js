import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetProjectsQuery,
  useGetTeamQuery,
} from "../../features/api/apiSlice";
import { useEditTasksMutation } from "../../features/tasks/tasksApi";
import Error from "../ui/Error";
import SelectOption from "../ui/SelectOption";

export default function EditForm({ data }) {
  // Extract properties from the provided task
  const {
    id,
    taskName: currentName,
    deadline: currentDeadline,
    project: currentProject,
    teamMember: currentTeamMember,
  } = data || {};

  // Get data from api endpoints;
  const { data: projects } = useGetProjectsQuery();
  const { data: teamMembers } = useGetTeamQuery();
  const [editTasks, { isError, isLoading, isSuccess }] = useEditTasksMutation();

  const navigate = useNavigate();

  // Local States
  const [name, setName] = useState(currentName);
  const [deadline, setDeadline] = useState(currentDeadline);
  const [project, setProject] = useState(currentProject.id);
  const [teamMember, setTeamMember] = useState(currentTeamMember.id);

  const handleSubmit = (e) => {
    e.preventDefault();
    const teamMemberObj = teamMembers?.find(
      (member) => +member.id === +teamMember
    );
    const projectObj = projects?.find((p) => +p.id === +project);

    // Edited task object
    const data = {
      taskName: name,
      teamMember: teamMemberObj,
      project: projectObj,
      deadline,
    };

    // Edit task
    editTasks({ id, data });
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess, navigate]);

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="fieldContainer">
        <label htmlFor="lws-taskName">Task Name</label>
        <input
          type="text"
          name="taskName"
          id="lws-taskName"
          value={name}
          required
          placeholder="Implement RTK Query"
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="fieldContainer">
        <label>Assign To</label>
        <select
          name="teamMember"
          id="lws-teamMember"
          value={teamMember}
          onChange={(e) => setTeamMember(e.target.value)}
          required
        >
          <option value="" hidden>
            Select Job
          </option>
          <SelectOption arr={teamMembers} />
        </select>
      </div>
      <div className="fieldContainer">
        <label htmlFor="lws-projectName">Project Name</label>
        <select
          id="lws-projectName"
          name="projectName"
          required
          value={project}
          onChange={(e) => setProject(e.target.value)}
        >
          <option value="" hidden>
            Select Project
          </option>
          <SelectOption arr={projects} />
        </select>
      </div>

      <div className="fieldContainer">
        <label htmlFor="lws-deadline">Deadline</label>
        <input
          type="date"
          name="deadline"
          id="lws-deadline"
          value={deadline}
          required
          onChange={(e) => setDeadline(e.target.value)}
        />
      </div>

      <div className="text-right">
        <button type="submit" className="lws-submit" disabled={isLoading}>
          Save
        </button>
      </div>
      {isError && !isLoading && <Error text={"Can not update data"} />}
    </form>
  );
}
