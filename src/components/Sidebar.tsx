import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Home, Folder, Clock, Eye, Bookmark, History, Settings, ChevronLeft } from 'lucide-react';

const Sidebar: React.FC = () => {
  const { isSidebarOpen, setIsSidebarOpen, categories } = useAppContext();

  const sidebarItems = [
    { icon: <Home size={20} />, label: 'Home', id: '1' },
    { icon: <Clock size={20} />, label: 'Recently Added', id: '6' },
    { icon: <Eye size={20} />, label: 'Most Viewed', id: '7' },
    { icon: <Bookmark size={20} />, label: 'Favorites', id: 'favorites' },
    { icon: <History size={20} />, label: 'History', id: 'history' },
  ];

  // Filter out categories that are already in sidebarItems
  const categoryItems = categories
    .filter(category => !['All', 'Recently Added', 'Most Viewed'].includes(category.name))
    .map(category => ({
      icon: <Folder size={20} />,
      label: category.name,
      id: category.id
    }));

  return (
    <div 
      className={`bg-gray-900 text-white h-full overflow-y-auto transition-all duration-300 ${
        isSidebarOpen ? 'w-64' : 'w-20'
      } flex flex-col`}
    >
      <div className="p-4 flex items-center justify-between border-b border-gray-800">
        <div className="flex items-center">
          <div className="text-red-600 mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
              <path d="M4 2.69127C4 1.93067 4.81547 1.44851 5.48192 1.81506L22.4069 11.1238C23.0977 11.5037 23.0977 12.4963 22.4069 12.8762L5.48192 22.1849C4.81546 22.5515 4 22.0693 4 21.3087V2.69127Z" />
            </svg>
          </div>
          {isSidebarOpen && <h1 className="text-xl font-bold">MediaHub</h1>}
        </div>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-1 rounded-full hover:bg-gray-800 transition-colors"
        >
          <ChevronLeft size={20} className={`transition-transform ${!isSidebarOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      <div className="flex-1">
        <nav className="py-2">
          {sidebarItems.map((item) => (
            <a
              key={item.id}
              href="#"
              className="flex items-center px-4 py-3 hover:bg-gray-800 transition-colors"
              onClick={(e) => e.preventDefault()}
            >
              <span className="text-gray-400">{item.icon}</span>
              {isSidebarOpen && <span className="ml-4">{item.label}</span>}
            </a>
          ))}
        </nav>

        {isSidebarOpen && (
          <div className="px-4 py-2 text-gray-500 text-sm font-medium">CATEGORIES</div>
        )}

        <nav className="py-2">
          {categoryItems.map((item) => (
            <a
              key={item.id}
              href="#"
              className="flex items-center px-4 py-3 hover:bg-gray-800 transition-colors"
              onClick={(e) => e.preventDefault()}
            >
              <span className="text-gray-400">{item.icon}</span>
              {isSidebarOpen && <span className="ml-4">{item.label}</span>}
            </a>
          ))}
        </nav>
      </div>

      <div className="mt-auto border-t border-gray-800">
        <a
          href="#"
          className="flex items-center px-4 py-3 hover:bg-gray-800 transition-colors"
          onClick={(e) => e.preventDefault()}
        >
          <span className="text-gray-400"><Settings size={20} /></span>
          {isSidebarOpen && <span className="ml-4">Settings</span>}
        </a>
      </div>
    </div>
  );
};

export default Sidebar;