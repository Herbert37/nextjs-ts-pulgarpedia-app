import React from 'react';
import { Typography, Grid, Paper } from '@mui/material';
import { useWeatherStore } from '../stores/weatherStore';
import WeatherCard from './WeatherCard';

const FavoriteCities = () => {
  const { favorites } = useWeatherStore();

  return (
    <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Favorite Cities
      </Typography>
      <Grid container spacing={2}>
        {favorites.length > 0 
          ? (favorites.map((city) => (
          <Grid item xs={12} key={city.id}>
            <WeatherCard city={city} />
          </Grid>
          ))) :
          <Grid item xs={12}>
            <Typography>No favorite cities found.</Typography>
          </Grid>
        }
      </Grid>
    </Paper>
  );
};

export default FavoriteCities;