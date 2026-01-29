export interface ZoneInfo {
  name: string;
  id: string;
  riskLevel: 'Low' | 'Moderate' | 'High' | 'Severe';
  commonConcerns: string[];
  description: string;
}

export interface ZoneDetails {
  anatomicalRisks: string;
  safetyPrecautions: string[];
  typicalRecovery: string;
  dangerSigns: string[];
}

export interface Clinic {
  name: string;
  address: string;
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  snippet?: string;
}

export interface BrandInfo {
  name: string;
  manufacturer: string;
  fdaApproved: boolean;
  bestFor: string[];
  longevity: string;
}

export enum AppView {
  HOME = 'HOME',
  FACE_MAP = 'FACE_MAP',
  CLINICS = 'CLINICS',
  BRANDS = 'BRANDS',
  ALTERNATIVES = 'ALTERNATIVES'
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  text: string;
  timestamp: number;
  targetId: string;
}
