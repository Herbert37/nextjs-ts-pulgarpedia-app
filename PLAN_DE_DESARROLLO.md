# 📋 Plan de Desarrollo - Pulgarpedia

## 🎯 Objetivo

Desarrollar una aplicación web responsive que funcione como enciclopedia de lugares turísticos de El Salvador con 5 categorías y 39 lugares turísticos.

---

## 📊 Resumen Ejecutivo

**Total de Fases**: 3  
**Total de Tareas**: 25  
**Estimación Total**: 3-4 semanas  
**Orden de Desarrollo**: Vista Principal → Vista Detalle → Refinamiento

---

## 🚀 FASE 1: VISTA PRINCIPAL (HOME)

**Prioridad**: ALTA  
**Estimación**: 1.5-2 semanas  
**Path**: `/`

### 📦 1.1. Componentes Base y Sistema de Diseño

**Estimación**: 2-3 días

#### Tarea 1.1.1: Configurar Sistema de Tipografía

- [ ] Definir escalas tipográficas en theme.ts (h1-h6, body1-body2, caption)
- [ ] Establecer pesos de fuente (regular, medium, bold)
- [ ] Definir line-heights consistentes
- [ ] Crear componentes de texto reutilizables si es necesario
- **Archivos**: `src/styles/theme.ts`

#### Tarea 1.1.2: Sistema de Grid y Espaciados

- [ ] Definir breakpoints consistentes (mobile, tablet, desktop)
- [ ] Establecer sistema de espaciados (8px base: 1=8px, 2=16px, etc.)
- [ ] Configurar Container maxWidth consistente
- [ ] Documentar guías de uso
- **Archivos**: `src/styles/theme.ts`

#### Tarea 1.1.3: Componente de Card Reutilizable

- [ ] Crear PlaceCard.tsx para mostrar lugares turísticos
- [ ] Incluir: imagen, título, categoría, descripción corta
- [ ] Versión horizontal y vertical
- [ ] Estados: hover, loading, skeleton
- [ ] Responsive (mobile-first)
- **Archivos**: `src/components/PlaceCard.tsx`

---

### 🔍 1.2. Sección de Filtro y Búsqueda

**Estimación**: 3-4 días

#### Tarea 1.2.1: Componente SearchBar

- [ ] Input de búsqueda con icono
- [ ] Implementar debounce (300ms)
- [ ] Filtro por nombre de lugar (coincidencias parciales)
- [ ] Clear button cuando hay texto
- [ ] Estados: focus, disabled
- [ ] Accesibilidad (aria-labels)
- **Archivos**: `src/components/SearchBar.tsx`

#### Tarea 1.2.2: Componente CategoryFilter

- [ ] Dropdown/Select con las 5 categorías
- [ ] Opción "Todas las categorías"
- [ ] Mostrar icono de cada categoría
- [ ] Contador de lugares por categoría
- [ ] Responsive (mobile: bottom sheet, desktop: dropdown)
- **Archivos**: `src/components/CategoryFilter.tsx`

#### Tarea 1.2.3: Lógica de Filtrado Combinado

- [ ] Hook personalizado: useFilteredPlaces()
- [ ] Combinar búsqueda + categoría
- [ ] Manejo de estado de filtros
- [ ] Mostrar contador de resultados
- [ ] Mensaje cuando no hay resultados
- **Archivos**: `src/hooks/useFilteredPlaces.ts`

#### Tarea 1.2.4: Integrar Filtros en Vista Principal

- [ ] Layout del header de filtros
- [ ] Sticky en scroll (opcional)
- [ ] Animaciones suaves al filtrar
- [ ] Preservar estado en navegación
- **Archivos**: `src/pages/index.tsx`

---

### 🎠 1.3. Sección de Recomendaciones (Carrusel)

**Estimación**: 2-3 días

#### Tarea 1.3.1: Componente RecommendationsCarousel

- [ ] Carrusel responsive con librería (react-slick o swiper)
- [ ] Mostrar 4-6 lugares aleatorios
- [ ] Autoplay opcional (5 segundos)
- [ ] Swipe en mobile
- [ ] Flechas de navegación en desktop
- [ ] Indicadores de posición (dots)
- [ ] Lazy loading de imágenes
- **Archivos**: `src/components/RecommendationsCarousel.tsx`

#### Tarea 1.3.2: Lógica de Selección Aleatoria

- [ ] Función para seleccionar lugares random
- [ ] Evitar duplicados en la sesión
- [ ] Regenerar al recargar página
- [ ] Incluir lugares de todas las categorías
- **Archivos**: `src/utils/randomPlaces.ts`

#### Tarea 1.3.3: Integrar Carrusel en Home

- [ ] Posicionar después de filtros
- [ ] Título de sección: "Lugares Recomendados"
- [ ] Link a cada lugar desde el carrusel
- [ ] Skeleton loader mientras carga
- **Archivos**: `src/pages/index.tsx`

---

### 🏷️ 1.4. Secciones de Categorías

**Estimación**: 2-3 días

#### Tarea 1.4.1: Componente CategorySection

- [ ] Card grande por categoría (solo lectura)
- [ ] Mostrar: icono, nombre, descripción
- [ ] Imagen representativa de fondo
- [ ] Contador de lugares en esa categoría
- [ ] No clickeable (solo informativo)
- [ ] Responsive con grid adaptativo
- **Archivos**: `src/components/CategorySection.tsx`

#### Tarea 1.4.2: Diseño Visual de Categorías

- [ ] Definir colores/gradientes por categoría
- [ ] Iconografía consistente (emojis o Material Icons)
- [ ] Layout: grid 2 columnas mobile, 3 desktop
- [ ] Hover effect sutil (sin acción)
- **Archivos**: `src/components/CategorySection.tsx`

#### Tarea 1.4.3: Integrar Categorías en Home

- [ ] Título: "Explora Por Categoría"
- [ ] Grid de las 5 categorías
- [ ] Orden consistente
- [ ] Espaciado uniforme
- **Archivos**: `src/pages/index.tsx`

---

### 🎨 1.5. Refinamiento de Vista Principal

**Estimación**: 1-2 días

#### Tarea 1.5.1: Lista de Resultados Filtrados

- [ ] Mostrar lugares filtrados en grid
- [ ] Grid: 1 col mobile, 2 tablet, 3 desktop
- [ ] Usar PlaceCard component
- [ ] Paginación o infinite scroll
- [ ] Skeleton loaders
- **Archivos**: `src/pages/index.tsx`

#### Tarea 1.5.2: Estados y Mensajes

- [ ] Loading state inicial
- [ ] Empty state: "No se encontraron lugares"
- [ ] Error state del API
- [ ] Mensaje de bienvenida
- **Archivos**: `src/pages/index.tsx`

#### Tarea 1.5.3: Performance y SEO

- [ ] Lazy loading de imágenes
- [ ] Optimizar re-renders
- [ ] Meta tags (title, description)
- [ ] Open Graph tags
- **Archivos**: `src/pages/index.tsx`, `src/pages/_app.tsx`

---

## 🏞️ FASE 2: VISTA DEL LUGAR TURÍSTICO (DETALLE)

**Prioridad**: ALTA  
**Estimación**: 1-1.5 semanas  
**Path**: `/place/[placeId]`

### 🎯 2.1. Configuración de Ruta Dinámica

**Estimación**: 1 día

#### Tarea 2.1.1: Crear Página Dinámica

- [ ] Crear archivo: pages/place/[placeId].tsx
- [ ] Configurar getStaticPaths (SSG)
- [ ] Configurar getStaticProps
- [ ] TypeScript types para params
- **Archivos**: `src/pages/place/[placeId].tsx`

#### Tarea 2.1.2: Validación de ID y Modal de Error

- [ ] Validar si placeId existe
- [ ] Modal: "Lugar turístico no encontrado"
- [ ] Botón: "Volver a la página principal"
- [ ] Redirección a /
- [ ] También manejar 404 normal
- **Archivos**: `src/components/PlaceNotFoundModal.tsx`

---

### 🎨 2.2. Header del Lugar

**Estimación**: 1 día

#### Tarea 2.2.1: Header Banner con Overlay

- [ ] Reutilizar estructura del Header principal
- [ ] Imagen de fondo del lugar (mainImageURL)
- [ ] Overlay oscuro para legibilidad
- [ ] Título del lugar
- [ ] Subtítulo
- [ ] Badge con categoría
- [ ] Breadcrumb: Home > Categoría > Lugar
- **Archivos**: `src/components/PlaceHeader.tsx`

#### Tarea 2.2.2: Responsive del Header

- [ ] Altura adaptativa (mobile: 300px, desktop: 500px)
- [ ] Tipografía responsive
- [ ] Posición de elementos
- **Archivos**: `src/components/PlaceHeader.tsx`

---

### 🎠 2.3. Carrusel de Galería

**Estimación**: 2 días

#### Tarea 2.3.1: Componente PlaceGalleryCarousel

- [ ] Carrusel full-width con imágenes del gallery[]
- [ ] Swipe en mobile (touch gestures)
- [ ] Flechas laterales en desktop
- [ ] Thumbnails preview (opcional)
- [ ] Zoom en click (lightbox modal)
- [ ] Indicador de imagen actual (1/5)
- [ ] Lazy loading
- **Archivos**: `src/components/PlaceGalleryCarousel.tsx`

#### Tarea 2.3.2: Optimización de Imágenes

- [ ] Next.js Image component
- [ ] Diferentes tamaños responsive
- [ ] Placeholder blur
- [ ] Alt texts descriptivos
- **Archivos**: `src/components/PlaceGalleryCarousel.tsx`

---

### 📖 2.4. Sección General e Historia

**Estimación**: 1-2 días

#### Tarea 2.4.1: Componente GeneralHistorySection

- [ ] Título de sección
- [ ] description (párrafo principal)
- [ ] historyCulture (historia)
- [ ] locationClimate (ubicación)
- [ ] Mostrar coordenadas GPS
- [ ] Link a Google Maps
- [ ] Horarios típicos
- [ ] Mejor temporada
- [ ] Iconografía para cada subsección
- **Archivos**: `src/components/GeneralHistorySection.tsx`

#### Tarea 2.4.2: Layout y Diseño

- [ ] Grid 2 columnas en desktop
- [ ] Stack en mobile
- [ ] Cards con sombras sutiles
- [ ] Tipografía jerarquizada
- [ ] Espaciado consistente
- **Archivos**: `src/components/GeneralHistorySection.tsx`

---

### 🚗 2.5. Sección Servicios y Logística

**Estimación**: 1-2 días

#### Tarea 2.5.1: Componente ServiceLogisticSection

- [ ] Título: "Cómo Llegar y Servicios"
- [ ] Subsección: Cómo llegar (howToGetThere[])
  - [ ] Iconos de transporte
  - [ ] Lista de opciones
- [ ] Subsección: Costos (costs[])
  - [ ] Tabla o lista
  - [ ] Precios en USD
- [ ] Subsección: Facilidades (facilities)
  - [ ] Iconos: parking, restrooms, wheelchair, guides
  - [ ] Checkmarks verdes/rojos
  - [ ] Notas adicionales
- **Archivos**: `src/components/ServiceLogisticSection.tsx`

#### Tarea 2.5.2: Iconografía y UX

- [ ] Material Icons para cada servicio
- [ ] Color coding (verde=disponible, rojo=no)
- [ ] Tooltips explicativos
- [ ] Layout responsive
- **Archivos**: `src/components/ServiceLogisticSection.tsx`

---

### 💎 2.6. Sección Premium

**Estimación**: 0.5 días

#### Tarea 2.6.1: Componente PremiumSection

- [ ] Card con fondo degradado
- [ ] Icono de candado
- [ ] Título: "Sección Premium"
- [ ] Mensaje: "Sección Premium muy pronto"
- [ ] Descripción breve del valor
- [ ] Botón deshabilitado: "Próximamente"
- [ ] Animación sutil (pulse o glow)
- **Archivos**: `src/components/PremiumSection.tsx`

---

### 🔗 2.7. Navegación y Extras

**Estimación**: 1 día

#### Tarea 2.7.1: Botones de Navegación

- [ ] Botón: Volver a Home
- [ ] Botones: Lugar anterior/siguiente (en la categoría)
- [ ] Share buttons (opcional)
- [ ] Botón: Guardar en favoritos (opcional)
- **Archivos**: `src/components/PlaceNavigation.tsx`

#### Tarea 2.7.2: Related Places

- [ ] Sección: "Lugares Similares"
- [ ] Mostrar 3-4 lugares de la misma categoría
- [ ] Grid de PlaceCard
- **Archivos**: `src/components/RelatedPlaces.tsx`

---

## 🎨 FASE 3: REFINAMIENTO Y OPTIMIZACIÓN

**Prioridad**: MEDIA  
**Estimación**: 3-5 días

### 🚀 3.1. Performance

**Estimación**: 2 días

#### Tarea 3.1.1: Optimización de Carga

- [ ] Code splitting por rutas
- [ ] Dynamic imports para componentes pesados
- [ ] Lazy loading de imágenes
- [ ] Prefetch de rutas
- [ ] Bundle analysis
- **Herramientas**: Next.js bundle analyzer

#### Tarea 3.1.2: Caching y Estado

- [ ] Cache de búsquedas recientes
- [ ] Persistir filtros en localStorage
- [ ] Optimizar re-renders con memo
- [ ] React Query para estado del servidor (opcional)

---

### 📱 3.2. Responsive y Accesibilidad

**Estimación**: 2 días

#### Tarea 3.2.1: Testing Responsive

- [ ] Probar en todos los breakpoints
- [ ] Ajustar espaciados mobile
- [ ] Touch targets mínimo 44px
- [ ] Scroll suave
- [ ] Orientación landscape

#### Tarea 3.2.2: Accesibilidad (a11y)

- [ ] Semantic HTML
- [ ] ARIA labels
- [ ] Navegación por teclado
- [ ] Focus visible
- [ ] Contraste de colores WCAG AA
- [ ] Screen reader testing

---

### 🧪 3.3. Testing

**Estimación**: 1 día

#### Tarea 3.3.1: Unit Tests

- [ ] Tests para hooks personalizados
- [ ] Tests para funciones de filtrado
- [ ] Tests para componentes clave

#### Tarea 3.3.2: E2E Tests (opcional)

- [ ] Test de búsqueda y filtrado
- [ ] Test de navegación entre vistas
- [ ] Test de validación de ID

---

## 📦 COMPONENTES A CREAR

### Vista Principal (Home)

```
src/components/
├── PlaceCard.tsx              ✨ NUEVO
├── SearchBar.tsx              ✨ NUEVO
├── CategoryFilter.tsx         ✨ NUEVO
├── RecommendationsCarousel.tsx ✨ NUEVO
└── CategorySection.tsx        ✨ NUEVO
```

### Vista Detalle

```
src/components/
├── PlaceHeader.tsx            ✨ NUEVO
├── PlaceGalleryCarousel.tsx   ✨ NUEVO
├── GeneralHistorySection.tsx  ✨ NUEVO
├── ServiceLogisticSection.tsx ✨ NUEVO
├── PremiumSection.tsx         ✨ NUEVO
├── PlaceNavigation.tsx        ✨ NUEVO
├── RelatedPlaces.tsx          ✨ NUEVO
└── PlaceNotFoundModal.tsx     ✨ NUEVO
```

### Hooks

```
src/hooks/
├── useFilteredPlaces.ts       ✨ NUEVO
├── usePulgarpediaContent.ts   ✅ EXISTE
└── useRandomPlaces.ts         ✨ NUEVO
```

### Utils

```
src/utils/
├── randomPlaces.ts            ✨ NUEVO
└── navigation.ts              ✨ NUEVO
```

---

## 🎨 SISTEMA DE DISEÑO

### Tipografía

```typescript
// theme.ts
typography: {
  h1: { fontSize: '3rem', fontWeight: 700 },    // Títulos principales
  h2: { fontSize: '2.5rem', fontWeight: 600 },  // Títulos de sección
  h3: { fontSize: '2rem', fontWeight: 600 },    // Subtítulos
  h4: { fontSize: '1.5rem', fontWeight: 500 },  // Títulos de card
  body1: { fontSize: '1rem', lineHeight: 1.7 }, // Texto principal
  body2: { fontSize: '0.875rem' },              // Texto secundario
}
```

### Espaciados

```typescript
// Sistema basado en 8px
spacing: 8, // 1 unit = 8px
// Uso: sx={{ mt: 2 }} = margin-top: 16px
```

### Breakpoints

```typescript
breakpoints: {
  xs: 0,      // Mobile
  sm: 600,    // Tablet portrait
  md: 960,    // Tablet landscape
  lg: 1280,   // Desktop
  xl: 1920,   // Large desktop
}
```

### Colores por Categoría (Sugeridos)

```typescript
categories: {
  'nature-adventure': '#4CAF50',   // Verde
  'beaches-coast': '#03A9F4',      // Azul
  'cities-towns': '#FF9800',       // Naranja
  'gastronomy': '#F44336',         // Rojo
  'festivals-events': '#9C27B0',   // Púrpura
}
```

---

## 📊 PRIORIZACIÓN SUGERIDA

### Semana 1: Vista Principal - Core

- Día 1-2: Sistema de diseño + PlaceCard
- Día 3-4: SearchBar + CategoryFilter + Filtrado
- Día 5: Integración en Home

### Semana 2: Vista Principal - Complementos + Vista Detalle Inicio

- Día 1-2: Carrusel de recomendaciones
- Día 3: Secciones de categorías
- Día 4-5: Ruta dinámica + Header del lugar

### Semana 3: Vista Detalle - Core

- Día 1-2: Carrusel de galería
- Día 3: Sección Historia
- Día 4: Sección Servicios
- Día 5: Sección Premium + Navegación

### Semana 4: Refinamiento

- Día 1-2: Performance y optimización
- Día 3-4: Responsive final + Accesibilidad
- Día 5: Testing y ajustes finales

---

## 🚦 DEFINICIÓN DE HECHO (DoD)

### Para cada componente:

- ✅ Funciona correctamente en mobile, tablet y desktop
- ✅ Cumple con los requerimientos especificados
- ✅ TypeScript sin errores
- ✅ Código comentado en secciones complejas
- ✅ Props documentadas con JSDoc
- ✅ Estados de loading/error manejados
- ✅ Accesible (ARIA labels, navegación por teclado)

### Para cada vista:

- ✅ SEO optimizado (meta tags)
- ✅ Performance score > 90 (Lighthouse)
- ✅ Funciona sin JavaScript habilitado (progresive enhancement)
- ✅ Imágenes optimizadas
- ✅ Navegación funcional

---

## 🛠️ LIBRERÍAS RECOMENDADAS

### Carruseles

- **Opción 1**: `swiper` - Moderna, ligera, touch-friendly
- **Opción 2**: `react-slick` - Clásica, más simple

### Optimización de Imágenes

- `next/image` - Incluido en Next.js

### Animaciones (Opcional)

- `framer-motion` - Animaciones suaves y declarativas

### Formularios

- Material-UI ya incluye componentes de formulario

---

## 📝 NOTAS IMPORTANTES

1. **Mobile-First**: Diseñar primero para mobile, luego desktop
2. **Performance**: Lazy loading obligatorio en imágenes
3. **Consistencia**: Reutilizar componentes base (PlaceCard, etc.)
4. **Accesibilidad**: ARIA labels en todos los componentes interactivos
5. **SEO**: Meta tags únicos por página
6. **Testing**: Probar en Chrome, Firefox, Safari, Edge
7. **Datos**: Ya tienes el API configurado y el hook usePulgarpediaContent

---

## ✅ CHECKLIST RÁPIDO

### Vista Principal

- [ ] Header (ya existe) ✅
- [ ] SearchBar
- [ ] CategoryFilter
- [ ] Filtrado combinado funcionando
- [ ] Carrusel de recomendaciones
- [ ] 5 secciones de categorías
- [ ] Grid de resultados con PlaceCard
- [ ] Estados: loading, empty, error

### Vista Detalle

- [ ] Ruta dinámica configurada
- [ ] Validación de ID + modal error
- [ ] Header con título, subtítulo, categoría
- [ ] Carrusel de galería funcional
- [ ] Sección General e Historia
- [ ] Sección Servicios y Logística
- [ ] Sección Premium (placeholder)
- [ ] Navegación (volver, anterior/siguiente)
- [ ] Lugares relacionados

### General

- [ ] Responsive completo
- [ ] Performance optimizado
- [ ] Accesibilidad básica
- [ ] SEO configurado

---

## 🎯 PRÓXIMO PASO INMEDIATO

**Recomendación**: Empezar por la Fase 1, Tarea 1.1 (Sistema de Diseño)

¿Quieres que empiece desarrollando?

1. **Sistema de tipografía y grid** (Tarea 1.1.1 y 1.1.2)
2. **PlaceCard component** (Tarea 1.1.3)
3. **O prefieres otro punto de partida?**
