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
          height: { xs: 325, md: 400 },
          width: "100%",
          maxHeight: { xs: 325, md: 400 },
          maxWidth: "100%",
          objectFit: "cover",
        }}
        src='https://res.cloudinary.com/djnj9ykgj/image/upload/v1763855888/main-img_ybmtlx.jpg'
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
