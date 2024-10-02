import { lazy, Suspense } from "react";
import Loading from "./shared/Loading";
import { useLocation } from "react-router-dom";
import { WeatherData } from "../interfaces/responses/weatherData.interface";

const WeatherDetail = lazy(() => import("./WeatherDetail"));

const CityDetail = () => {
  const location = useLocation();
  const city: WeatherData = location.state;

  return (
    <Suspense fallback={<Loading />}>
      <WeatherDetail city={city} />
    </Suspense>
  )
}
export default CityDetail