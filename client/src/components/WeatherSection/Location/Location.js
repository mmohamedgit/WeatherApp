import classes from "./Location.module.css";

const Location = (props) => {
  const countryCode = props.country;

  const lowerCaseCountryCode = countryCode.toLowerCase();
  return (
    <div className={classes["location-box"]}>
      <div className={classes.location}>
        <div>
          {props.city}, {props.country}
        </div>
        <div className={classes.flag}>
          <img
            width={65}
            src={`https://flagcdn.com/w80/${lowerCaseCountryCode}.png`}
            alt={props.country}
          ></img>
        </div>
      </div>
      <div className={classes.date}>{props.date}</div>
    </div>
  );
};

export default Location;
