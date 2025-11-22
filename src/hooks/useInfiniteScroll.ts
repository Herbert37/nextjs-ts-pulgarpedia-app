import { useState, useEffect, useCallback, useRef } from "react";
import type { Place } from "../types/place";

interface UseInfiniteScrollProps {
  items: Place[];
  itemsPerPage?: number;
}

interface UseInfiniteScrollReturn {
  displayedItems: Place[];
  hasMore: boolean;
  isLoadingMore: boolean;
  loadMore: () => void;
  reset: () => void;
  observerTarget: React.RefObject<HTMLDivElement | null>;
}

/**
 * Hook para implementar infinite scroll en una lista de items
 * Usa Intersection Observer para detectar cuando el usuario llega al final
 */
export const useInfiniteScroll = ({
  items,
  itemsPerPage = 12,
}: UseInfiniteScrollProps): UseInfiniteScrollReturn => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);

  // Calcular items a mostrar basado en la página actual
  const displayedItems = items.slice(0, currentPage * itemsPerPage);
  const hasMore = displayedItems.length < items.length;

  // Resetear cuando cambian los items (ej: nueva búsqueda)
  useEffect(() => {
    setCurrentPage(1);
  }, [items]);

  // Función para cargar más items
  const loadMore = useCallback(() => {
    if (!hasMore || isLoadingMore) return;

    setIsLoadingMore(true);
    // Simular delay de carga para UX
    setTimeout(() => {
      setCurrentPage((prev) => prev + 1);
      setIsLoadingMore(false);
    }, 300);
  }, [hasMore, isLoadingMore]);

  // Intersection Observer para detectar cuando el usuario llega al final
  useEffect(() => {
    const target = observerTarget.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
          loadMore();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "100px",
      }
    );

    observer.observe(target);

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [hasMore, isLoadingMore, loadMore]);

  // Función para resetear a página 1
  const reset = useCallback(() => {
    setCurrentPage(1);
  }, []);

  return {
    displayedItems,
    hasMore,
    isLoadingMore,
    loadMore,
    reset,
    observerTarget,
  };
};
