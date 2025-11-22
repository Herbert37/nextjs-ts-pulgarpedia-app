import * as React from "react";
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from "next/document";
import createEmotionServer from "@emotion/server/create-instance";
import { AppType } from "next/app";
import createEmotionCache from "../utils/createEmotionCache";
import theme from "../styles/theme";

interface MyDocumentProps extends DocumentInitialProps {
  emotionStyleTags: React.JSX.Element[];
}

/**
 * Custom Document para Next.js
 * Define la estructura HTML base de la aplicación
 * Incluye configuración para Emotion CSS-in-JS
 */
export default function MyDocument({ emotionStyleTags }: MyDocumentProps) {
  return (
    <Html lang='es'>
      <Head>
        {/* PWA primary color */}
        <meta name='theme-color' content={theme.palette.primary.main} />
        {/* Fonts - Puedes agregar Google Fonts u otras fuentes aquí */}
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='anonymous'
        />
        {/* Emotion CSS */}
        <meta name='emotion-insertion-point' content='' />
        {emotionStyleTags}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

// `getInitialProps` pertenece a `_document` (en lugar de `_app`),
// es compatible con la generación de sitios estáticos (SSG).
MyDocument.getInitialProps = async (
  ctx: DocumentContext
): Promise<MyDocumentProps> => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  const originalRenderPage = ctx.renderPage;

  // Puedes considerar compartir el mismo Emotion cache entre todas las peticiones SSR
  // para acelerar el rendimiento. Sin embargo, ten en cuenta que puede tener efectos
  // secundarios globales.
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        App: React.ComponentType<React.ComponentProps<AppType> & any>
      ) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />;
        },
    });

  const initialProps = await Document.getInitialProps(ctx);
  // Esto es importante. Previene que Emotion renderice HTML inválido.
  // Ver https://github.com/mui/material-ui/issues/26561#issuecomment-855286153
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const emotionStyleTags = emotionStyles.styles.map((style: any) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(" ")}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    emotionStyleTags,
  };
};
