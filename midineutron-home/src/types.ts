// src/types.ts
export enum CategoryType {
  Art = 'art',
  Show = 'show',
  Merch = 'merch',
}

export interface ArtItem {
  id: number;
  title: string;
  mediaType: 'image' | 'video';
  mediaUrl: string;
  description: string;
  link?: string;
  linkTitle?: string;
}

export interface ShowItem {
  id: number;
  date: string;
  venue: string;
  location: string;
  description: string;
}

export interface MerchItem {
  id: number;
  name: string;
  price: string;
  image: string;
  description: string;
}