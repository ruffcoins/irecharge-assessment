import { lazy, Suspense } from "react"
import Loading from "./shared/Loading";
import { Link } from "react-router-dom";
import moment from "moment-timezone";
import WeatherSearchAndFavorites from "./WeatherSearchAndFavorites";
import useFetchWeatherData from "../hooks/useFetchWeatherData";
import { greeting } from "../lib/getGreeting";

const WeatherCard = lazy(() => import("./WeatherCard"));

const Cities = () => {
  const { weatherData } = useFetchWeatherData();

  return (
    <div className="p-4 space-y-8">
      <div className="space-y-2 lg:px-14">
        <h1 className="text-3xl font-medium lg:text-5xl">Good {greeting},</h1>
        <p className="lg:text-xl text-pretty text-slate-500">
          {moment.utc().format('Do MMMM, dddd')}
        </p>
      </div>


      <div className="lg:px-14">
        <WeatherSearchAndFavorites />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-8 lg:px-14">
        {weatherData.sort((a, b) => a.location.name.localeCompare(b.location.name)).map((city, index) => (
          <Link key={index} to={`/city-detail/${city.location.name}`} state={city}>
            <Suspense fallback={<Loading />}>
              <WeatherCard city={city} />
            </Suspense>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Cities