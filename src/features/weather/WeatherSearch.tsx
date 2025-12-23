import { useEffect } from "react";
import WeatherCard from "./WeatherCard";
import Input from "../../components/Input";
import { useWeather } from "../../context/WeatherContext";

const WeatherSearch: React.FC = () => {
  const { city, setCity, weather, error, loading, reset, fetchWeather } = useWeather();

  useEffect(() => {
    const controller = new AbortController(); 
    const signal = controller.signal;

    const timer = setTimeout(() => {
      fetchWeather(city, signal); 
    }, 500);

    return () => {
      clearTimeout(timer);   
      controller.abort();   
    };
  }, [city]);

  return (
    <div className="weather-container">
      <div className="weather-form">
        <Input name="city" value={city} onChange={setCity} placeholder="Enter city" type="text" error={error}/>

        <div className="button-group">
          <button onClick={reset}>Reset</button>
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