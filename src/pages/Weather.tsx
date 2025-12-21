import WeatherCard from "../features/weather/WeatherCard";
import type { WeatherData } from "../models/WeatherData.type";

const mockWeather: WeatherData = {
  name: "Kathmandu",
  main: {
    temp: 22,
    humidity: 65,
    temp_min: 20,
    temp_max: 25,
  },
  weather: [
    {
      description: "Clear Sky",
      icon: "01d",
    },
  ],
  wind: {
    speed: 3.5,
  },
};

const Weather = () => {
  return (
    <section>
      <h2>Weather App</h2>
      <WeatherCard data={mockWeather}/>
    </section>
  );
};

export default Weather;