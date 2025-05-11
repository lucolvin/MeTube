import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { ThumbsUp, ThumbsDown, Share2, Flag, Bookmark } from 'lucide-react';

const VideoMetadata: React.FC = () => {
  const { currentVideo } = useAppContext();
  const [showFullDescription, setShowFullDescription] = useState(false);
  
  if (!currentVideo) return null;

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div className="p-4 text-white">
      <h1 className="text-xl md:text-2xl font-bold mb-2">{currentVideo.title}</h1>
      
      <div className="flex flex-wrap justify-between items-center py-3 border-b border-gray-800">
        <div className="text-gray-400 text-sm mb-2 md:mb-0">
          {currentVideo.views.toLocaleString()} views • {new Date(currentVideo.uploadDate).toLocaleDateString()}
        </div>
        
        <div className="flex space-x-4">
          <button className="flex items-center space-x-1 text-gray-400 hover:text-gray-200 transition-colors">
            <ThumbsUp size={18} />
            <span>Like</span>
          </button>
          
          <button className="flex items-center space-x-1 text-gray-400 hover:text-gray-200 transition-colors">
            <ThumbsDown size={18} />
            <span>Dislike</span>
          </button>
          
          <button className="flex items-center space-x-1 text-gray-400 hover:text-gray-200 transition-colors">
            <Share2 size={18} />
            <span>Share</span>
          </button>
          
          <button className="flex items-center space-x-1 text-gray-400 hover:text-gray-200 transition-colors">
            <Bookmark size={18} />
            <span>Save</span>
          </button>
          
          <button className="flex items-center space-x-1 text-gray-400 hover:text-gray-200 transition-colors">
            <Flag size={18} />
            <span>Report</span>
          </button>
        </div>
      </div>
      
      <div className="mt-4">
        <div className={`text-gray-300 ${showFullDescription ? '' : 'line-clamp-2'}`}>
          {currentVideo.description}
        </div>
        
        {currentVideo.description.length > 120 && (
          <button 
            onClick={toggleDescription}
            className="text-blue-400 hover:text-blue-300 mt-1 text-sm"
          >
            {showFullDescription ? 'Show less' : 'Show more'}
          </button>
        )}
      </div>
    </div>
  );
};

export default VideoMetadata;