# Pulgarpedia - Categorías y Lugares Turísticos de El Salvador 🇸🇻

## 📋 Resumen

Este documento lista todas las categorías y lugares turísticos implementados en Pulgarpedia.

**Total de Categorías Activas:** 5  
**Total de Lugares:** 51  
**Última actualización:** 19 de noviembre de 2025

---

## 🗂️ Categorías Implementadas

### 1. 🏞️ Naturaleza y Aventura (`nature-adventure`)

**Descripción:** Volcanes, lagos, cascadas, parques nacionales y rutas de senderismo

**Lugares (12):**

1. Volcán de Santa Ana (Ilamatepec) - El volcán más alto de El Salvador
2. Volcán de Izalco - El "Faro del Pacífico"
3. Cerro Verde - Parque nacional con vistas panorámicas
4. Lago de Coatepeque - Laguna de cráter volcánico
5. Parque Nacional El Imposible - Bosque tropical con biodiversidad
6. Laguna de Alegría - Laguna de cráter con aguas sulfurosas
7. Parque Nacional Montecristo - Bosque nuboso en el trifinio
8. Parque Nacional El Boquerón - Cráter del Volcán de San Salvador

---

### 2. 🏖️ Playas y Costa (`beaches-coast`)

**Descripción:** Playas, surf spots, puertos y manglares costeros

**Lugares (12):**

1. Playa El Tunco - Destino de surf y vida nocturna
2. Playa El Sunzal - Olas de clase mundial para surf
3. Playa Costa del Sol - Playa amplia con manglares
4. Playa Los Cobanos - Zona de buceo y arrecifes
5. Playa El Espino - Playa virgen y tranquila
6. Playa Las Flores - Surf y naturaleza salvaje
7. Puerto de La Libertad - Puerto histórico y gastronómico
8. Playa El Tamarindo - Reserva natural y playa

---

### 3. 🌆 Ciudades y Pueblos (`cities-towns`)

**Descripción:** Pueblos coloniales, ciudades turísticas y rutas urbanas

**Lugares (12):**

1. Suchitoto - Pueblo colonial y cultural
2. Ataco (Concepción de Ataco) - Ruta de las Flores, murales
3. Juayúa - Gastronomía y cascadas
4. Apaneca - Pueblo de montaña, café y lagunas
5. Nahuizalco - Artesanías y cultura náhuatl
6. Panchimalco - Tradiciones indígenas
7. Alegría - Pueblo con laguna de cráter
8. La Palma - Arte naïf y artesanías

---

### 4. 🍴 Gastronomía (`gastronomy`)

**Descripción:** Restaurantes típicos, rutas del café y mercados gastronómicos

**Lugares (7):**

1. Ruta del Café (Apaneca-Ilamatepec) - Tour por fincas cafetaleras
2. Feria Gastronómica de Juayúa - Fines de semana con comida típica
3. Mercado Central de San Salvador - Comida típica tradicional
4. Puerto de La Libertad - Mariscos - Mariscos frescos del Pacífico
5. Pupuserías de Olocuilta - Capital de la pupusa
6. Restaurantes de Suchitoto - Cocina tradicional elevada
7. Mercado de Santa Tecla - Comida callejera auténtica

---

### 5. 🎉 Festividades y Eventos (`festivals-events`)

**Descripción:** Fiestas patronales, eventos culturales y celebraciones tradicionales

**Eventos (8):**

1. Fiestas Agostinas - San Salvador (Agosto)
2. Festival del Maíz - Alegría (Agosto)
3. Festival de Invierno - Juayúa (Enero)
4. Semana Santa - Procesiones en todo el país
5. Feria de Santa Ana - Santa Ana (Julio)
6. Día de los Farolitos - Ahuachapán (Septiembre)
7. Festival Internacional de Arte y Cultura - Suchitoto (Febrero)
8. Fiestas Patronales - Cada pueblo tiene la suya

---

## 🚫 Categorías Omitidas

Las siguientes categorías fueron excluidas de esta versión:

1. **Patrimonio Histórico y Cultural** - Ruinas mayas, sitios coloniales, museos
2. **Arte y Artesanía** - Talleres, galerías, mercados artesanales
3. **Bienestar y Naturaleza** - Aguas termales, spas naturales

---

## 📂 Estructura de Archivos

```
src/
├── data/
│   ├── categories.json          # Definición de categorías
│   └── places-summary.json      # Resumen de todos los lugares
├── types/
│   └── place.ts                 # Interfaces TypeScript
nature-adventure.json            # Contenido completo de Naturaleza y Aventura
```

---

## 🔧 Uso de los Datos

### Importar categorías:

```typescript
import categories from "@/data/categories.json";
```

### Importar resumen de lugares:

```typescript
import placesData from "@/data/places-summary.json";
```

### Importar datos completos de Naturaleza y Aventura:

```typescript
import natureAdventure from "../../nature-adventure.json";
```

### Usar tipos TypeScript:

```typescript
import type { Place, CategorySummary } from "@/types/place";
```

---

## 📝 Estructura de Datos

Cada lugar turístico contiene:

- **Header:** Título, categoría, imagen principal, subtítulo
- **Galería:** Array de imágenes adicionales
- **Sección General e Historia:** Descripción, historia, ubicación, clima
- **Sección de Servicios y Logística:** Cómo llegar, costos, facilidades
- **Sección Premium:** Recomendaciones exclusivas (algunas bloqueadas)

---

## 🚀 Próximos Pasos

Para expandir Pulgarpedia, se pueden crear archivos JSON similares para:

- `beaches-coast.json` - Contenido completo de Playas
- `cities-towns.json` - Contenido completo de Ciudades y Pueblos
- `gastronomy.json` - Contenido completo de Gastronomía
- `festivals-events.json` - Contenido completo de Festividades

---

## 📞 Contacto

Desarrollado por Herbert Ayala

- LinkedIn: [herbert-ayala37](https://www.linkedin.com/in/herbert-ayala37/)
- GitHub: [Herbert37](https://github.com/Herbert37)
- Instagram: [@herbert37\_](https://www.instagram.com/herbert37_/)

---

**Última actualización:** Noviembre 19, 2025
