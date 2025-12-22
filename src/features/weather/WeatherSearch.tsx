import { useState } from "react";
import type { WeatherData } from "../../models/WeatherData.type";
import WeatherCard from "./WeatherCard";
import Input from "../../components/Input";

const WeatherSearch: React.FC = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState("");

  const API_KEY = import.meta.env.VITE_API_KEY;
  const BASE_URL = import.meta.env.VITE_OPENWEATHER_BASE_URL;
  
  const url = `${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`;

  const handleSearch = async () => {
    if (!city) return;

    try {
      setError("");
      const res = await fetch(url);
      const data = await res.json();

      if (data.cod !== 200) {
        setError(data.message);
        setWeather(null);
      } else {
        setWeather(data);
      }
    } catch (err) {
      setError("Failed to fetch weather data");
      setWeather(null);
    }
  };

  const handleReset = () => {
    setCity(""); 
    setWeather(null); 
    setError("");
  };

  return (
    <div className="weather-form">
      <Input name="city" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter city" type="text" error={error}/>
      
      <div className="button-group">
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      
      {
        weather && 
        <div style={{ marginTop: "2rem" }}>
            <WeatherCard data={weather} />
        </div>
      }
    </div>
  );
};

export default WeatherSearch;