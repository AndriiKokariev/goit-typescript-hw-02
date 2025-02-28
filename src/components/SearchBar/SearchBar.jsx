import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import s from "./SearchBar.module.css";

const SearchBar = ({ handleSubmit }) => {
  const [value, setValue] = useState("");
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <header>
        <form className={s.formContainer} onSubmit={handleSubmit}>
          <div className={s.inputContainer}>
            <button className={s.btn} type="submit">
              <IoSearch />
            </button>
            <input
              className={s.input}
              type="text"
              name="search"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              value={value}
              onChange={handleChange}
            />
          </div>
        </form>
      </header>
    </div>
  );
};

export default SearchBar;
