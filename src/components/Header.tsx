import React, { useState, useRef, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { Search, Menu, Bell, User } from 'lucide-react';

const Header: React.FC = () => {
  const { setIsSidebarOpen, isSidebarOpen, searchQuery, setSearchQuery } = useAppContext();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside of search to unfocus
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-gray-900 text-white h-16 flex items-center justify-between px-4 z-10 shadow-lg">
      <div className="flex items-center">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="mr-4 p-2 rounded-full hover:bg-gray-800 transition-colors"
        >
          <Menu size={20} />
        </button>
        
        <div className="flex items-center">
          <div className="text-red-600 mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M4 2.69127C4 1.93067 4.81547 1.44851 5.48192 1.81506L22.4069 11.1238C23.0977 11.5037 23.0977 12.4963 22.4069 12.8762L5.48192 22.1849C4.81546 22.5515 4 22.0693 4 21.3087V2.69127Z" />
            </svg>
          </div>
          <h1 className="text-lg font-bold hidden sm:block">MediaHub</h1>
        </div>
      </div>
      
      <div 
        ref={searchRef}
        className={`flex items-center relative max-w-xl w-full mx-4 transition-all duration-200 ${
          isSearchFocused ? 'bg-gray-800 ring-1 ring-blue-400' : 'bg-gray-800'
        } rounded-full`}
      >
        <input
          type="text"
          placeholder="Search videos..."
          className="w-full py-2 px-4 bg-transparent outline-none text-white rounded-l-full"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          onFocus={() => setIsSearchFocused(true)}
        />
        <button className="p-2 mr-1 rounded-full hover:bg-gray-700 transition-colors">
          <Search size={20} className="text-gray-400" />
        </button>
      </div>
      
      <div className="flex items-center space-x-3">
        <button className="p-2 rounded-full hover:bg-gray-800 transition-colors hidden sm:flex">
          <Bell size={20} />
        </button>
        
        <button className="p-2 rounded-full hover:bg-gray-800 transition-colors">
          <User size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;