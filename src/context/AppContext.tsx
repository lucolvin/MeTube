import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Video, Category, AppConfig } from '../types';
import { mockVideos, mockCategories } from '../data/mockData';

interface AppContextProps {
  videos: Video[];
  categories: Category[];
  currentVideo: Video | null;
  isPlaying: boolean;
  isSidebarOpen: boolean;
  volume: number;
  config: AppConfig;
  searchQuery: string;
  setVideos: (videos: Video[]) => void;
  setCategories: (categories: Category[]) => void;
  setCurrentVideo: (video: Video | null) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setIsSidebarOpen: (isOpen: boolean) => void;
  setVolume: (volume: number) => void;
  setConfig: (config: AppConfig) => void;
  setSearchQuery: (query: string) => void;
}

const defaultConfig: AppConfig = {
  mediaPath: '/media',
  serverUrl: 'http://localhost:8080',
};

const AppContext = createContext<AppContextProps>({
  videos: [],
  categories: [],
  currentVideo: null,
  isPlaying: false,
  isSidebarOpen: true,
  volume: 1,
  config: defaultConfig,
  searchQuery: '',
  setVideos: () => {},
  setCategories: () => {},
  setCurrentVideo: () => {},
  setIsPlaying: () => {},
  setIsSidebarOpen: () => {},
  setVolume: () => {},
  setConfig: () => {},
  setSearchQuery: () => {},
});

export const useAppContext = () => useContext(AppContext);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [videos, setVideos] = useState<Video[]>(mockVideos);
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [volume, setVolume] = useState(1);
  const [config, setConfig] = useState<AppConfig>(defaultConfig);
  const [searchQuery, setSearchQuery] = useState('');

  // In a real app, you would fetch videos from your server here
  useEffect(() => {
    // Example API call (commented out for now)
    // const fetchVideos = async () => {
    //   try {
    //     const response = await fetch(`${config.serverUrl}/api/videos`);
    //     const data = await response.json();
    //     setVideos(data);
    //   } catch (error) {
    //     console.error('Error fetching videos:', error);
    //   }
    // };
    // fetchVideos();
  }, [config.serverUrl]);

  return (
    <AppContext.Provider
      value={{
        videos,
        categories,
        currentVideo,
        isPlaying,
        isSidebarOpen,
        volume,
        config,
        searchQuery,
        setVideos,
        setCategories,
        setCurrentVideo,
        setIsPlaying,
        setIsSidebarOpen,
        setVolume,
        setConfig,
        setSearchQuery,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};