import type { WeatherData } from "../../models/WeatherData.type";

interface WeatherCardProps {
  data: WeatherData;
}
const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
  const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  return (
    <div style={{ border: "1px solid #ddd", borderRadius: "8px", width: "250px", textAlign: "center" }}>
      <h3>{data.name}</h3>
      <img src={iconUrl} alt={data.weather[0].description} />
      <p>{data.weather[0].description}</p>
      <p>Temp: {data.main.temp}°C</p>
      <p>Humidity: {data.main.humidity}%</p>
      <p>Wind: {data.wind.speed} m/s</p>
    </div>
  );
};

export default WeatherCard;