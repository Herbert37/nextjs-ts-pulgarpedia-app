import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const searchCities = async (query: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/find`, {
      params: {
        q: query,
        type: 'like',
        sort: 'population',
        cnt: 20,
        appid: API_KEY,
        units: 'metric'
      }
    });
    return response.data.list;
  } catch (error) {
    console.error('Error searching cities:', error);
    return [];
  }
};

export const getRandomCities = async () => {
  const citiesFromEnv = process.env.NEXT_PUBLIC_CITIES || '';
  const allCities = citiesFromEnv.split(',').map(city => city.trim());
  const randomCities = allCities
    .sort(() => Math.random() - 0.5) 
    .slice(0, 8);
  const promises = randomCities.map(city => 
    axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric'
      }
    })
  );
  try {
    const responses = await Promise.all(promises);
    return responses.map(response => response.data);
  } catch (error) {
    console.error('Error fetching random cities:', error);
    return [];
  }
};

