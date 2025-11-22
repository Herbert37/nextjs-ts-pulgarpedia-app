import axios from "axios";
import { PulgarpediaContent } from "../types/content";

const CONTENT_API_URL =
  "https://private-d21258-herbertayala.apiary-mock.com/pulgarpedia-content";

/**
 * Obtiene el contenido completo de Pulgarpedia desde el API
 * Incluye todas las categorías y lugares turísticos
 */
export const fetchPulgarpediaContent =
  async (): Promise<PulgarpediaContent> => {
    try {
      const response = await axios.get<PulgarpediaContent>(CONTENT_API_URL, {
        timeout: 10000, // 10 segundos timeout
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Validar que la respuesta tenga la estructura esperada
      if (
        !response.data ||
        !response.data.categories ||
        !response.data.places
      ) {
        throw new Error("Estructura de datos inválida");
      }

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.code === "ECONNABORTED") {
          throw new Error("Tiempo de espera agotado al cargar el contenido");
        }
        if (error.response) {
          throw new Error(`Error del servidor: ${error.response.status}`);
        }
        if (error.request) {
          throw new Error("No se pudo conectar con el servidor");
        }
      }
      throw new Error("Error al cargar el contenido de Pulgarpedia");
    }
  };

/**
 * Obtiene un lugar específico por su ID
 */
export const getPlaceById = (content: PulgarpediaContent, placeId: string) => {
  return content.places.find((place) => place.placeId === placeId);
};

/**
 * Obtiene todos los lugares de una categoría específica
 */
export const getPlacesByCategory = (
  content: PulgarpediaContent,
  categoryId: string
) => {
  return content.places.filter((place) => place.categoryId === categoryId);
};

/**
 * Obtiene una categoría por su ID
 */
export const getCategoryById = (
  content: PulgarpediaContent,
  categoryId: string
) => {
  return content.categories.find((category) => category.id === categoryId);
};
