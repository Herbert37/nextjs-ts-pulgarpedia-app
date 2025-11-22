import React from "react";
// Next.js y MUI
import Head from "next/head";
import { useRouter } from "next/router";
import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
// Componentes
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import PlaceCard from "../components/PlaceCard";
import RecommendationsCarousel from "../components/RecommendationsCarousel";
import CategorySection from "../components/CategorySection";
// Hooks
import { useFilteredPlaces } from "../hooks/useFilteredPlaces";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";

const Home: React.FC = () => {
  const router = useRouter();
  const {
    searchQuery,
    selectedCategory,
    filteredPlaces,
    placeCounts,
    isReady,
    setSearchQuery,
    setSelectedCategory,
    resetFilters,
    hasActiveFilters,
    totalResults,
    categories,
  } = useFilteredPlaces();

  // Sincronizar categoría desde URL solo al cargar (una vez)
  React.useEffect(() => {
    const categoryFromUrl = router.query.category as string | undefined;

    if (!isReady || !router.isReady) return;

    // Si hay un query param de categoría
    if (categoryFromUrl) {
      // Validar que la categoría existe
      const categoryExists = categories.some((c) => c.id === categoryFromUrl);

      if (categoryExists) {
        // Categoría válida: establecerla SOLO si aún no se ha establecido
        setSelectedCategory(categoryFromUrl);
      } else if (!categoryExists) {
        // Categoría inválida: remover el query param y redirigir a /
        router.replace("/", undefined, { shallow: true });
      }
    }
    // Solo ejecutar cuando cambie el query param de la URL o cuando se cargue
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.category, router.isReady, isReady]);

  // Función wrapper para cambiar categoría y actualizar URL
  const handleCategoryChange = React.useCallback(
    (categoryId: string) => {
      setSelectedCategory(categoryId);

      // Actualizar URL
      if (categoryId === "all") {
        // Remover query param si es "all"
        router.push("/", undefined, { shallow: true });
      } else {
        // Agregar/actualizar query param
        router.push(`/?category=${categoryId}`, undefined, { shallow: true });
      }
    },
    [setSelectedCategory, router]
  );

  // Función wrapper para resetear filtros y limpiar URL
  const handleResetFilters = React.useCallback(() => {
    resetFilters();
    router.push("/", undefined, { shallow: true });
  }, [resetFilters, router]);

  // Infinite scroll para los resultados
  const { displayedItems, hasMore, isLoadingMore, observerTarget } =
    useInfiniteScroll({
      items: filteredPlaces,
      itemsPerPage: 12,
    });

  // SEO dinámico basado en filtros
  const { title, description, canonical } = React.useMemo(() => {
    if (hasActiveFilters) {
      const categoryName = categories.find(
        (c) => c.id === selectedCategory
      )?.name;
      if (categoryName) {
        return {
          title: `${categoryName} - Lugares turísticos | Pulgarpedia`,
          description: `Explora los mejores lugares de ${categoryName} en El Salvador. Encuentra actividades, destinos y experiencias únicas.`,
          canonical: `https://pulgarpedia.com?category=${selectedCategory}`,
        };
      }
      if (searchQuery) {
        return {
          title: `Resultados: ${searchQuery} | Pulgarpedia`,
          description: `Resultados de búsqueda para "${searchQuery}" en Pulgarpedia - Descubre El Salvador.`,
          canonical: "https://pulgarpedia.com",
        };
      }
    }
    return {
      title: "Pulgarpedia - Descubre los mejores lugares de El Salvador",
      description: `Explora ${totalResults} lugares turísticos en El Salvador. Volcanes, playas paradisíacas, pueblos coloniales, gastronomía típica y festividades únicas.`,
      canonical: "https://pulgarpedia.com",
    };
  }, [
    hasActiveFilters,
    searchQuery,
    selectedCategory,
    categories,
    totalResults,
  ]);

  // Mostrar estado de carga si el contenido no está listo
  if (!isReady) {
    return (
      <>
        <Head>
          <title>Cargando... | Pulgarpedia</title>
        </Head>
        <Header />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "calc(100vh - 200px)",
            gap: 2,
          }}
        >
          <CircularProgress size={60} />
          <Typography variant='body1' color='text.secondary'>
            Cargando lugares chivos...
          </Typography>
        </Box>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta
          name='keywords'
          content='El Salvador, turismo, lugares turísticos, volcanes, playas, gastronomía, festividades, pueblos coloniales, naturaleza, aventura'
        />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, maximum-scale=5'
        />
        <link rel='canonical' href={canonical} />

        {/* Open Graph */}
        <meta property='og:type' content='website' />
        <meta property='og:locale' content='es_SV' />
        <meta property='og:site_name' content='Pulgarpedia' />
        <meta property='og:title' content={title} />
        <meta property='og:description' content={description} />
        <meta property='og:url' content={canonical} />
        <meta
          property='og:image'
          content='https://pulgarpedia.com/og-image.jpg'
        />
        <meta property='og:image:width' content='1200' />
        <meta property='og:image:height' content='630' />
        <meta
          property='og:image:alt'
          content='Pulgarpedia - Descubre El Salvador'
        />

        {/* Twitter */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content={title} />
        <meta name='twitter:description' content={description} />
        <meta
          name='twitter:image'
          content='https://pulgarpedia.com/og-image.jpg'
        />

        {/* Adicionales */}
        <meta name='author' content='Pulgarpedia' />
        <meta
          name='robots'
          content={
            hasActiveFilters && searchQuery
              ? "noindex, follow"
              : "index, follow"
          }
        />
        <meta httpEquiv='Content-Language' content='es' />
      </Head>
      <Header />
      <Container maxWidth='lg' sx={{ mt: 4, mb: 8 }}>
        {/* Carrusel de recomendaciones - filtra por categoría si hay una seleccionada */}
        <RecommendationsCarousel
          categoryId={selectedCategory !== "all" ? selectedCategory : undefined}
        />
        {/* Sección de categorías - Siempre visible */}
        {isReady && (
          <Box
            sx={{
              opacity: 0,
              animation: "fadeIn 0.6s ease-in-out forwards",
              "@keyframes fadeIn": {
                from: { opacity: 0, transform: "translateY(20px)" },
                to: { opacity: 1, transform: "translateY(0)" },
              },
            }}
          >
            <CategorySection
              categories={categories}
              placeCounts={placeCounts}
              onCategoryClick={(categoryId) => {
                handleCategoryChange(categoryId);
                // Scroll suave hacia los resultados
                const element = document.getElementById("results-section");
                if (element) {
                  const offsetTop = element.offsetTop - 80; // 80px de margen
                  window.scrollTo({
                    top: offsetTop,
                    behavior: "smooth",
                  });
                }
              }}
            />
          </Box>
        )}

        {/* Sección de Filtros */}
        <Box sx={{ mb: 4 }} id='results-section'>
          <Grid container spacing={2} alignItems='stretch'>
            {/* Barra de búsqueda */}
            <Grid item xs={12} md={7}>
              <SearchBar
                onSearch={setSearchQuery}
                placeholder='Buscar por nombre, ubicación o descripción...'
                initialValue={searchQuery}
              />
            </Grid>

            {/* Filtro de categorías */}
            <Grid item xs={12} md={5}>
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
                placeCounts={placeCounts}
              />
            </Grid>
          </Grid>

          {/* Información de resultados y botón reset */}
          {(hasActiveFilters || totalResults > 0) && (
            <Box
              sx={{
                mt: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              <Typography variant='body2' color='text.secondary'>
                {totalResults === 0
                  ? "No se encontraron lugares que coincidan con tu búsqueda"
                  : `Mostrando ${displayedItems.length} de ${totalResults} ${
                      totalResults === 1 ? "lugar" : "lugares"
                    }`}
              </Typography>

              {hasActiveFilters && (
                <Button
                  size='small'
                  startIcon={<FilterAltOffIcon />}
                  onClick={handleResetFilters}
                  sx={{ textTransform: "none" }}
                >
                  Limpiar filtros
                </Button>
              )}
            </Box>
          )}
        </Box>

        {/* Grid de Resultados */}
        {!isReady ? (
          // Skeleton loading
          <Grid container spacing={3}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Box sx={{ height: "100%" }}>
                  <PlaceCard place={filteredPlaces[0] || null} loading={true} />
                </Box>
              </Grid>
            ))}
          </Grid>
        ) : filteredPlaces.length === 0 ? (
          // Empty state mejorado
          <Box
            sx={{
              textAlign: "center",
              py: 8,
              px: 2,
              opacity: 0,
              animation: "fadeIn 0.4s ease-in-out forwards",
              "@keyframes fadeIn": {
                from: { opacity: 0, transform: "scale(0.95)" },
                to: { opacity: 1, transform: "scale(1)" },
              },
            }}
          >
            <Box
              sx={{
                fontSize: "4rem",
                mb: 2,
                animation: "bounce 2s ease-in-out infinite",
                "@keyframes bounce": {
                  "0%, 100%": { transform: "translateY(0)" },
                  "50%": { transform: "translateY(-10px)" },
                },
              }}
            >
              {hasActiveFilters ? "🔍" : "📍"}
            </Box>
            <Typography
              variant='h5'
              color='text.secondary'
              gutterBottom
              sx={{ mb: 2, fontWeight: 600 }}
            >
              {hasActiveFilters
                ? "No encontramos lugares con esos criterios"
                : "No hay lugares disponibles"}
            </Typography>
            <Typography
              variant='body1'
              color='text.secondary'
              paragraph
              sx={{ maxWidth: 500, mx: "auto" }}
            >
              {hasActiveFilters
                ? "Intenta con otros términos de búsqueda o explora una categoría diferente"
                : "Vuelve más tarde para descubrir lugares turísticos"}
            </Typography>
            {hasActiveFilters && (
              <Button
                variant='contained'
                onClick={handleResetFilters}
                sx={{
                  mt: 2,
                  transition: "all 0.2s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                  "&:active": {
                    transform: "scale(0.98)",
                  },
                }}
              >
                Ver todos los lugares
              </Button>
            )}
          </Box>
        ) : (
          // Grid de lugares con infinite scroll
          <>
            <Grid
              container
              spacing={3}
              sx={{
                opacity: 0,
                animation: "fadeIn 0.5s ease-in-out forwards",
                "@keyframes fadeIn": {
                  from: { opacity: 0 },
                  to: { opacity: 1 },
                },
              }}
            >
              {displayedItems.map((place, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  key={place.placeId}
                  sx={{
                    opacity: 0,
                    animation: `slideUp 0.4s ease-out forwards ${
                      index * 0.05
                    }s`,
                    "@keyframes slideUp": {
                      from: { opacity: 0, transform: "translateY(20px)" },
                      to: { opacity: 1, transform: "translateY(0)" },
                    },
                  }}
                >
                  <PlaceCard place={place} />
                </Grid>
              ))}
            </Grid>

            {/* Observador para infinite scroll */}
            {hasMore && (
              <Box
                ref={observerTarget}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  py: 4,
                }}
              >
                {isLoadingMore && (
                  <Box sx={{ textAlign: "center" }}>
                    <CircularProgress size={32} />
                    <Typography
                      variant='body2'
                      color='text.secondary'
                      sx={{ mt: 2 }}
                    >
                      Cargando más lugares...
                    </Typography>
                  </Box>
                )}
              </Box>
            )}

            {/* Indicador de fin de resultados */}
            {!hasMore && displayedItems.length > 12 && (
              <Box sx={{ textAlign: "center", py: 4 }}>
                <Typography variant='body2' color='text.secondary'>
                  ✨ Has visto todos los lugares disponibles
                </Typography>
              </Box>
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default Home;
