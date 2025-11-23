import { GetServerSideProps } from "next";
import { fetchPulgarpediaContent } from "../utils/contentApi";
import { Place, CategoryInfo } from "../types/place";

/**
 * Genera sitemap.xml dinámico
 * Obtiene datos del endpoint API en lugar de archivo estático
 */

const SITE_URL = "https://pulgarpedia.com";

function generateSiteMap(places: Place[], categories: CategoryInfo[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!-- Home page -->
     <url>
       <loc>${SITE_URL}</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
       <changefreq>daily</changefreq>
       <priority>1.0</priority>
     </url>
     
     <!-- Páginas de lugares -->
     ${places
       .map((place) => {
         return `
     <url>
       <loc>${SITE_URL}/place/${place.placeId}</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
       <changefreq>weekly</changefreq>
       <priority>0.8</priority>
       <image:image xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
         <image:loc>${place.header.mainImageURL}</image:loc>
         <image:title>${place.header.title}</image:title>
         <image:caption>${place.header.subtitle}</image:caption>
       </image:image>
     </url>`;
       })
       .join("")}
     
     <!-- Páginas de categorías (como query params) -->
     ${categories
       .map((category) => {
         return `
     <url>
       <loc>${SITE_URL}?category=${category.id}</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
       <changefreq>weekly</changefreq>
       <priority>0.7</priority>
     </url>`;
       })
       .join("")}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  try {
    // Obtener contenido desde el API
    const content = await fetchPulgarpediaContent();

    // Generar el XML del sitemap
    const sitemap = generateSiteMap(content.places, content.categories);

    res.setHeader("Content-Type", "text/xml");
    // Cache por 1 hora
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=3600, stale-while-revalidate=7200"
    );
    res.write(sitemap);
    res.end();

    return {
      props: {},
    };
  } catch (error) {
    console.error("Error generating sitemap:", error);

    // En caso de error, devolver un sitemap básico
    const basicSitemap = `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>${SITE_URL}</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
       <changefreq>daily</changefreq>
       <priority>1.0</priority>
     </url>
   </urlset>`;

    res.setHeader("Content-Type", "text/xml");
    res.write(basicSitemap);
    res.end();

    return {
      props: {},
    };
  }
};

export default SiteMap;
