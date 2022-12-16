import Slider from "../Slider/Slider";
import Slide from "./Slide";

const SliderInfo = (props) => {
  const titles = [
    "Description",
    "Temperature",
    "Feels Like",
    "Sunrise Time",
    "Sunset Time",
    "Wind Speed",
    "Wind Direction",
    "Pressure",
    "Humidity",
  ];

  const SliderData = [
    {
      weatherSlide: (
        <Slide
          key={props.id}
          id={props.id}
          title={titles[0]}
          data={props.description}
          descriptionIcon={props.descriptionIcon}
          typeOfDay={props.typeOfDay}
        />
      ),
    },
    {
      weatherSlide: (
        <Slide
          key={props.id}
          id={props.id}
          title={titles[1]}
          data={props.temperature}
          feelsLike={props.feelsLike}
        />
      ),
    },
    {
      weatherSlide: (
        <Slide
          key={props.id}
          id={props.id}
          title={titles[3]}
          data={props.sunriseTime}
        />
      ),
    },
    {
      weatherSlide: (
        <Slide
          key={props.id}
          id={props.id}
          title={titles[4]}
          data={props.sunsetTime}
        />
      ),
    },
    {
      weatherSlide: (
        <Slide
          key={props.id}
          id={props.id}
          title={titles[5]}
          data={props.windSpeed}
        />
      ),
    },
    {
      weatherSlide: (
        <Slide
          key={props.id}
          id={props.id}
          title={titles[6]}
          data={props.windDirection}
        />
      ),
    },
    {
      weatherSlide: (
        <Slide
          key={props.id}
          id={props.id}
          title={titles[7]}
          data={props.pressure}
        />
      ),
    },
    {
      weatherSlide: (
        <Slide
          key={props.id}
          id={props.id}
          title={titles[8]}
          data={props.humidity}
        />
      ),
    },
  ];

  return <Slider key={props.id} id={props.id} slides={SliderData} />;
};

export default SliderInfo;
