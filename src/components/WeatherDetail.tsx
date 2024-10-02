import { Sun, Clock, Cloud, Droplets, Eye, Gauge, Thermometer, Wind, Plus, X, Check, Edit } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { WeatherData } from "../interfaces/responses/weatherData.interface";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import useNotes from "../hooks/useNotes";
import { getUVIndexSeverity } from "../lib/getUVIndexSeverity";

export default function WeatherDetail({ city }: { city: WeatherData }) {
  const {
    newNote,
    editingNoteId,
    editedNoteContent,
    addNote,
    removeNote,
    saveEditedNote,
    startEditingNote,
    setEditedNoteContent,
    setNewNote,
    getNotes
  } = useNotes();

  const cityNotes = getNotes(city.location.name)

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-6 text-2xl font-bold lg:text-3xl">
        Weather for {city.location.name}
      </h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Location</CardTitle>
            <Cloud className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{city.location.name}</div>
            <p className="text-xs text-muted-foreground">{city.location.timezone_id}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Temperature</CardTitle>
            <Thermometer className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{city.current.temperature}°C</div>
            <p className="text-xs text-muted-foreground">Feels like {city.current.feelslike}°C</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Weather</CardTitle>
            <Cloud className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{city.current.weather_descriptions}</div>
            <p className="text-xs text-muted-foreground">Cloud cover: {city.current.cloudcover}%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Wind</CardTitle>
            <Wind className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{city.current.wind_speed} km/h {city.current.wind_dir}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Humidity</CardTitle>
            <Droplets className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{city.current.humidity}%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Pressure</CardTitle>
            <Gauge className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{city.current.pressure} hPa</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">UV Index</CardTitle>
            <Sun className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{city.current.uv_index}</div>
            <p className="text-xs text-muted-foreground">{getUVIndexSeverity(city.current.uv_index)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Visibility</CardTitle>
            <Eye className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{city.current.visibility} km</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Precipitation</CardTitle>
            <Cloud className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{city.current.precip} mm</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Local Time</CardTitle>
            <Clock className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{city.current.observation_time}</div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex mb-4">
              <Input
                type="text"
                placeholder="Add a note..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="mr-2"
              />
              <Button onClick={() => addNote(city.location.name)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Note
              </Button>
            </div>
            <ul className="space-y-2">
              {cityNotes.map((note) => (
                <li key={note.id} className="flex items-center justify-between p-2 rounded-md bg-secondary">
                  {editingNoteId === note.id ? (
                    <Input
                      type="text"
                      value={editedNoteContent}
                      onChange={(e) => setEditedNoteContent(e.target.value)}
                      className="flex-grow mr-2"
                    />
                  ) : (
                    <span>{note.content}</span>
                  )}
                  <div className="flex">
                    {editingNoteId === note.id ? (
                      <Button variant="ghost" size="sm" onClick={() => saveEditedNote(note.id, city.location.name)}>
                        <Check className="w-4 h-4" />
                      </Button>
                    ) : (
                      <Button variant="ghost" size="sm" onClick={() => startEditingNote(note.id, note.content)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" onClick={() => removeNote(note.id, city.location.name)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}