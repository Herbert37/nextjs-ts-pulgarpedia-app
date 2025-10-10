import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Paper, Button, IconButton } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import Header from '../components/Header';
import WeatherCard from '../components/WeatherCard';
import FavoriteCities from '../components/FavoriteCities';
import { searchCities, getRandomCities } from '../utils/api';
import Menu from '../components/Menu';
import RefreshIcon from '@mui/icons-material/Refresh';
// types
import type { City } from '../types/city';

const Home: React.FC = () => {
  const [cities, setCities] = useState<City[]>([]);

  useEffect(() => {
    fetchRandomCities();
  }, []);

  const fetchRandomCities = async () => {
    const randomCities = await getRandomCities();
    setCities(randomCities);
  };

  const handleSearch = async (query: string) => {
    if (query.trim() === '') {
      fetchRandomCities();
    } else {
      const searchResults = await searchCities(query);
      setCities(searchResults);
    }
  };

  return (
    <>
      <Menu />
      <Header onSearch={handleSearch} />
      <Container maxWidth="lg">
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
              <Typography variant="h4" component="h2" gutterBottom>
                Cities
                <IconButton
                  sx={{
                    ml: '0.5rem',
                    mr: '1rem',
                    backgroundColor: 'rgb(0,0,0,0.3)'
                  }}
                  size='small'
                  color='secondary'
                  onClick={fetchRandomCities}
                >
                  <RefreshIcon />
                </IconButton> 
              </Typography>
              <Grid container spacing={2}>
                {cities.length > 0 ? (
                  cities.map((city) => (
                    <Grid item xs={12} sm={6} key={city.id}>
                      <WeatherCard city={city} />
                    </Grid>
                  ))
                ) : (
                  <Grid item xs={12}>
                    <Typography>No cities found. Try a different search.</Typography>
                  </Grid>
                )}
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <FavoriteCities />
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
              <Grid 
                container
                spacing={2}
                sx={{
                pt: 2,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <Button disabled color="inherit">Developer info: </Button>
                <IconButton
                  sx={{
                    ml: '0.5rem',
                    mr: '1rem',
                    backgroundColor: 'rgb(0,0,0,0.3)'
                  }}
                  onClick={() => window.open('https://www.linkedin.com/in/herbert-ayala37/', '_blank')}
                  aria-label='LinkedIn'
                  size='small'
                  color='secondary'
                >
                  <LinkedInIcon />
                </IconButton>
                <IconButton
                  sx={{
                    mr: '1rem',
                    backgroundColor: 'rgb(0,0,0,0.3)'
                  }}
                  onClick={() => window.open('https://github.com/Herbert37', '_blank')}
                  aria-label='GitHub'
                  size='small'
                  color='secondary'
                >
                  <GitHubIcon />
                </IconButton>
                <IconButton
                  sx={{
                    backgroundColor: 'rgb(0,0,0,0.3)'
                  }}
                  onClick={() => window.open('https://www.instagram.com/herbert37_/', '_blank')}
                  aria-label='Instagram'
                  size='small'
                  color='secondary'
                >
                  <InstagramIcon />
                </IconButton>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Home;