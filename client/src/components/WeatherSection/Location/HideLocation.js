import classes from "./HideLocation.module.css";

const HideLocation = (props) => {
  return (
    <div className={classes["hide-location"]}>
      <div className={classes[props.status]}></div>
      <img
        src={require("../../../assets/Location/location-hide.svg").default}
        alt="location-hide"
      ></img>
      <p>{props.message}</p>
      <p>{props.code}</p>
    </div>
  );
};

export default HideLocation;
