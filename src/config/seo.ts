/**
 * Configuración SEO por defecto para toda la aplicación
 */
export const defaultSEOConfig = {
  titleTemplate: "%s | Pulgarpedia",
  defaultTitle: "Pulgarpedia - Descubre El Salvador",
  description:
    "Explora los mejores lugares turísticos de El Salvador. Naturaleza, playas, ciudades, gastronomía y festividades. Tu guía completa para descubrir el país del pulgarcito.",
  canonical: "https://pulgarpedia.com",
  openGraph: {
    type: "website",
    locale: "es_SV",
    url: "https://pulgarpedia.com",
    siteName: "Pulgarpedia",
    title: "Pulgarpedia - Descubre El Salvador",
    description:
      "Explora los mejores lugares turísticos de El Salvador. Naturaleza, playas, ciudades, gastronomía y festividades.",
    images: [
      {
        url: "https://pulgarpedia.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Pulgarpedia - Descubre El Salvador",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    handle: "@pulgarpedia",
    site: "@pulgarpedia",
    cardType: "summary_large_image",
  },
  additionalMetaTags: [
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1, maximum-scale=5",
    },
    {
      name: "keywords",
      content:
        "El Salvador, turismo, lugares turísticos, volcanes, playas, gastronomía, festividades, pueblos coloniales, naturaleza, aventura",
    },
    {
      name: "author",
      content: "Pulgarpedia",
    },
    {
      name: "robots",
      content: "index, follow",
    },
    {
      httpEquiv: "Content-Language",
      content: "es",
    },
  ],
  additionalLinkTags: [
    {
      rel: "icon",
      href: "/favicon.ico",
    },
    {
      rel: "apple-touch-icon",
      href: "/apple-touch-icon.png",
      sizes: "180x180",
    },
    {
      rel: "manifest",
      href: "/site.webmanifest",
    },
  ],
};

/**
 * Genera configuración SEO para la página principal
 */
export const getHomeSEO = (placesCount: number) => ({
  title: "Inicio - Descubre los mejores lugares de El Salvador",
  description: `Explora ${placesCount} lugares turísticos en El Salvador. Volcanes, playas paradisíacas, pueblos coloniales, gastronomía típica y festividades únicas.`,
  openGraph: {
    title: "Pulgarpedia - Tu guía turística de El Salvador",
    description: `Descubre ${placesCount} lugares increíbles en El Salvador. Naturaleza, cultura, aventura y más.`,
    url: "https://pulgarpedia.com",
  },
});

/**
 * Genera configuración SEO para página de lugar
 */
export const getPlaceSEO = (
  title: string,
  description: string,
  category: string,
  imageUrl: string,
  placeId: string
) => ({
  title: `${title} - ${category}`,
  description: description.slice(0, 160),
  canonical: `https://pulgarpedia.com/place/${placeId}`,
  openGraph: {
    title: `${title} | Pulgarpedia`,
    description: description.slice(0, 200),
    url: `https://pulgarpedia.com/place/${placeId}`,
    type: "article" as const,
    images: [
      {
        url: imageUrl.startsWith("http")
          ? imageUrl
          : `https://pulgarpedia.com${imageUrl}`,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  },
});

/**
 * Genera configuración SEO para búsqueda/filtros
 */
export const getSearchSEO = (query?: string, category?: string) => {
  if (category) {
    return {
      title: `${category} - Lugares turísticos`,
      description: `Explora los mejores lugares de ${category} en El Salvador. Encuentra actividades, destinos y experiencias únicas.`,
      noindex: false,
    };
  }

  if (query) {
    return {
      title: `Resultados: ${query}`,
      description: `Resultados de búsqueda para "${query}" en Pulgarpedia.`,
      noindex: true, // No indexar páginas de búsqueda específicas
    };
  }

  return {};
};
