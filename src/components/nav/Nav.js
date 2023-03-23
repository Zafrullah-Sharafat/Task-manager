import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import image from "../../assets/images/logo.svg";
import { addSearch } from "../../features/filter/filterSlice";

export default function Nav() {
  const dispatch = useDispatch();

  // Local States
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    // Add Search to Redux store
    dispatch(addSearch(search));
  };

  return (
    <nav className="container relative py-3">
      <div className="flex items-center justify-between">
        <Link to="/">
          <img src={image} alt="Logo" />
        </Link>
        <form onSubmit={handleSearch}>
          <div className="flex-1 max-w-xs search-field group">
            <i className="fa-solid fa-magnifying-glass search-icon group-focus-within:text-blue-500"></i>
            <input
              type="text"
              placeholder="Search Task"
              className="search-input"
              id="lws-searchTask"
              style={{ color: "black" }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </form>
      </div>
    </nav>
  );
}
