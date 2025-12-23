import { createContext, useContext, useState,  useMemo, type ReactNode } from "react";
import type { WeatherData } from "../models/WeatherData.type";

interface WeatherContextType {
  city: string;
  setCity: (value: string) => void;
  weather: WeatherData | null;
  error: string;
  loading: boolean;
  reset: () => void;
  fetchWeather: (city: string, signal: AbortSignal) => void;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) throw new Error("useWeather must be used within WeatherProvider");
  return context;
};

export const WeatherProvider = ({ children }: { children: ReactNode }) => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_API_KEY;
  const BASE_URL = import.meta.env.VITE_OPENWEATHER_BASE_URL;

  const fetchWeather = async (query: string, signal: AbortSignal ) => {
    if (!query.trim()) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${BASE_URL}/weather?q=${query}&units=metric&appid=${API_KEY}`, { signal });
      const data: WeatherData & { cod: number; message?: string } = await res.json();

      if (data.cod !== 200) {
        setError(data.message || "Error fetching weather");
        setWeather(null);
      } else {
        setWeather(data);
      }
    } catch {
        setError("Failed to fetch weather data");
        setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setCity("");
    setWeather(null);
    setError("");
    setLoading(false);
  };

  const value = useMemo(
    () => ({ city, setCity, weather, error, loading, reset, fetchWeather }),
    [city, weather, error, loading]
  );

  return <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>;
};
