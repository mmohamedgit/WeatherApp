import { useEffect, useState } from "react";

const useGeoLocation = () => {
  const [userLocation, setUserLocation] = useState({
    loaded: false,
    coordinates: {
      latitude: "",
      longitude: "",
    },
  });

  const successCallback = (position) => {
    setUserLocation({
      loaded: true,
      coordinates: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
    });
  };

  const errorCallback = (error) => {
    setUserLocation({
      loaded: true,
      error,
    });
  };

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      errorCallback({
        code: 0,
        message: "Geolocation not supported",
      });
    }

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {
      enableHighAccuracy: true,
    });
  }, []);

  return userLocation;
};

export default useGeoLocation;
