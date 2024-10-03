import useFetchWeatherData from "./useFetchWeatherData";
import { useEffect, useState } from "react";
import { WeatherData } from "../interfaces/responses/weatherData.interface";
import { getFromLocalStorage, saveToLocalStorage } from "../lib/storage";

const useCurrentLocation = () => {
  const [currentWeather, setCurrentWeather] = useState<WeatherData>(() => {
    const currentWeather = getFromLocalStorage("current-location-weather");
    return (navigator.geolocation && currentWeather) ? currentWeather : {}
  });
  const [loading, setLoading] = useState(false)

  const { getWeatherData } = useFetchWeatherData();

  useEffect(() => {
    const fetchLocalWeather = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          const city = `${latitude.toString()}+${longitude.toString()}`
          setLoading(true);
          const weather = await getWeatherData(city)
          setCurrentWeather(weather as WeatherData);
          saveToLocalStorage("current-location-weather", weather)
          setLoading(false)
        });
      }
    };

    fetchLocalWeather();
  }, []);

  return { currentWeather, setCurrentWeather, loading }
}

export default useCurrentLocation