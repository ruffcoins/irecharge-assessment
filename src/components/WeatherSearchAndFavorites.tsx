"use client"

import { useState, useEffect } from 'react'
import { Star, X, Cloud, Thermometer, Wind, LoaderCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { ScrollArea } from "./ui/scroll-area"
import { Link } from 'react-router-dom'
import useSearchCity from '../hooks/useSearchCity'
import useFetchWeatherData from '../hooks/useFetchWeatherData'
import { Result, SearchLocation } from '../interfaces/responses/searchLocation'
import { WeatherData } from '../interfaces/responses/weatherData.interface'
import { debounce } from "lodash";
import useFavorites from '../hooks/useFavourites'


export default function WeatherSearchAndFavorites() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<WeatherData | string>()
  const [suggestions, setSuggestions] = useState<Result[]>([])
  const [isSuggesting, setIsSuggesting] = useState<boolean>(false)
  const { getLocation } = useSearchCity();
  const { getWeatherData } = useFetchWeatherData();
  const { favorites, updateFavorites } = useFavorites()

  const handleSuggestions = async (searchTerm: string) => {
    let results: SearchLocation;

    if (searchTerm.trim() !== "") {
      setIsSuggesting(true)
      results = await getLocation(searchTerm);
      setIsSuggesting(false)
      console.log("results", results.results)

      if (results.results.length > 0) {
        setSuggestions(results.results)
      } else {
        setSuggestions([])
      }
    }
  }

  const debouncedSuggestions = debounce(() => handleSuggestions(searchTerm), 1000);

  useEffect(() => {
    debouncedSuggestions();
    return () => {
      debouncedSuggestions.cancel();
    };
  }, [searchTerm]);

  const handleSearch = async (city: string) => {
    setSearchTerm('')
    const results = await getWeatherData(city)

    if (results) {
      setSearchResults(results)
    } else {
      setSearchResults(`No Weather found for ${city}`)
    }
  }

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Weather Search</CardTitle>
      </CardHeader>
      <CardContent className='relative'>
        <div className="flex items-center mb-4 space-x-2">
          <Input
            type="text"
            placeholder="Search for a location..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
            className="flex-grow"
          />
          {isSuggesting && <LoaderCircle className='w-4 h-6 animate-spin' />}
        </div>
        {searchTerm && suggestions.length > 0 && (
          <div className='absolute left-0 right-0 z-10 p-2 mx-6 bg-white shadow top-10'>

            <ul className="divide-y">
              {suggestions.map((suggestion) => (
                <li key={suggestion.formatted} className='p-2 cursor-pointer hover:bg-slate-100'
                  onClick={() => handleSearch(suggestion.formatted)}
                >
                  {suggestion.formatted}
                </li>
              ))}
            </ul>
          </div>
        )}


        {searchResults && (
          <Card className="mb-4">
            <CardHeader>
              <CardTitle className="text-lg">Search Results</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="min:h-[100px] w-full rounded-md">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {typeof searchResults !== "string" && searchResults ? (
                    <Card className="relative">
                      <Link to={`/city-detail/${searchResults.location.name}`} state={searchResults}>

                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">{searchResults.location.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Thermometer className="w-5 h-5 mr-2" />
                              <span className="text-2xl font-bold">{searchResults.current.temperature}°C</span>
                            </div>
                            <div className="flex items-center">
                              <Wind className="w-5 h-5 mr-2" />
                              <span>{searchResults.current.wind_speed} km/h</span>
                            </div>
                          </div>
                          <div className="flex items-center mt-2">
                            <Cloud className="w-5 h-5 mr-2 text-gray-500" />
                            <span>{searchResults.current.weather_descriptions}</span>
                          </div>
                        </CardContent>
                      </Link>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          updateFavorites(searchResults, true);
                        }}
                      >
                        <Star className="w-4 h-4" />
                      </Button>
                    </Card>

                  ) : <p>{searchResults as string}</p>}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Favorite Locations</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="min:h-[100px] w-full rounded-md">
              {favorites.length === 0 ? (
                <p className="text-center text-muted-foreground">No favorite locations yet. Search and add some!</p>
              ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {favorites.sort((a, b) => a.location.name.localeCompare(b.location.name)).map((location) => (
                    <Card key={location.location.name} className="relative">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{location.location.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Thermometer className="w-5 h-5 mr-2 text-orange-500" />
                            <span className="text-2xl font-bold">{location.current.temperature}°C</span>
                          </div>
                          <div className="flex items-center">
                            <Wind className="w-5 h-5 mr-2 text-blue-500" />
                            <span>{location.current.wind_speed} km/h</span>
                          </div>
                        </div>
                        <div className="flex items-center mt-2">
                          <Cloud className="w-5 h-5 mr-2 text-gray-500" />
                          <span>{location.current.weather_descriptions}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => updateFavorites(location, false)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </CardContent >
    </Card >
  )
}