import { Place, CategoryInfo } from "../types/place";

/**
 * Utilidades para generar Schema.org JSON-LD markup
 * Mejora SEO y habilita rich snippets en Google
 */

const SITE_URL = "https://pulgarpedia.com";
const SITE_NAME = "Pulgarpedia";

/**
 * Schema para la organización (Pulgarpedia)
 */
export const getOrganizationSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description:
      "Descubre los mejores lugares turísticos de El Salvador. Guía completa de volcanes, playas, pueblos, gastronomía y festividades.",
    sameAs: [
      "https://facebook.com/pulgarpedia",
      "https://twitter.com/pulgarpedia",
      "https://instagram.com/pulgarpedia",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      availableLanguage: "Spanish",
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "SV",
      addressRegion: "El Salvador",
    },
  };
};

/**
 * Schema para el sitio web con búsqueda
 */
export const getWebsiteSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "Guía turística completa de El Salvador con información detallada de lugares, actividades y experiencias.",
    inLanguage: "es-SV",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
};

/**
 * Schema para breadcrumbs (migas de pan)
 */
export const getBreadcrumbSchema = (
  items: Array<{ name: string; url: string }>
) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
};

/**
 * Schema para atracción turística (lugar individual)
 */
export const getTouristAttractionSchema = (
  place: Place,
  categoryName: string
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: place.header.title,
    description: place.generalHistorySection.description,
    image: [place.header.mainImageURL, ...place.gallery.map((g) => g.imageUrl)],
    url: `${SITE_URL}/place/${place.placeId}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: place.generalHistorySection.locationClimate.address,
      addressCountry: "SV",
      addressRegion: "El Salvador",
    },
    geo: place.generalHistorySection.locationClimate.coordinates
      ? {
          "@type": "GeoCoordinates",
          latitude:
            place.generalHistorySection.locationClimate.coordinates.latitude,
          longitude:
            place.generalHistorySection.locationClimate.coordinates.longitude,
        }
      : undefined,
    touristType: categoryName,
  };

  // Agregar horarios si están disponibles
  if (place.generalHistorySection.locationClimate.typicalHours) {
    schema.openingHours =
      place.generalHistorySection.locationClimate.typicalHours;
  }

  // Agregar costos si están disponibles
  if (place.serviceLogisticSection.costs?.length > 0) {
    schema.priceRange = place.serviceLogisticSection.costs
      .map((c) => c.price)
      .join(" - ");
  }

  // Agregar información sobre servicios
  if (place.serviceLogisticSection.facilities) {
    const amenities = [];
    if (place.serviceLogisticSection.facilities.parking)
      amenities.push("Estacionamiento");
    if (place.serviceLogisticSection.facilities.restrooms)
      amenities.push("Baños");
    if (place.serviceLogisticSection.facilities.wheelchairAccess)
      amenities.push("Accesible para sillas de ruedas");
    if (place.serviceLogisticSection.facilities.localGuides)
      amenities.push("Guías turísticos");

    if (amenities.length > 0) {
      schema.amenityFeature = amenities.map((amenity) => ({
        "@type": "LocationFeatureSpecification",
        name: amenity,
        value: true,
      }));
    }
  }

  // Limpiar valores undefined
  Object.keys(schema).forEach(
    (key) => schema[key] === undefined && delete schema[key]
  );

  return schema;
};

/**
 * Schema para lista de lugares (página home o categoría)
 */
export const getItemListSchema = (
  places: Place[],
  listName: string = "Lugares turísticos de El Salvador"
) => {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: listName,
    numberOfItems: places.length,
    itemListElement: places.map((place, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "TouristAttraction",
        name: place.header.title,
        description: place.header.subtitle,
        image: place.header.mainImageURL,
        url: `${SITE_URL}/place/${place.placeId}`,
      },
    })),
  };
};

/**
 * Schema para categoría (colección de lugares)
 */
export const getCategorySchema = (
  category: CategoryInfo,
  placesCount: number
) => {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: category.name,
    description: category.description,
    url: `${SITE_URL}?category=${category.id}`,
    about: {
      "@type": "Thing",
      name: category.name,
      description: category.description,
    },
    numberOfItems: placesCount,
  };
};

/**
 * Convierte el schema a string JSON para insertar en script tag
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const schemaToJsonString = (schema: any): string => {
  return JSON.stringify(schema);
};
