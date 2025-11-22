import React from "react";
import {
  FormControl,
  Select,
  MenuItem,
  Box,
  Typography,
  SelectChangeEvent,
} from "@mui/material";
import { CategoryInfo } from "../types/place";
import { categoryColors } from "../styles/theme";

interface CategoryFilterProps {
  categories: CategoryInfo[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
  placeCounts?: Record<string, number>;
}

/**
 * Componente CategoryFilter
 *
 * Dropdown para filtrar lugares por categoría.
 * Muestra las 5 categorías con sus iconos y contador de lugares.
 *
 * @param categories - Array de categorías disponibles
 * @param selectedCategory - ID de la categoría seleccionada ('all' para todas)
 * @param onCategoryChange - Callback cuando cambia la categoría seleccionada
 * @param placeCounts - Objeto con contadores de lugares por categoría
 */
const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  placeCounts = {},
}) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    onCategoryChange(event.target.value);
  };

  return (
    <FormControl fullWidth size='medium'>
      <Select
        value={selectedCategory}
        onChange={handleChange}
        displayEmpty
        renderValue={(selected) => {
          if (selected === "all") {
            return (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography variant='body1' sx={{ fontWeight: 500 }}>
                  🗺️ Todas las categorías
                </Typography>
              </Box>
            );
          }

          const category = categories.find((cat) => cat.id === selected);
          if (!category) return "Seleccionar categoría";

          return (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography component='span'>{category.icon}</Typography>
              <Typography variant='body1' sx={{ fontWeight: 500 }}>
                {category.name}
              </Typography>
            </Box>
          );
        }}
        sx={{
          backgroundColor: "background.paper",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "divider",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "primary.main",
          },
        }}
        inputProps={{
          "aria-label": "filtrar por categoría",
        }}
      >
        {/* Opción: Todas las categorías */}
        <MenuItem value='all'>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              width: "100%",
            }}
          >
            <Typography component='span' sx={{ fontSize: "1.5rem" }}>
              🗺️
            </Typography>
            <Box sx={{ flex: 1 }}>
              <Typography variant='body1' sx={{ fontWeight: 500 }}>
                Todas las categorías
              </Typography>
              <Typography variant='caption' color='text.secondary'>
                Ver todos los lugares
              </Typography>
            </Box>
          </Box>
        </MenuItem>

        {/* Opciones de categorías */}
        {categories.map((category) => {
          const count = placeCounts[category.id] || 0;
          const color =
            categoryColors[category.id as keyof typeof categoryColors];

          return (
            <MenuItem key={category.id} value={category.id}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  width: "100%",
                }}
              >
                <Typography
                  component='span'
                  sx={{
                    fontSize: "1.5rem",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {category.icon}
                </Typography>
                <Box sx={{ flex: 1 }}>
                  <Typography variant='body1' sx={{ fontWeight: 500 }}>
                    {category.name}
                  </Typography>
                  <Typography variant='caption' color='text.secondary'>
                    {category.description}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    backgroundColor: color,
                    color: "white",
                    borderRadius: "12px",
                    px: 1.5,
                    py: 0.5,
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    minWidth: "40px",
                    textAlign: "center",
                  }}
                >
                  {count}
                </Box>
              </Box>
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default CategoryFilter;
