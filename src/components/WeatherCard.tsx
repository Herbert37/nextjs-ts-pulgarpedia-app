import React from 'react';
import { Card, CardMedia, CardHeader, IconButton } from '@mui/material';
import { useWeatherStore } from '../stores/weatherStore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import type { WeatherCard } from '../types/city';

const WeatherCard = ({ city } : WeatherCard) => {
  const { favorites, addFavorite, removeFavorite } = useWeatherStore();

  const isFavorite = favorites.some((fav) => fav.id === city.id);

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFavorite(city.id);
    } else {
      addFavorite(city);
    }
  };

  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <CardHeader
        avatar={
          <CardMedia
            component="img"
            height="140"
            image={`http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}
            alt={city.weather[0].description}
          />
        }
        action={
          <IconButton
            color={isFavorite ? 'secondary' : 'primary'}
            onClick={handleFavoriteToggle}
          >
            {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        }
        title={city.name}
        subheader={`${city.weather[0].main} - ${city.main.temp}°C`}
      />
    </Card>
  );
};

export default WeatherCard;