import React, { useState, useEffect } from "react";
import { TextField, InputAdornment, IconButton, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  debounceMs?: number;
  initialValue?: string;
}

/**
 * Componente SearchBar
 *
 * Input de búsqueda con debounce automático para optimizar performance.
 * Filtra lugares por nombre con coincidencias parciales.
 *
 * @param onSearch - Callback que se ejecuta cuando cambia el texto de búsqueda
 * @param placeholder - Texto placeholder del input
 * @param debounceMs - Tiempo de debounce en milisegundos (default: 300ms)
 * @param initialValue - Valor inicial del input
 */
const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "Buscar lugares turísticos...",
  debounceMs = 300,
  initialValue = "",
}) => {
  const [searchValue, setSearchValue] = useState(initialValue);

  // Debounce del input
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchValue);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [searchValue, debounceMs, onSearch]);

  const handleClear = () => {
    setSearchValue("");
  };

  return (
    <Box sx={{ width: "100%" }}>
      <TextField
        fullWidth
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder={placeholder}
        variant='outlined'
        size='medium'
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon sx={{ color: "text.secondary" }} />
            </InputAdornment>
          ),
          endAdornment: searchValue && (
            <InputAdornment position='end'>
              <IconButton
                aria-label='limpiar búsqueda'
                onClick={handleClear}
                edge='end'
                size='small'
              >
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            backgroundColor: "background.paper",
            "&:hover": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "primary.main",
              },
            },
          },
        }}
        inputProps={{
          "aria-label": "buscar lugares turísticos",
        }}
      />
    </Box>
  );
};

export default SearchBar;
