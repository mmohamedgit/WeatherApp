import { useState, useCallback, useEffect } from "react";
import useGeoLocation from "./hooks/useGeoLocation";
import classes from "./App.module.css";
import SearchBar from "../src/components/SearchBar/SearchBar";
import WeatherSection from "./components/WeatherSection/WeatherSection";
import Spinner from "./components/UI/Spinner";
import axios from "axios";
import Footer from "./components/Footer/Footer";
import HideLocation from "./components/WeatherSection/Location/HideLocation";
import ErrorPage from "./components/ErrorPage/ErrorPage";

function App() {
  const [currentWeatherData, setCurrentWeatherData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [locationError, setLocationError] = useState(null);

  const location = useGeoLocation();

  async function selectedCityHandler(city) {
    setIsLoading(true);
    setError(null);
    setLocationError(null);
    try {
      const response = await axios.post("/api/selectedCity", {
        city: city,
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.data;

      if (data.errorCode) {
        setError(data);
      }
      const weatherdata = [];
      weatherdata.push(data);
      setCurrentWeatherData(weatherdata);
    } catch (error) {
      setError(error.response);
      // console.log(error);
    }
    setIsLoading(false);
  }

  const currentUserWeather = useCallback(
    async function () {
      setIsLoading(true);
      setError(null);
      setLocationError(null);

      const { loaded, error, coordinates } = location;
      // console.log(location);

      if (!loaded) {
        setIsLoading(false);
        setLocationError({
          message:
            "Please enable your geolocation to view the weather for your current location...",
          status: "location-hide",
        });
        return;
      }

      if (loaded && error) {
        setIsLoading(false);

        if (error.code === 1) {
          setLocationError({
            status: "hide-location",
            message:
              "Privacy is very important. Please enter the city of your choice in the search bar.",
          });
        } else {
          setLocationError({
            ...error,
            status: "hide-location",
            message: error.message,
          });
        }
        return;
      }

      if (loaded && coordinates) {
        setLocationError(null);
        if (coordinates.latitude !== "" || coordinates.longitude !== "") {
          setLocationError(null);
          try {
            const response = await axios.post("/api/selectedCity", {
              coordinates,
              headers: { "Content-Type": "application/json" },
            });

            const data = await response.data;
            // console.log(data);
            if (data.errorCode) {
              setError(data);
              // console.log(error);
            }
            const weatherdata = [];
            weatherdata.push(data);
            setCurrentWeatherData(weatherdata);
          } catch (error) {
            setError(error.response);
            // console.log(error);
          }
        }
      }
      setIsLoading(false);
    },
    [location]
  );

  useEffect(() => {
    currentUserWeather();
  }, [currentUserWeather]);

  return (
    <div className={classes.app}>
      <main>
        <SearchBar onEnteredCity={selectedCityHandler} />
        {locationError && location.loaded && (
          <HideLocation
            status={locationError.status}
            message={locationError.message}
            code={locationError.code}
          />
        )}
        {isLoading && <Spinner />}
        {!error &&
          !isLoading &&
          currentWeatherData.map((stat) => (
            <WeatherSection
              key={stat.id}
              id={stat.id}
              city={stat.city}
              country={stat.country}
              date={stat.date}
              temperature={stat.currentTemp}
              feelsLike={stat.ambientTemp}
              sunriseTime={stat.sunriseTime}
              sunsetTime={stat.sunsetTime}
              windSpeed={stat.windSpeed}
              windDirection={stat.windDirection}
              pressure={stat.pressure}
              humidity={stat.humidity}
              description={stat.description}
              descriptionIcon={stat.weatherIcon}
              typeOfDay={stat.typeOfDay}
            />
          ))}
        {error && !isLoading && (
          <ErrorPage
            errorCode={error.errorCode}
            errorMessage={error.errorMessage}
            statusCode={error.status}
            statusText={error.statusText}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
