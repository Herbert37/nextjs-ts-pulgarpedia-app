import React from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import WcIcon from "@mui/icons-material/Wc";
import AccessibleIcon from "@mui/icons-material/Accessible";
import PersonIcon from "@mui/icons-material/Person";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import type { Place } from "../types/place";

interface PlaceContentProps {
  place: Place;
}

/**
 * Componente que muestra todas las secciones de contenido de un lugar
 * - Historia y cultura
 * - Cómo llegar
 * - Costos
 * - Servicios/Instalaciones
 * - Horarios y mejor temporada
 */
const PlaceContent: React.FC<PlaceContentProps> = ({ place }) => {
  const { generalHistorySection, serviceLogisticSection } = place;

  return (
    <Box sx={{ mb: 6 }}>
      {/* Sección: Historia y Cultura */}
      <Paper
        elevation={2}
        sx={{
          p: { xs: 2, sm: 3, md: 4 },
          mb: 4,
          borderRadius: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <HistoryIcon sx={{ fontSize: 32, color: "primary.main", mr: 2 }} />
          <Typography variant='h5' component='h2' fontWeight={600}>
            {generalHistorySection.title}
          </Typography>
        </Box>

        <Typography
          variant='body1'
          paragraph
          sx={{
            color: "text.primary",
            lineHeight: 1.8,
            mb: 3,
          }}
        >
          {generalHistorySection.description}
        </Typography>

        {generalHistorySection.historyCulture && (
          <>
            <Divider sx={{ my: 3 }} />
            <Typography
              variant='h6'
              gutterBottom
              fontWeight={600}
              color='text.secondary'
            >
              Historia y Cultura
            </Typography>
            <Typography
              variant='body1'
              paragraph
              sx={{
                color: "text.primary",
                lineHeight: 1.8,
              }}
            >
              {generalHistorySection.historyCulture}
            </Typography>
          </>
        )}

        {/* Ubicación y Clima */}
        <Divider sx={{ my: 3 }} />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
              <LocationOnIcon sx={{ color: "primary.main", mr: 1, mt: 0.5 }} />
              <Box>
                <Typography variant='subtitle2' fontWeight={600} gutterBottom>
                  Ubicación
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {generalHistorySection.locationClimate.address}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
              <WbSunnyIcon sx={{ color: "warning.main", mr: 1, mt: 0.5 }} />
              <Box>
                <Typography variant='subtitle2' fontWeight={600} gutterBottom>
                  Mejor temporada
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {generalHistorySection.locationClimate.bestSeason}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", alignItems: "flex-start" }}>
              <AccessTimeIcon sx={{ color: "info.main", mr: 1, mt: 0.5 }} />
              <Box>
                <Typography variant='subtitle2' fontWeight={600} gutterBottom>
                  Horarios típicos
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {generalHistorySection.locationClimate.typicalHours}
                </Typography>
              </Box>
            </Box>
          </Grid>

          {generalHistorySection.locationClimate.mapUrl && (
            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                <LocationOnIcon sx={{ color: "error.main", mr: 1, mt: 0.5 }} />
                <Box>
                  <Typography variant='subtitle2' fontWeight={600} gutterBottom>
                    Ver en el mapa
                  </Typography>
                  <Typography
                    component='a'
                    href={generalHistorySection.locationClimate.mapUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    variant='body2'
                    sx={{
                      color: "primary.main",
                      textDecoration: "none",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Abrir en Google Maps
                  </Typography>
                </Box>
              </Box>
            </Grid>
          )}
        </Grid>
      </Paper>

      {/* Sección: Cómo llegar */}
      {serviceLogisticSection.howToGetThere &&
        serviceLogisticSection.howToGetThere.length > 0 && (
          <Paper
            elevation={2}
            sx={{
              p: { xs: 2, sm: 3, md: 4 },
              mb: 4,
              borderRadius: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <DirectionsCarIcon
                sx={{ fontSize: 32, color: "primary.main", mr: 2 }}
              />
              <Typography variant='h5' component='h2' fontWeight={600}>
                ¿Cómo llegar?
              </Typography>
            </Box>

            <Typography
              variant='body1'
              paragraph
              sx={{
                color: "text.secondary",
                mb: 3,
              }}
            >
              {serviceLogisticSection.description}
            </Typography>

            <List>
              {serviceLogisticSection.howToGetThere.map((transport, index) => (
                <ListItem
                  key={index}
                  alignItems='flex-start'
                  sx={{
                    bgcolor: "action.hover",
                    borderRadius: 1,
                    mb: 2,
                    flexDirection: { xs: "column", sm: "row" },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: { xs: "100%", sm: 56 } }}>
                    <Chip
                      label={transport.option}
                      color='primary'
                      size='small'
                      sx={{ fontWeight: 600 }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={transport.details}
                    sx={{
                      mt: { xs: 1 },
                      ml: { sm: 2 },
                      "& .MuiListItemText-primary": {
                        color: "text.primary",
                        lineHeight: 1.6,
                      },
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        )}

      {/* Sección: Costos */}
      {serviceLogisticSection.costs &&
        serviceLogisticSection.costs.length > 0 && (
          <Paper
            elevation={2}
            sx={{
              p: { xs: 2, sm: 3, md: 4 },
              mb: 4,
              borderRadius: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <AttachMoneyIcon
                sx={{ fontSize: 32, color: "success.main", mr: 2 }}
              />
              <Typography variant='h5' component='h2' fontWeight={600}>
                Costos y tarifas
              </Typography>
            </Box>

            <Grid container spacing={2}>
              {serviceLogisticSection.costs.map((cost, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      p: 2,
                      bgcolor: "action.hover",
                      borderRadius: 1,
                      border: 1,
                      borderColor: "divider",
                    }}
                  >
                    <Typography variant='body1' fontWeight={500}>
                      {cost.item}
                    </Typography>
                    <Chip
                      label={cost.price}
                      color='success'
                      size='small'
                      sx={{ fontWeight: 600 }}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>
        )}

      {/* Sección: Servicios e Instalaciones */}
      <Paper
        elevation={2}
        sx={{
          p: { xs: 2, sm: 3, md: 4 },
          mb: 4,
          borderRadius: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <CheckCircleIcon
            sx={{ fontSize: 32, color: "primary.main", mr: 2 }}
          />
          <Typography variant='h5' component='h2' fontWeight={600}>
            Servicios e instalaciones
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* Estacionamiento */}
          <Grid item xs={12} sm={6} md={3}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                p: 2,
                borderRadius: 1,
                border: 1.5,
                bgcolor: "action.hover",
                borderColor: serviceLogisticSection.facilities.parking
                  ? "success.main"
                  : "divider",
              }}
            >
              {serviceLogisticSection.facilities.parking ? (
                <CheckCircleIcon sx={{ fontSize: 40, color: "success.main" }} />
              ) : (
                <CancelIcon sx={{ fontSize: 40, color: "action.disabled" }} />
              )}
              <Typography
                variant='body2'
                align='center'
                sx={{ mt: 1, fontWeight: 500 }}
              >
                <LocalParkingIcon
                  sx={{ fontSize: 16, mr: 0.5, verticalAlign: "middle" }}
                />
                Estacionamiento
              </Typography>
            </Box>
          </Grid>

          {/* Baños */}
          <Grid item xs={12} sm={6} md={3}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                p: 2,
                borderRadius: 1,
                border: 1.5,
                bgcolor: "action.hover",
                borderColor: serviceLogisticSection.facilities.restrooms
                  ? "success.main"
                  : "divider",
              }}
            >
              {serviceLogisticSection.facilities.restrooms ? (
                <CheckCircleIcon sx={{ fontSize: 40, color: "success.main" }} />
              ) : (
                <CancelIcon sx={{ fontSize: 40, color: "action.disabled" }} />
              )}
              <Typography
                variant='body2'
                align='center'
                sx={{ mt: 1, fontWeight: 500 }}
              >
                <WcIcon
                  sx={{ fontSize: 16, mr: 0.5, verticalAlign: "middle" }}
                />
                Baños
              </Typography>
            </Box>
          </Grid>

          {/* Acceso para sillas de ruedas */}
          <Grid item xs={12} sm={6} md={3}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                p: 2,
                borderRadius: 1,
                border: 1.5,
                bgcolor: "action.hover",
                borderColor: serviceLogisticSection.facilities.wheelchairAccess
                  ? "success.main"
                  : "divider",
              }}
            >
              {serviceLogisticSection.facilities.wheelchairAccess ? (
                <CheckCircleIcon sx={{ fontSize: 40, color: "success.main" }} />
              ) : (
                <CancelIcon sx={{ fontSize: 40, color: "action.disabled" }} />
              )}
              <Typography
                variant='body2'
                align='center'
                sx={{ mt: 1, fontWeight: 500 }}
              >
                <AccessibleIcon
                  sx={{ fontSize: 16, mr: 0.5, verticalAlign: "middle" }}
                />
                Accesible
              </Typography>
            </Box>
          </Grid>

          {/* Guías locales */}
          <Grid item xs={12} sm={6} md={3}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                p: 2,
                borderRadius: 1,
                border: 1.5,
                bgcolor: "action.hover",
                borderColor: serviceLogisticSection.facilities.localGuides
                  ? "success.main"
                  : "divider",
              }}
            >
              {serviceLogisticSection.facilities.localGuides ? (
                <CheckCircleIcon sx={{ fontSize: 40, color: "success.main" }} />
              ) : (
                <CancelIcon sx={{ fontSize: 40, color: "action.disabled" }} />
              )}
              <Typography
                variant='body2'
                align='center'
                sx={{ mt: 1, fontWeight: 500 }}
              >
                <PersonIcon
                  sx={{ fontSize: 16, mr: 0.5, verticalAlign: "middle" }}
                />
                Guías
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Notas adicionales */}
        {serviceLogisticSection.facilities.notes && (
          <Box
            sx={{
              mt: 3,
              p: 2,
              bgcolor: "primary.dark",
              borderRadius: 1,
              border: 1,
              borderColor: "primary.dark",
            }}
          >
            <Typography variant='body2' color='white'>
              <strong>
                Nota importante: {serviceLogisticSection.facilities.notes}
              </strong>
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default PlaceContent;
