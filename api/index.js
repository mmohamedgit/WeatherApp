const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, "public") });
});

app.get("/api", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  res.sendFile(path.join(__dirname, "/api/build/index.html"));
});

app.post("/selectedCity", (req, res, next) => {
  const city = req.body.city; //this is parsing the cityName data from the browser input to our server
  const apiKey = process.env.API_KEY;
  const units = "metric";
  const location = req.body.coordinates;

  var url = "";
  if (location) {
    const lat = location.latitude;
    const lon = location.longitude;
    url =
      "https://api.openweathermap.org/data/2.5/weather?" +
      "lat=" +
      lat +
      "&lon=" +
      lon +
      "&appid=" +
      apiKey +
      "&units=" +
      units;
  } else {
    url =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=" +
      apiKey +
      "&units=" +
      units;
  }

  async function getWeatherData() {
    try {
      const response = await axios.get(url);

      const data = await response.data;
      console.log(data);

      const selectedCity = data.name;
      const country = data.sys.country;
      const weatherId = data.id;
      const currentTemp = Math.round(data.main.temp);
      const ambientTemp = Math.round(data.main.feels_like);
      const weatherDescription = data.weather[0].description;
      const iconImage = data.weather[0].id;
      const backupIconId = data.weather[0].icon;

      const windSpeed = data.wind.speed;
      const windDirection = data.wind.deg;
      const pressure = data.main.pressure;
      const humidity = data.main.humidity;

      const unixCurrentTime = data.dt;
      const unixDateTime = data.dt * 1000;
      const unixSunriseTime = data.sys.sunrise;
      const unixSunsetTime = data.sys.sunset;
      const selectedCityTimeZone = data.timezone;

      var typeOfDay = "night";
      if (
        unixCurrentTime > unixSunriseTime &&
        unixCurrentTime < unixSunsetTime
      ) {
        typeOfDay = "day";
      }

      const currentDateTime = new Date(unixDateTime);

      const currentDayOfTheWeek = currentDateTime.toLocaleDateString(
        "default",
        { weekday: "long" }
      );
      const currentMonth = currentDateTime.toLocaleDateString("default", {
        month: "long",
      });

      const currentDay = currentDateTime.getDate();
      const currentYear = currentDateTime.getFullYear();

      //since the new Date object adjusts with the browser's timezone, we need to offset this to get the correct local time for cities
      const localTimeZoneOffset = new Date().getTimezoneOffset() * 60;

      const sunrise = new Date(
        (unixSunriseTime + selectedCityTimeZone + localTimeZoneOffset) * 1000
      );
      const sunset = new Date(
        (unixSunsetTime + selectedCityTimeZone + localTimeZoneOffset) * 1000
      );

      const sunriseTime = sunrise.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
      });
      const sunsetTime = sunset.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
      });

      const date =
        currentDayOfTheWeek +
        " " +
        currentMonth +
        " " +
        currentDay +
        " " +
        currentYear;

      var weatherIcon;

      switch (iconImage) {
        case 200:
        case 210:
        case 230:
          weatherIcon = "200-210-230-light_thunderstorm";
          break;
        case 201:
        case 202:
        case 211:
        case 212:
        case 221:
        case 231:
        case 232:
          weatherIcon = "201-202-211-212-221-231-232-rain_thunderstorm";
          break;
        case 301:
        case 302:
        case 310:
        case 311:
        case 312:
        case 313:
        case 314:
        case 321:
          weatherIcon = "301-302-310-311-312-313-314-321-drizzle";
          break;
        case 501:
        case 502:
        case 503:
        case 504:
        case 520:
        case 521:
        case 522:
        case 531:
          weatherIcon = "501-502-503-504-520-521-522-531-rain";
          break;
        case 511:
        case 615:
        case 616:
          weatherIcon = "511-615-616-rain_snow-freezing_rain";
          break;
        case 601:
        case 602:
        case 620:
        case 621:
        case 622:
          weatherIcon = "601-602-620-621-622-snow";
          break;
        case 611:
        case 613:
          weatherIcon = "611-613-sleet";
          break;
        case iconImage:
          weatherIcon = iconImage;
          break;

        default:
          weatherIcon = backupIconId;
          break;
      }

      const weatherData = {
        id: weatherId,
        city: selectedCity,
        country,
        currentTemp,
        ambientTemp,
        description: weatherDescription,
        date,
        typeOfDay,
        weatherIcon,
        sunriseTime,
        sunsetTime,
        windSpeed,
        windDirection,
        pressure,
        humidity,
      };
      console.log(weatherData);
      res.send(weatherData);
    } catch (error) {
      const errorResponse = error.response;
      const errorCode = errorResponse.data.cod;
      const errorMessage = errorResponse.data.message;

      const weatherData = {
        errorCode: errorCode,
        errorMessage: errorMessage,
      };

      console.log(weatherData);
      res.send(weatherData);
    }
  }
  getWeatherData();
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});

module.exports = app;
