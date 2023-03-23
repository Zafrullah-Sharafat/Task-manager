export default function TeamItem({ data }) {
  return (
    <>
      <div className="checkbox-container">
        <img
          src={`${process.env.PUBLIC_URL}/assets${data.avatar}`}
          alt={data.name}
          className="team-avater"
        />
        <p className="label">{data.name}</p>
      </div>
    </>
  );
}
