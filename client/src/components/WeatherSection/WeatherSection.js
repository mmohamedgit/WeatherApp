import { Fragment } from "react";
import SliderInfo from "./Slide/SliderInfo";
import SliderCard from "../UI/SliderCard";
import Location from "./Location/Location";

const WeatherSection = (props) => {
  const {
    id,
    city,
    country,
    date,
    description,
    descriptionIcon,
    typeOfDay,
    temperature,
    feelsLike,
    sunriseTime,
    sunsetTime,
    windSpeed,
    windDirection,
    pressure,
    humidity,
  } = props;

  return (
    <Fragment>
      <Location city={city} country={country} date={date} />
      <SliderCard>
        <SliderInfo
          id={id}
          description={description}
          descriptionIcon={descriptionIcon}
          typeOfDay={typeOfDay}
          temperature={temperature}
          feelsLike={feelsLike}
          sunriseTime={sunriseTime}
          sunsetTime={sunsetTime}
          windSpeed={windSpeed}
          windDirection={windDirection}
          pressure={pressure}
          humidity={humidity}
        />
      </SliderCard>
    </Fragment>
  );
};

export default WeatherSection;
