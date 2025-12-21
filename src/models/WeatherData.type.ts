export interface WeatherData {
  name: string;               
  main: {
    temp: number;             
    humidity: number;         
    temp_min: number;        
    temp_max: number;        
  };
  weather: {
    description: string;      
    icon: string;             
  }[];
  wind: {
    speed: number;          
  };
}