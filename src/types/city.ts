export interface City {
  id: number;
  name: string;
  weather: Weather[],
  main: {
    temp: number;
  };
}

export interface Weather {
  main: string;
  description: string;
  icon: string;
}

export interface WeatherCard {
  city: City;
}