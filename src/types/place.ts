// Interfaces para los lugares turísticos de Pulgarpedia

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface LocationClimate {
  address: string;
  coordinates: Coordinates;
  mapUrl: string;
  typicalHours: string;
  bestSeason: string;
}

export interface GalleryImage {
  imageUrl: string;
  alt: string;
}

export interface PlaceHeader {
  title: string;
  category: string;
  mainImageURL: string;
  subtitle: string;
}

export interface GeneralHistorySection {
  title: string;
  description: string;
  historyCulture: string;
  locationClimate: LocationClimate;
}

export interface TransportOption {
  option: string;
  details: string;
}

export interface Cost {
  item: string;
  price: string;
}

export interface Facilities {
  parking: boolean;
  restrooms: boolean;
  wheelchairAccess: boolean;
  localGuides: boolean;
  notes: string;
}

export interface ServiceLogisticSection {
  title: string;
  description: string;
  howToGetThere: TransportOption[];
  costs: Cost[];
  facilities: Facilities;
}

export interface PremiumRecommendation {
  id: number;
  type: "tip" | "food" | "accommodation" | "activity";
  headline: string;
  body: string;
}

export interface PremiumSection {
  title: string;
  isLocked: boolean;
  premiumTitle: string;
  contentSnippet: string;
  callToAction: string;
  premiumRecommendations: PremiumRecommendation[];
}

export interface Place {
  placeId: string;
  categoryId: string;
  header: PlaceHeader;
  gallery: GalleryImage[];
  generalHistorySection: GeneralHistorySection;
  serviceLogisticSection: ServiceLogisticSection;
  premiumSection: PremiumSection;
}

export interface CategoryInfo {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface PlaceCategory {
  categoryInfo: CategoryInfo;
  places: Place[];
}

// Para el resumen de lugares
export interface PlaceSummary {
  id: string;
  name: string;
  shortDescription: string;
  location?: string;
}

export interface CategorySummary {
  id: string;
  name: string;
  icon: string;
  description: string;
  places: PlaceSummary[];
}

export interface PlacesData {
  metadata: {
    projectName: string;
    description: string;
    version: string;
    lastUpdate: string;
  };
  categories: CategorySummary[];
  statistics: {
    totalCategories: number;
    totalPlaces: number;
    categoriesOmitted: string[];
  };
}
