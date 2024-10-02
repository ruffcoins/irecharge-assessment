import { useEffect, useState } from "react";
import axios from "axios";
import { WeatherData } from "../interfaces/responses/weatherData.interface";
import { PopularCities } from "../constants/data";
import { getFromLocalStorage, saveToLocalStorage } from "../lib/storage";

const useFetchWeatherData = () => {
  const popularCities = getFromLocalStorage("popular-cities");

  const [weatherData, setWeatherData] = useState<WeatherData[]>(() => {
    return popularCities ? popularCities : [];
  });

  const getWeatherData = async (city: string): Promise<WeatherData> => {
    const { data } = await axios.get(`${import.meta.env.VITE_WEATHERSTACK_API_URL}/current`, {
      params: {
        access_key: import.meta.env.VITE_WEATHERSTACK_API_KEY,
        query: city,
      }
    });
    return data;
  }

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await Promise.all(PopularCities.map(city => getWeatherData(city)));
      setWeatherData(data);
    };

    if (popularCities && popularCities.length > 0) {
      setWeatherData(popularCities)
    } else if (weatherData.length === 0) {
      // The API is rate limited, so i have to reduce how many times component has to utilize the network calls
      fetchWeatherData();
    }

  }, [popularCities, weatherData.length]);

  useEffect(() => {
    saveToLocalStorage("popular-cities", weatherData);
  }, [weatherData]);

  const handleSuggestionClick = (city: string) => {
    getWeatherData(city);
  }

  return { weatherData, setWeatherData, handleSuggestionClick, getWeatherData };
}

export default useFetchWeatherData;