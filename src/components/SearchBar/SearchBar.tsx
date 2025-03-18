import { IoSearch } from "react-icons/io5";
import s from "./SearchBar.module.css";
import { FC, ChangeEvent, FormEvent } from "react";

interface SearchBarProps {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  value: string;
  setValue: (value: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ handleSubmit, value, setValue }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
