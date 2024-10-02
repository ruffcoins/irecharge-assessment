import { Cloud, Wind, Sun, CloudRain } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { WeatherData } from "../interfaces/responses/weatherData.interface"

interface WeatherCardProps {
  city: WeatherData;
}

export default function WeatherCard({ city }: WeatherCardProps) {
  const getWeatherIcon = (description: string) => {
    if (description.includes("rain")) return <CloudRain className="w-4 h-4 text-muted-foreground" />;
    if (description.includes("Sunny") || description.includes("Sun")) return <Sun className="w-4 h-4 text-muted-foreground" />;
    return <Cloud className="w-4 h-4 text-muted-foreground" />;
  };

  return (
    <Card className="relative w-full max-w-sm mx-auto">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">Weather</CardTitle>
        {getWeatherIcon(city?.current.weather_descriptions[0])}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{city.location.name}</div>
        <div className="flex items-center justify-between mt-4">
          <div className="text-4xl font-bold">{city?.current.temperature}°C</div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">{city?.current.weather_descriptions}</div>
            <div className="flex items-center mt-1">
              <Wind className="w-4 h-4 mr-1 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{city?.current.wind_speed} km/h</span>
            </div>
          </div>
        </div>
      </CardContent>

    </Card>
  )
}