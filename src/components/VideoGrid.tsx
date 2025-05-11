import React from 'react';
import { useAppContext } from '../context/AppContext';
import { formatDuration } from '../utils/formatTime';
import { Video } from '../types';

const VideoCard: React.FC<{ video: Video }> = ({ video }) => {
  const { setCurrentVideo, setIsPlaying } = useAppContext();

  const handleClick = () => {
    setCurrentVideo(video);
    setIsPlaying(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div 
      className="cursor-pointer group"
      onClick={handleClick}
    >
      <div className="relative aspect-video overflow-hidden rounded-lg mb-2">
        <img 
          src={video.thumbnail} 
          alt={video.title} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1 py-0.5 rounded">
          {formatDuration(video.duration)}
        </div>
      </div>

      <h3 className="font-medium text-white line-clamp-2 group-hover:text-red-500 transition-colors">
        {video.title}
      </h3>
      
      <div className="flex items-center text-sm text-gray-400 mt-1">
        <span>{video.views.toLocaleString()} views</span>
        <span className="mx-1">•</span>
        <span>{formatDate(video.uploadDate)}</span>
      </div>
    </div>
  );
};

// Helper function to format the date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months} ${months === 1 ? 'month' : 'months'} ago`;
  } else {
    const years = Math.floor(diffDays / 365);
    return `${years} ${years === 1 ? 'year' : 'years'} ago`;
  }
};

const VideoGrid: React.FC = () => {
  const { videos, searchQuery } = useAppContext();

  // Apply search filter
  const filteredVideos = searchQuery
    ? videos.filter(video => 
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : videos;

  return (
    <div className="p-4">
      {searchQuery && (
        <h2 className="text-xl font-bold text-white mb-4">
          {filteredVideos.length === 0 
            ? `No results for "${searchQuery}"` 
            : `Search results for "${searchQuery}"`}
        </h2>
      )}

      {!searchQuery && (
        <h2 className="text-xl font-bold text-white mb-4">
          Recommended videos
        </h2>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredVideos.map(video => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>

      {filteredVideos.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">No videos found. Try a different search.</p>
        </div>
      )}
    </div>
  );
};

export default VideoGrid;