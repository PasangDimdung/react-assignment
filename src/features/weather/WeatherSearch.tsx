import { useState } from "react";
import type { WeatherData } from "../../models/WeatherData.type";
import WeatherCard from "./WeatherCard";

const WeatherSearch: React.FC = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState("");

  const API_KEY = "7a04994c28dfffcb2dc8cc907f066ba2"; 

  const handleSearch = async () => {
    if (!city) return;

    try {
      setError("");
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
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
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={handleReset} style={{ marginLeft: "10px" }}>Reset</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
  
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