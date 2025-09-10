import React from 'react';
import { Menu, Bell, User } from 'lucide-react';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
      {/* Left: Sidebar Toggle */}
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar} 
          className="text-blue-900 hover:text-blue-700 focus:outline-none transition-colors"
        >
          <Menu size={24} />
        </button>
      </div>
      
      {/* Right: Notifications + User */}
      <div className="flex items-center space-x-4">
        {/* Notification Bell */}
        <button className="text-blue-900 hover:text-blue-700 focus:outline-none relative transition-colors">
          <Bell size={20} />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>
        
        {/* User Info */}
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-blue-900 flex items-center justify-center text-white">
            <User size={18} />
          </div>
          <div className="ml-2">
            <p className="text-sm font-medium text-blue-900">User</p>
            <p className="text-xs text-blue-700">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
