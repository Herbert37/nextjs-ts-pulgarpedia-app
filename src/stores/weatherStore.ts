import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { City } from '../types/city';

interface WeatherStore {
  favorites: City[];
  addFavorite: (city: City) => void;
  removeFavorite: (cityId: number) => void;
}

export const useWeatherStore = create(
  persist<WeatherStore>(
    (set) => ({
      favorites: [],
      addFavorite: (city) =>
        set((state) => ({
          favorites: [...state.favorites, city],
        })),
      removeFavorite: (cityId) =>
        set((state) => ({
          favorites: state.favorites.filter((city) => city.id !== cityId),
        })),
    }),
    {
      name: 'weather-storage',
    }
  )
)