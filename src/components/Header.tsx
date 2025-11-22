import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";

const Header = () => {
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
                  color: "white",
                }}
              >
                🇸🇻 Pulgarpedia
              </Typography>
            </Grid>
            {/* Form */}
            <Grid item xs={12}>
              <br></br>
              <Typography
                variant='h2'
                color={"text.primary"}
                gutterBottom
                sx={{
                  fontSize: {
                    xs: "1rem",
                    sm: "2rem",
                  },
                  color: "white",
                }}
              >
                Enciclopedia Turística de El Salvador
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </div>
    </Box>
  );
};

export default Header;
