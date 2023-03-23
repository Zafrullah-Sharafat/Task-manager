import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetProjectsQuery,
  useGetTeamQuery,
} from "../../features/api/apiSlice";
import { useAddTasksMutation } from "../../features/tasks/tasksApi";
import Error from "../ui/Error";
import SelectOption from "../ui/SelectOption";

export default function AddForm() {
  // Get data from api endpoints;
  const { data: projects } = useGetProjectsQuery();
  const { data: teamMembers } = useGetTeamQuery();
  const [addTasks, { isError, isLoading, isSuccess }] = useAddTasksMutation();

  const navigate = useNavigate();

  // Local States
  const [name, setName] = useState("");
  const [deadline, setDeadline] = useState("");
  const [project, setProject] = useState("");
  const [teamMember, setTeamMember] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const teamMemberObj = teamMembers?.find(
      (member) => +member.id === +teamMember
    );
    const projectObj = projects?.find((p) => +p.id === +project);

    // New task object to add
    const data = {
      taskName: name,
      teamMember: teamMemberObj,
      project: projectObj,
      deadline,
      status: "pending",
    };

    // add Task
    addTasks(data);
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
      {isError && !isLoading && <Error text={"Can not add Task!"} />}
    </form>
  );
}
