import { useEffect, useState } from "react";
import { AppBar, Container, Toolbar, Typography } from "@mui/material";

export default function Menu() {
  const [scrollY, setScrollY] = useState<number>(0); // Explicitly

  const appBarStyle: React.CSSProperties = {
    backgroundColor:
      scrollY > 500 ? "rgba(108,98,164)" : "rgba(108,98,164, 0.5)",
    transition: "background-color 0.3s ease-in-out",
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return scrollY > 200 ? (
    <AppBar sx={appBarStyle} position='sticky'>
      <Toolbar>
        <Container maxWidth='lg' sx={{ padding: "0rem !important" }}>
          <Typography
            variant='h2'
            color={"text.primary"}
            sx={{
              fontSize: {
                xs: "1.5rem",
                sm: "1.5rem",
              },
              color: "white",
            }}
          >
            🇸🇻 Pulgarpedia
          </Typography>
        </Container>
      </Toolbar>
    </AppBar>
  ) : null;
}
