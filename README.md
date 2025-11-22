# 🇸🇻 Pulgarpedia

Aplicación demo. Enciclopedia web especializada en el turismo salvadoreño. Desarrollado con Next.js 15, Typescript, Zustand, y Material UI.

Demo application. Web encyclopedia specializing in Salvadoran tourism. Developed with Next.js 15, Typescript, Zustand, and Material UI.

## 🚀 Demo

[https://pulgarpedia.vercel.app/](https://pulgarpedia.vercel.app/)

## 📱 Características

- **39 lugares turísticos** documentados con información detallada
- **5 categorías**: Naturaleza y Aventura, Playas y Costa, Ciudades y Pueblos, Gastronomía, Festividades
- **Contenido dinámico** cargado desde API REST
- **Coordenadas GPS** para cada lugar
- **Información de costos** y logística
- **Modal de error** con reintento automático
- **Diseño responsive** con Material UI
- **TypeScript** para type-safety

## 🛠 Tecnologías utilizadas | Technologies used

- [Next.js 15](https://nextjs.org/) - Framework React con SSR
- [Typescript](https://www.typescriptlang.org/) - Tipado estático
- [Zustand](https://zustand-demo.pmnd.rs/) - State management
- [Material UI](https://mui.com/) - Component library
- [Axios](https://axios-http.com/) - HTTP client

## 📦 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/Herbert37/nextjs-ts-pulgarpedia-app.git

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev
```

## 🌐 API Configuration

El contenido se carga desde el endpoint:

```
https://private-d21258-herbertayala.apiary-mock.com/pulgarpedia-content
```

Para más detalles sobre la configuración del API, ver [API_CONFIGURATION.md](./API_CONFIGURATION.md)

## 📖 Uso del Hook Personalizado

```typescript
import { usePulgarpediaContent } from "@/hooks/usePulgarpediaContent";

function MiComponente() {
  const { categories, places, getPlace, searchPlaces } =
    usePulgarpediaContent();

  // Buscar un lugar específico
  const place = getPlace("NA-001");

  // Buscar lugares por texto
  const results = searchPlaces("volcán");

  return <div>...</div>;
}
```

## 🗺 Estructura del Proyecto

```
src/
├── components/       # Componentes React
│   ├── ErrorModal.tsx
│   └── ContentExample.tsx
├── hooks/           # Custom hooks
│   └── usePulgarpediaContent.ts
├── pages/           # Páginas Next.js
│   ├── _app.tsx     # App wrapper con carga de contenido
│   └── content-example.tsx
├── stores/          # Zustand stores
│   ├── contentStore.ts
│   └── weatherStore.ts
├── types/           # TypeScript types
│   ├── content.ts
│   └── place.ts
├── utils/           # Utilidades
│   └── contentApi.ts
└── data/            # Datos
    └── content.json  # 39 lugares unificados
```

## 🎯 Páginas Disponibles

- `/` - Página principal
- `/content-example` - Ejemplo del contenido cargado desde el API

## 🔄 Manejo de Errores

La aplicación maneja automáticamente los errores del API:

- ⏱️ Timeout de 10 segundos
- 🔄 Modal con botón de reintento
- 🔌 Detección de problemas de conexión
- 🚫 No permite cerrar el modal hasta cargar el contenido

## 📊 Datos

El proyecto incluye información completa de:

- 8 lugares de **Naturaleza y Aventura**
- 8 lugares de **Playas y Costa**
- 8 lugares de **Ciudades y Pueblos**
- 7 destinos **Gastronómicos**
- 8 **Festividades y Eventos**

Cada lugar incluye:

- ✅ Título y descripción
- 📸 Galería de imágenes
- 📍 Coordenadas GPS
- ⏰ Horarios y temporadas
- 💰 Costos detallados
- 🚗 Cómo llegar
- 🏛️ Historia y cultura
- ⭐ Recomendaciones premium

## 👨‍💻 Autor

**Herbert Ayala**

- GitHub: [@Herbert37](https://github.com/Herbert37)

---

Made with ❤️ in El Salvador 🇸🇻
