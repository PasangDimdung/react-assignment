import { useEffect, useState } from "react";
import type { WeatherData } from "../../models/WeatherData.type";
import WeatherCard from "./WeatherCard";
import Input from "../../components/Input";

const WeatherSearch: React.FC = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_API_KEY;
  const BASE_URL = import.meta.env.VITE_OPENWEATHER_BASE_URL;
  
  const url = `${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`;

  useEffect(() => {
    if (!city.trim()) {
      setWeather(null);
      setError("");
      setLoading(false);
      return;
    }

    const controller = new AbortController(); 
    
    const fetchWeather = async () => {
        setLoading(true);
        setError("");
        try {
          const res = await fetch(url, { signal: controller.signal });
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
        } finally {
          setLoading(false);
          setError("");
        }
    }

    fetchWeather();

     // Cleanup function
    return () => {
      controller.abort();
    };
    
  },[city]);

  //EVENT HANDLERS ONLY update state
  const handleCityChange = (value: string) => {
    setCity(value);
  };

  const handleReset = () => {
    setCity(""); 
    setWeather(null); 
    setError("");
  };

  return (
    <div className="weather-container">
      <div className="weather-form">
        <Input name="city" value={city} onChange={handleCityChange} placeholder="Enter city" type="text" error={error}/>

        <div className="button-group">
          <button onClick={handleReset}>Reset</button>
        </div>
      </div>
      
      {loading && <p>Loading...</p>}
      {weather && (
        <div className="weather-result">
          <WeatherCard data={weather} />
        </div>
      )}
    </div>
  );
};

export default WeatherSearch;