import { useRef } from "react";
import classes from "../SearchBar/SearchBar.module.css";

const SearchBar = (props) => {
  const inputCityRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredCity = inputCityRef.current.value;

    if (enteredCity.length === 0) {
      return;
    }
    props.onEnteredCity(enteredCity);
    inputCityRef.current.value = "";
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes["search-box"]}>
        <input
          id="weather"
          type="text"
          className={classes["search-bar"]}
          placeholder="Search..."
          ref={inputCityRef}
        />
      </div>
    </form>
  );
};

export default SearchBar;
