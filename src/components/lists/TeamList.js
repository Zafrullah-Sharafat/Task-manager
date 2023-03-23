import { useGetTeamQuery } from "../../features/api/apiSlice";
import TeamItem from "../listItems/TeamItem";
import Error from "../ui/Error";

export default function TeamList() {
  // Get data from api endpoints;
  const { data: teamMember, isLoading, isError } = useGetTeamQuery();

  // Decide what to render;
  let content = "";
  if (isLoading) {
    content = <p>Loading.....</p>;
  } else if (!isLoading && isError) {
    content = <Error text="Can not fetch team members!" />;
  } else if (!isLoading && !isError && teamMember.length === 0) {
    content = "No member found!";
  } else {
    content = (
      <>
        {teamMember.map((member) => (
          <TeamItem key={member.id} data={member} />
        ))}
      </>
    );
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold">Team Members</h3>
      <div className="mt-3 space-y-4">{content}</div>
    </div>
  );
}
