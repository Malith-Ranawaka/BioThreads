export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  materialPassport: string;
  ecoSaving: string;
  category: string;
  isBioLoop?: boolean;
  stockLevel: number;
  materialComposition: string;
  biodegradabilityScore: number;
  biodegradabilityLabel?: string;
  secondaryImage?: string;
  badges?: string[];
  returnValue: number;
  description: string;
  sizes?: string[];
  colors?: { name: string; hex: string; image?: string }[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}
