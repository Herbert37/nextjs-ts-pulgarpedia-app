import { create } from "zustand";
import { ContentState } from "../types/content";
import { fetchPulgarpediaContent } from "../utils/contentApi";

export const useContentStore = create<ContentState>((set) => ({
  content: null,
  isLoading: false,
  error: null,

  loadContent: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await fetchPulgarpediaContent();
      set({ content: data, isLoading: false, error: null });
    } catch (error) {
      console.error("Error loading Pulgarpedia content:", error);
      set({
        content: null,
        isLoading: false,
        error: "Error al cargar la información de la enciclopedia",
      });
    }
  },

  retryLoad: async () => {
    const { loadContent } = useContentStore.getState();
    await loadContent();
  },
}));
