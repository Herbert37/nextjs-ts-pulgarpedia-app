import React, { useState, useCallback } from "react";
import { Box, Container, Grid, TextField, Typography } from "@mui/material";
import { debounce } from "lodash";

interface HeaderProps {
  onSearch: (query: string) => void;
}

const Header = ({ onSearch }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      onSearch(query);
    }, 300),
    [onSearch]
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  return (
    <Box
      sx={{
        position: "relative",
        lineHeight: "0rem",
        marginTop: "-4rem",
      }}
    >
      <Box
        component='img'
        sx={{
          height: { xs: 373, md: 400 },
          width: "100%",
          maxHeight: { xs: 373, md: 400 },
          maxWidth: "100%",
          objectFit: "cover",
        }}
        src='https://d296xu67oj0g2g.cloudfront.net/lm_cms/images/CMS/OVERVIEW%20BANNERS/1024/CLUB_HB1.png'
      />
      {/* Overlay layer */}
      <div className={"headerContainer"}>
        <Container maxWidth='lg'>
          <Grid
            container
            sx={{
              paddingBottom: "2rem",
            }}
          >
            <Grid item xs={12}>
              <Typography
                variant='h2'
                color={"text.primary"}
                gutterBottom
                sx={{
                  fontSize: {
                    xs: "2rem",
                    sm: "4rem",
                  },
                }}
              >
                Pulgarpedia
              </Typography>
            </Grid>
            {/* Form */}
            <Grid item xs={12}>
              <br></br>
              <TextField
                sx={{
                  backgroundColor: "rgb(0,0,0,0.6)",
                }}
                fullWidth
                id='filled-multiline-static'
                label='Type a city'
                size='small'
                type='text'
                variant='filled'
                color='secondary'
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </Grid>
          </Grid>
        </Container>
      </div>
    </Box>
  );
};

export default Header;
