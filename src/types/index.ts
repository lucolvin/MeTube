export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: number; // in seconds
  path: string;
  uploadDate: string;
  views: number;
  category?: string;
}

export interface Category {
  id: string;
  name: string;
  videos: Video[];
}

export interface AppConfig {
  mediaPath: string;
  serverUrl: string;
}