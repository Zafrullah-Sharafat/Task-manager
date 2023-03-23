import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toogleSelects } from "../../features/filter/filterSlice";

export default function ProjectItem({ data }) {
  // Get data from Redux Store;
  const dispatch = useDispatch();
  const { selects } = useSelector((state) => state.filter);

  // Local States
  const [check, setCheck] = useState(false);

  const handleCheck = (e) => {
    setCheck(e.target.checked);
    dispatch(toogleSelects(data.projectName));
  };

  useEffect(() => {
    // Decide the Checkbox checked or not
    const isChecked = selects.indexOf(`${data.projectName}`) > -1;
    setCheck(isChecked);
  }, [setCheck, selects, data]);

  return (
    <div className="checkbox-container">
      <input
        type="checkbox"
        className={data.colorClass}
        checked={check}
        onChange={handleCheck}
      />
      <p className="label">{data.projectName}</p>
    </div>
  );
}
