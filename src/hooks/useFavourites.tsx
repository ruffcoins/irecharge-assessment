import { useState } from "react";
import { WeatherData } from "../interfaces/responses/weatherData.interface";
import { getFromLocalStorage, removeFromLocalStorage, saveToLocalStorage } from "../lib/storage";

const useFavorites = () => {
  const [favorites, setFavorites] = useState<WeatherData[]>(() => {
    const savedFavorites = getFromLocalStorage("favorites");
    return savedFavorites ? savedFavorites : [];
  });

  const updateFavorites = (cityWeather: WeatherData, isAdding: boolean) => {
    setFavorites(prev => {
      const updatedFavorites = isAdding
        ? prev.some(fav => fav.current === cityWeather.current) ? prev : [...prev, cityWeather]
        : prev.filter(fav => fav.current !== cityWeather.current);

      saveToLocalStorage("favorites", updatedFavorites);
      return updatedFavorites;
    });
  };

  const removeAllFavorites = () => {
    setFavorites([]);
    removeFromLocalStorage("favorites");
  };

  return { favorites, updateFavorites, removeAllFavorites };
};

export default useFavorites;