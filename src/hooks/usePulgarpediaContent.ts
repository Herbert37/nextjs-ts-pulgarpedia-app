import { useMemo } from "react";
import { useContentStore } from "../stores/contentStore";
import {
  getPlaceById,
  getPlacesByCategory,
  getCategoryById,
} from "../utils/contentApi";

/**
 * Hook personalizado para acceder al contenido de Pulgarpedia
 * Proporciona acceso fácil a categorías, lugares y funciones de búsqueda
 */
export const usePulgarpediaContent = () => {
  const { content, isLoading, error } = useContentStore();

  const categories = useMemo(() => content?.categories || [], [content]);
  const places = useMemo(() => content?.places || [], [content]);

  /**
   * Obtiene un lugar por su ID
   */
  const getPlace = (placeId: string) => {
    if (!content) return null;
    return getPlaceById(content, placeId);
  };

  /**
   * Obtiene todos los lugares de una categoría
   */
  const getPlacesInCategory = (categoryId: string) => {
    if (!content) return [];
    return getPlacesByCategory(content, categoryId);
  };

  /**
   * Obtiene una categoría por su ID
   */
  const getCategory = (categoryId: string) => {
    if (!content) return null;
    return getCategoryById(content, categoryId);
  };

  /**
   * Busca lugares por texto (en título o descripción)
   */
  const searchPlaces = (query: string) => {
    if (!content || !query) return [];

    const lowerQuery = query.toLowerCase();
    return places.filter(
      (place) =>
        place.header.title.toLowerCase().includes(lowerQuery) ||
        place.header.subtitle.toLowerCase().includes(lowerQuery) ||
        place.generalHistorySection.description
          .toLowerCase()
          .includes(lowerQuery)
    );
  };

  /**
   * Obtiene estadísticas del contenido
   */
  const getStats = () => {
    return {
      totalCategories: categories.length,
      totalPlaces: places.length,
      placesByCategory: categories.map((cat) => ({
        categoryId: cat.id,
        categoryName: cat.name,
        count: places.filter((p) => p.categoryId === cat.id).length,
      })),
    };
  };

  return {
    // Estado
    content,
    isLoading,
    error,
    isReady: !!content && !isLoading && !error,

    // Datos
    categories,
    places,

    // Funciones de búsqueda
    getPlace,
    getPlacesInCategory,
    getCategory,
    searchPlaces,
    getStats,
  };
};
