// Tipos para el contenido unificado de Pulgarpedia

import { CategoryInfo, Place } from "./place";

export interface PulgarpediaContent {
  categories: CategoryInfo[];
  places: Place[];
}

export interface ContentState {
  content: PulgarpediaContent | null;
  isLoading: boolean;
  error: string | null;
  loadContent: () => Promise<void>;
  retryLoad: () => Promise<void>;
}
