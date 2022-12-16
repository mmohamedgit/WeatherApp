import classes from "../Slide/Slide.module.css";

const Slide = (props) => {
  var typeOfDay;
  var unit;
  var imageWidth;
  var weatherParameter;
  var feelsLike;

  switch (props.title) {
    case "Description":
      imageWidth = 250;
      unit = "";
      weatherParameter = "description";
      typeOfDay = props.typeOfDay;
      break;
    case "Temperature":
      imageWidth = 350;
      unit = "°C";
      weatherParameter = "temp";
      feelsLike = props.feelsLike;
      break;
    case "Sunrise Time":
    case "Sunset Time":
      unit = "";
      weatherParameter = "sun";
      imageWidth = "325";
      break;
    case "Wind Speed":
      weatherParameter = "wind";
      imageWidth = 300;
      unit = "m/s";
      break;
    case "Wind Direction":
      weatherParameter = "wind-direction";
      imageWidth = 300;
      unit = "°";
      break;
    case "Pressure":
      weatherParameter = "pressure";
      imageWidth = 325;
      unit = "hPa";
      break;
    case "Humidity":
      weatherParameter = "humidity";
      imageWidth = 375;
      unit = "%";
      break;
    default:
      break;
  }

  return (
    <div className={`${classes["slide-details"]}`}>
      {weatherParameter === "description" ? (
        <img
          width={imageWidth}
          className={`${classes[weatherParameter]}`}
          src={require(`../../../assets/WeatherIcons/${typeOfDay}/${props.descriptionIcon}.svg`)}
          alt="weathericon"
        ></img>
      ) : (
        <img
          width={imageWidth}
          className={`${classes[weatherParameter]}`}
          src={require(`../../../assets/WeatherIcons/other/${props.title}.svg`)}
          alt={props.icon}
        ></img>
      )}

      <div className={`${classes["slide-data"]} ${classes[weatherParameter]}`}>
        {weatherParameter !== "temp"
          ? props.data + " " + unit
          : props.data + unit}

        {weatherParameter === "temp" && (
          <div className={classes.feelsLike}>
            Feels Like: {feelsLike + unit}
          </div>
        )}
      </div>
      {weatherParameter !== "temp" && weatherParameter !== "description" && (
        <div
          className={`${classes["slide-title"]} ${classes[weatherParameter]}`}
        >
          {props.title}
        </div>
      )}
    </div>
  );
};

export default Slide;
