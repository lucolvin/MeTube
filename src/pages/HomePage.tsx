import React from 'react';
import { useAppContext } from '../context/AppContext';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import VideoPlayer from '../components/VideoPlayer';
import VideoMetadata from '../components/VideoMetadata';
import VideoGrid from '../components/VideoGrid';

const HomePage: React.FC = () => {
  const { isSidebarOpen, currentVideo } = useAppContext();

  return (
    <div className="flex flex-col h-screen bg-gray-950">
      <Header />
      
      <div className="flex-1 flex overflow-hidden">
        <div className={`${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 hidden md:block`}>
          <Sidebar />
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {currentVideo ? (
            <div className="max-w-7xl mx-auto">
              <VideoPlayer />
              <VideoMetadata />
              <div className="mt-4">
                <h2 className="text-xl font-bold text-white px-4">You may also like</h2>
                <VideoGrid />
              </div>
            </div>
          ) : (
            <div className="max-w-7xl mx-auto">
              <VideoGrid />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;