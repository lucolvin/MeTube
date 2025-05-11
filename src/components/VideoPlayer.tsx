import React, { useRef, useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward, Settings } from 'lucide-react';
import { formatTime } from '../utils/formatTime';

const VideoPlayer: React.FC = () => {
  const { currentVideo, isPlaying, setIsPlaying, volume, setVolume } = useAppContext();
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [loadedMetadata, setLoadedMetadata] = useState(false);
  const [isSpeedUp, setIsSpeedUp] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const playerRef = useRef<HTMLDivElement>(null);

  // Handle play/pause
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(err => {
          console.error('Error playing video:', err);
          setIsPlaying(false);
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, currentVideo, setIsPlaying]);

  // Handle volume changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
      setIsMuted(volume === 0);
    }
  }, [volume]);

  // Reset video state when changing videos
  useEffect(() => {
    if (videoRef.current && currentVideo) {
      setCurrentTime(0);
      setDuration(0);
      setLoadedMetadata(false);
      setIsPlaying(false);
    }
  }, [currentVideo, setIsPlaying]);

  // Handle auto-hide controls
  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true);
      
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      
      if (isPlaying) {
        controlsTimeoutRef.current = setTimeout(() => {
          setShowControls(false);
        }, 3000);
      }
    };

    const handleMouseEnter = () => {
      setShowControls(true);
    };

    const handleMouseLeave = () => {
      if (isPlaying && !isFullscreen) {
        setShowControls(false);
      }
    };

    const videoElement = videoRef.current;
    const playerElement = playerRef.current;
    
    if (playerElement) {
      playerElement.addEventListener('mousemove', handleMouseMove);
      playerElement.addEventListener('mouseenter', handleMouseEnter);
      playerElement.addEventListener('mouseleave', handleMouseLeave);
    }
    
    if (videoElement) {
      videoElement.addEventListener('click', () => setIsPlaying(!isPlaying));
    }

    // Add event listener for fullscreen changes
    document.addEventListener('fullscreenchange', handleMouseMove);

    return () => {
      if (playerElement) {
        playerElement.removeEventListener('mousemove', handleMouseMove);
        playerElement.removeEventListener('mouseenter', handleMouseEnter);
        playerElement.removeEventListener('mouseleave', handleMouseLeave);
      }
      
      if (videoElement) {
        videoElement.removeEventListener('click', () => setIsPlaying(!isPlaying));
      }
      
      document.removeEventListener('fullscreenchange', handleMouseMove);
      
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [isPlaying, setIsPlaying, isFullscreen]);

  // Handle playback speed changes
  useEffect(() => {
    if (videoRef.current) {
      // When speed up is active, override the regular playback speed
      videoRef.current.playbackRate = isSpeedUp ? 2.0 : playbackSpeed;
    }
  }, [isSpeedUp, playbackSpeed]);

  // Handle speed control via mouse and keyboard
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !e.repeat) {
        e.preventDefault();
        setIsSpeedUp(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        setIsSpeedUp(false);
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (e.button === 0) { // Left mouse button
        setIsSpeedUp(true);
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (e.button === 0) { // Left mouse button
        setIsSpeedUp(false);
      }
    };

    const handleMouseLeave = () => {
      setIsSpeedUp(false);
    };

    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener('mousedown', handleMouseDown);
      videoElement.addEventListener('mouseup', handleMouseUp);
      videoElement.addEventListener('mouseleave', handleMouseLeave);
    }

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      if (videoElement) {
        videoElement.removeEventListener('mousedown', handleMouseDown);
        videoElement.removeEventListener('mouseup', handleMouseUp);
        videoElement.removeEventListener('mouseleave', handleMouseLeave);
      }
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Update progress bar and handle time update
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      
      if (progressRef.current) {
        const percentage = (videoRef.current.currentTime / videoRef.current.duration) * 100;
        progressRef.current.style.width = `${percentage}%`;
      }
    }
  };

  // Handle metadata loaded
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      setLoadedMetadata(true);
    }
  };

  // Handle seeking
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current && duration > 0) {
      const progressBar = e.currentTarget;
      const rect = progressBar.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = pos * duration;
    }
  };

  // Handle fullscreen
  const toggleFullscreen = () => {
    if (!videoRef.current) return;

    if (!document.fullscreenElement) {
      videoRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(err => {
        console.error('Error attempting to enable fullscreen:', err);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      }).catch(err => {
        console.error('Error attempting to exit fullscreen:', err);
      });
    }
  };

  // Toggle mute
  const toggleMute = () => {
    if (isMuted) {
      setVolume(0.5);
    } else {
      setVolume(0);
    }
    setIsMuted(!isMuted);
  };

  // Skip forward/backward
  const skip = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };
  
  // Apply playback speed change
  const changePlaybackSpeed = (speed: number) => {
    setPlaybackSpeed(speed);
    setShowSettings(false);
  };

  if (!currentVideo) {
    return (
      <div className="w-full aspect-video bg-gray-900 flex items-center justify-center text-white">
        <p className="text-xl">Select a video to play</p>
      </div>
    );
  }

  return (
    <div ref={playerRef} className="relative w-full group">
      <video
        ref={videoRef}
        className="w-full aspect-video bg-black"
        src={currentVideo.path}
        poster={currentVideo.thumbnail}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />
      
      {/* Video overlay - captures clicks */}
      <div className="absolute inset-0 cursor-pointer" onClick={() => setIsPlaying(!isPlaying)} />
      
      {/* Controls container */}
      <div 
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Progress bar */}
        <div 
          className="w-full h-1 bg-gray-600 cursor-pointer mb-4"
          onClick={handleProgressClick}
        >
          <div 
            ref={progressRef} 
            className="h-full bg-red-600 relative"
            style={{ width: loadedMetadata ? `${(currentTime / duration) * 100}%` : '0%' }}
          >
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-red-600 rounded-full"></div>
          </div>
        </div>
        
        {/* Controls row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Play/Pause button */}
            <button 
              className="text-white hover:text-red-500 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setIsPlaying(!isPlaying);
              }}
              title={isPlaying ? "Pause" : "Play"}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
            
            {/* Skip buttons */}
            <button 
              className="text-white hover:text-red-500 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                skip(-10);
              }}
              title="Rewind 10 seconds"
              aria-label="Rewind 10 seconds"
            >
              <SkipBack size={20} />
            </button>
            
            <button 
              className="text-white hover:text-red-500 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                skip(10);
              }}
              title="Forward 10 seconds"
              aria-label="Forward 10 seconds"
            >
              <SkipForward size={20} />
            </button>
            
            {/* Volume control */}
            <div className="flex items-center space-x-2">
              <button 
                className="text-white hover:text-red-500 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMute();
                }}
                title={isMuted ? "Unmute" : "Mute"}
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
              
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => {
                  e.stopPropagation();
                  setVolume(parseFloat(e.target.value));
                }}
                className="w-24 accent-red-500"
                onClick={(e) => e.stopPropagation()}
                title="Volume"
                aria-label="Volume control"
              />
            </div>
            
            {/* Time display */}
            <div className="text-white text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
            
            {/* Speed indicator */}
            {isSpeedUp && (
              <div className="bg-red-600 text-white text-xs px-2 py-1 rounded">
                2x
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Settings button */}
            <button 
              className="text-white hover:text-red-500 transition-colors relative"
              onClick={(e) => {
                e.stopPropagation();
                setShowSettings(!showSettings);
              }}
              title="Settings"
              aria-label="Settings"
            >
              <Settings size={20} />
              
              {/* Settings panel (positioned relative to the settings button) */}
              {showSettings && (
                <div 
                  className="absolute right-0 bottom-8 bg-black/90 p-3 rounded-md text-white whitespace-nowrap w-40"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h3 className="text-sm font-semibold mb-2">Playback Speed</h3>
                  <ul className="space-y-1">
                    {[0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map((speed) => (
                      <li key={speed}>
                        <button
                          className={`w-full text-left py-1 px-2 rounded hover:bg-gray-700 text-xs ${
                            playbackSpeed === speed && !isSpeedUp ? 'bg-red-600' : ''
                          }`}
                          onClick={() => changePlaybackSpeed(speed)}
                        >
                          {speed === 1 ? 'Normal' : `${speed}x`}
                          {playbackSpeed === speed && !isSpeedUp && <span className="ml-2">✓</span>}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </button>
            
            {/* Fullscreen button */}
            <button 
              className="text-white hover:text-red-500 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                toggleFullscreen();
              }}
              title="Toggle fullscreen"
              aria-label="Toggle fullscreen"
            >
              <Maximize size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;