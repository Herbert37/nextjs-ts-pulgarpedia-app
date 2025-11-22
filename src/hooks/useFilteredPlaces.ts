import { useMemo, useState } from "react";
import { usePulgarpediaContent } from "./usePulgarpediaContent";

/**
 * Normaliza texto removiendo tildes y caracteres especiales
 * para búsqueda más flexible
 */
const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .normalize("NFD") // Descompone caracteres con tildes
    .replace(/[\u0300-\u036f]/g, "") // Remueve los diacríticos (tildes)
    .trim();
};

/**
 * Hook personalizado para filtrar lugares turísticos
 *
 * Combina búsqueda por texto con filtro de categoría.
 * Optimizado con useMemo para evitar recalcular filtros innecesariamente.
 *
 * @returns {object} Estado y funciones para manejar filtros
 */
export const useFilteredPlaces = () => {
  const { places, categories, isReady } = usePulgarpediaContent();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  /**
   * Lugares filtrados según búsqueda y categoría
   */
  const filteredPlaces = useMemo(() => {
    if (!places || places.length === 0) return [];

    let result = places;

    // Filtrar por categoría
    if (selectedCategory !== "all") {
      result = result.filter((place) => place.categoryId === selectedCategory);
    }

    // Filtrar por búsqueda (nombre, subtítulo, descripción, ubicación)
    // Normaliza texto para ignorar tildes y mayúsculas
    if (searchQuery.trim()) {
      const normalizedQuery = normalizeText(searchQuery);
      result = result.filter((place) => {
        const titleMatch = normalizeText(place.header.title).includes(
          normalizedQuery
        );
        const subtitleMatch = normalizeText(place.header.subtitle).includes(
          normalizedQuery
        );
        const descriptionMatch = normalizeText(
          place.generalHistorySection.description
        ).includes(normalizedQuery);
        const locationMatch = normalizeText(
          place.generalHistorySection.locationClimate.address
        ).includes(normalizedQuery);

        return titleMatch || subtitleMatch || descriptionMatch || locationMatch;
      });
    }

    return result;
  }, [places, searchQuery, selectedCategory]);

  /**
   * Contador de lugares por categoría
   */
  const placeCounts = useMemo(() => {
    if (!places || !categories) return {};

    const counts: Record<string, number> = {};
    categories.forEach((category) => {
      counts[category.id] = places.filter(
        (place) => place.categoryId === category.id
      ).length;
    });

    return counts;
  }, [places, categories]);

  /**
   * Resetear todos los filtros
   */
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
  };

  /**
   * Verificar si hay filtros activos
   */
  const hasActiveFilters =
    searchQuery.trim() !== "" || selectedCategory !== "all";

  return {
    // Estado
    searchQuery,
    selectedCategory,
    filteredPlaces,
    placeCounts,
    isReady,

    // Acciones
    setSearchQuery,
    setSelectedCategory,
    resetFilters,

    // Información
    hasActiveFilters,
    totalResults: filteredPlaces.length,
    totalPlaces: places?.length || 0,
    categories: categories || [],
  };
};
