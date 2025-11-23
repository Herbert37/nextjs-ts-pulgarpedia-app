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
import { useContentStore } from "../../stores/contentStore";

interface PlaceDetailPageProps {
  placeId: string;
}

/**
 * Página de detalle de un lugar turístico
 * Ruta dinámica: /place/[placeId]
 */
const PlaceDetailPage: React.FC<PlaceDetailPageProps> = ({ placeId }) => {
  const router = useRouter();
  const { content, isLoading } = useContentStore();
  const [showError, setShowError] = React.useState(false);

  // Obtener los datos del lugar desde el store
  const place = React.useMemo(() => {
    if (!content) return null;
    return content.places.find((p) => p.placeId === placeId);
  }, [content, placeId]);

  // Obtener el nombre de la categoría
  const categoryName = React.useMemo(() => {
    if (!place || !content) return "";
    const category = content.categories.find((c) => c.id === place.categoryId);
    return category?.name || place.header.category;
  }, [place, content]);

  // Validar si el lugar existe
  React.useEffect(() => {
    if (content && !place) {
      setShowError(true);
    }
  }, [content, place]);

  // Loading state - el store ya maneja el loading en _app.tsx
  if (isLoading || !content) {
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

        {/* Geo tags */}
        <meta name='geo.region' content='SV' />
        <meta
          name='geo.placename'
          content={place.generalHistorySection.locationClimate.address}
        />
        {place.generalHistorySection.locationClimate.coordinates && (
          <>
            <meta
              name='geo.position'
              content={`${place.generalHistorySection.locationClimate.coordinates.latitude};${place.generalHistorySection.locationClimate.coordinates.longitude}`}
            />
            <meta
              name='ICBM'
              content={`${place.generalHistorySection.locationClimate.coordinates.latitude}, ${place.generalHistorySection.locationClimate.coordinates.longitude}`}
            />
          </>
        )}

        {/* JSON-LD Schema - TouristAttraction */}
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TouristAttraction",
              name: place.header.title,
              description: place.generalHistorySection.description,
              image: [
                place.header.mainImageURL,
                ...place.gallery.map((g) => g.imageUrl),
              ],
              url: `https://pulgarpedia.com/place/${placeId}`,
              address: {
                "@type": "PostalAddress",
                addressLocality:
                  place.generalHistorySection.locationClimate.address,
                addressCountry: "SV",
                addressRegion: "El Salvador",
              },
              ...(place.generalHistorySection.locationClimate.coordinates && {
                geo: {
                  "@type": "GeoCoordinates",
                  latitude:
                    place.generalHistorySection.locationClimate.coordinates
                      .latitude,
                  longitude:
                    place.generalHistorySection.locationClimate.coordinates
                      .longitude,
                },
              }),
              touristType: categoryName,
              ...(place.generalHistorySection.locationClimate.typicalHours && {
                openingHours:
                  place.generalHistorySection.locationClimate.typicalHours,
              }),
              ...(place.serviceLogisticSection.costs?.length > 0 && {
                priceRange: place.serviceLogisticSection.costs
                  .map((c) => c.price)
                  .join(" - "),
              }),
            }),
          }}
        />

        {/* JSON-LD Schema - BreadcrumbList */}
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Inicio",
                  item: "https://pulgarpedia.com",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: categoryName,
                  item: `https://pulgarpedia.com?category=${place.categoryId}`,
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: place.header.title,
                  item: `https://pulgarpedia.com/place/${placeId}`,
                },
              ],
            }),
          }}
        />
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
    // Obtener el contenido desde el endpoint de la API
    const { fetchPulgarpediaContent } = await import("../../utils/contentApi");
    const contentData = await fetchPulgarpediaContent();

    const paths = contentData.places.map((place) => ({
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
 * getStaticProps - Pasa el placeId como prop
 * La validación se hace en el cliente usando el store
 */
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const placeId = params?.placeId as string;

  if (!placeId) {
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
};

export default PlaceDetailPage;
