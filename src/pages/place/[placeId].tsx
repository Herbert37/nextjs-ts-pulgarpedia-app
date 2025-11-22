import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";
import { Container, Box, CircularProgress } from "@mui/material";
import PlaceHero from "../../components/PlaceHero";
import PlaceGallery from "../../components/PlaceGallery";
import PlaceContent from "../../components/PlaceContent";
import PremiumSection from "../../components/PremiumSection";
import RelatedPlaces from "../../components/RelatedPlaces";
import ErrorModal from "../../components/ErrorModal";
import { usePulgarpediaContent } from "../../hooks/usePulgarpediaContent";

interface PlaceDetailPageProps {
  placeId: string;
}

/**
 * Página de detalle de un lugar turístico
 * Ruta dinámica: /place/[placeId]
 */
const PlaceDetailPage: React.FC<PlaceDetailPageProps> = ({ placeId }) => {
  const router = useRouter();
  const { getPlace, getCategory, isLoading, isReady } = usePulgarpediaContent();
  const [showError, setShowError] = React.useState(false);

  // Obtener los datos del lugar
  const place = React.useMemo(() => {
    if (!isReady) return null;
    return getPlace(placeId);
  }, [isReady, placeId, getPlace]);

  // Obtener el nombre de la categoría
  const categoryName = React.useMemo(() => {
    if (!place) return "";
    const category = getCategory(place.categoryId);
    return category?.name || place.header.category;
  }, [place, getCategory]);

  // Validar si el lugar existe
  React.useEffect(() => {
    if (isReady && !place) {
      setShowError(true);
    }
  }, [isReady, place]);

  // Loading state
  if (isLoading || !isReady) {
    return (
      <>
        <Container maxWidth='lg' sx={{ mt: 4, mb: 8 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "60vh",
            }}
          >
            <CircularProgress size={48} />
          </Box>
        </Container>
      </>
    );
  }

  // Error state - lugar no encontrado
  if (showError || !place) {
    return (
      <>
        <Head>
          <title>Lugar no encontrado | Pulgarpedia</title>
          <meta name='robots' content='noindex, follow' />
        </Head>
        <ErrorModal
          open={true}
          message='El lugar que buscas no existe o ha sido removido'
          onRetry={() => {
            setShowError(false);
            router.push("/");
          }}
        />
      </>
    );
  }

  // SEO dinámico
  const pageTitle = `${place.header.title} - ${place.header.category} | Pulgarpedia`;
  const pageDescription = place.generalHistorySection.description.slice(0, 160);
  const pageImage = place.header.mainImageURL.startsWith("http")
    ? place.header.mainImageURL
    : `https://pulgarpedia.com${place.header.mainImageURL}`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name='description' content={pageDescription} />
        <link
          rel='canonical'
          href={`https://pulgarpedia.com/place/${placeId}`}
        />

        {/* Open Graph */}
        <meta property='og:type' content='article' />
        <meta property='og:title' content={pageTitle} />
        <meta property='og:description' content={pageDescription} />
        <meta
          property='og:url'
          content={`https://pulgarpedia.com/place/${placeId}`}
        />
        <meta property='og:image' content={pageImage} />
        <meta property='og:image:width' content='1200' />
        <meta property='og:image:height' content='630' />
        <meta property='og:image:alt' content={place.header.title} />

        {/* Twitter */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content={pageTitle} />
        <meta name='twitter:description' content={pageDescription} />
        <meta name='twitter:image' content={pageImage} />
      </Head>

      {/* Hero Section con imagen, título, breadcrumbs */}
      <PlaceHero place={place} categoryName={categoryName} />

      {/* Contenido del lugar */}
      <Container maxWidth='lg' sx={{ mb: 8 }}>
        {/* Galería de imágenes */}
        <PlaceGallery images={place.gallery} placeName={place.header.title} />

        {/* Secciones de contenido: Historia, Cómo llegar, Costos, Servicios */}
        <PlaceContent place={place} />

        {/* Sección Premium - Contenido exclusivo bloqueado */}
        <PremiumSection premiumData={place.premiumSection} />

        {/* Lugares relacionados - misma categoría */}
        <RelatedPlaces
          currentPlaceId={place.placeId}
          categoryId={place.categoryId}
          maxPlaces={4}
        />
      </Container>
    </>
  );
};

/**
 * getStaticPaths - Define las rutas a pre-renderizar
 * Genera paths para todos los lugares en build time
 */
export const getStaticPaths: GetStaticPaths = async () => {
  try {
    // Importar el contenido directamente
    const contentData = await import("../../data/content.json");
    const places = contentData.default.places || contentData.places;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const paths = places.map((place: any) => ({
      params: { placeId: place.placeId },
    }));

    return {
      paths,
      fallback: false, // 404 para rutas no definidas
    };
  } catch (error) {
    console.error("Error generating static paths:", error);
    return {
      paths: [],
      fallback: false,
    };
  }
};

/**
 * getStaticProps - Obtiene los datos en build time
 * Valida que el placeId existe
 */
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const placeId = params?.placeId as string;

  if (!placeId) {
    return {
      notFound: true,
    };
  }

  // Validar que el lugar existe
  try {
    const contentData = await import("../../data/content.json");
    const places = contentData.default.places || contentData.places;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const placeExists = places.some((p: any) => p.placeId === placeId);

    if (!placeExists) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        placeId,
      },
      revalidate: 3600, // Revalidar cada hora
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error);
    return {
      notFound: true,
    };
  }
};

export default PlaceDetailPage;
