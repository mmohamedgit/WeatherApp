import BeatLoader from "react-spinners/BeatLoader";
import classes from "./Spinner.module.css";

const Spinner = () => {
  return (
    <div className={classes.spinner}>
      <BeatLoader color="yellow" />
      <p>Loading Weather Data...</p>
    </div>
  );
};

export default Spinner;
