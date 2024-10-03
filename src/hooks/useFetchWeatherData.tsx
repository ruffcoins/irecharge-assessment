import { useEffect, useState } from "react";
import axios from "axios";
import { WeatherData, WeatherDataErrorResponse } from "../interfaces/responses/weatherData.interface";
import { PopularCities } from "../constants/data";
import { getFromLocalStorage, saveToLocalStorage } from "../lib/storage";

const useFetchWeatherData = () => {
  const popularCities = getFromLocalStorage("popular-cities");

  const [weatherData, setWeatherData] = useState<WeatherData[]>(() => {
    return popularCities ? popularCities : [];
  });
  const [subscriptionLimitMessage, setSubscriptionLimitMessage] = useState("");

  const getWeatherData = async (city: string): Promise<WeatherData | WeatherDataErrorResponse> => {
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

      if ('error' in data[0]) {
        if (data[0].error.code === 104) {
          setWeatherData([])
          setSubscriptionLimitMessage("Your monthly usage limit has been reached. Please upgrade your Subscription Plan.")
        } else {
          setWeatherData(data as WeatherData[]);
        }
      }
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

  return { subscriptionLimitMessage, weatherData, setWeatherData, handleSuggestionClick, getWeatherData };
}

export default useFetchWeatherData;