// Definisi Tipe TypeScript untuk Love Couple Games

export interface BoardTile {
  name: string;
  tag: string;
  mission: string;
  rule?: string;
  duration?: string;
  intensity?: number;
  tip?: string;
}

export interface CardItem {
  prompt: string;
  rule: string;
  duration: string;
  intensity: number;
}

export interface ChallengeDeck {
  category: string;
  title: string;
  cards: CardItem[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface PainPoint {
  title: string;
  description: string;
}

export interface GameplayStep {
  num: number;
  title: string;
  description: string;
}

export interface FeaturePillar {
  title: string;
  description: string;
}

export type ModalStep = 'selection' | 'qris' | 'success';

export type PaymentMethod = 'qris' | 'gopay' | 'bca' | 'mandiri';

export interface TestimonialItem {
  id: number;
  couple: string;
  duration: string;
  city: string;
  quote: string;
  highlight: string;
  avatarText: string;
}
