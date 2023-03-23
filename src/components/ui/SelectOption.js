export default function SelectOption({ arr = [] }) {
  return (
    <>
      {arr.map((item, index) => {
        return (
          <option key={index} value={item.id}>
            {item.projectName || item.name}
          </option>
        );
      })}
    </>
  );
}
