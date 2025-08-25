import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Coffee, 
  LayoutDashboard, 
  ClipboardList, 
  BarChart3, 
  Package, 
  Settings, 
  Info,
  ShoppingBag
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const navLinkStyle = ({ isActive }: { isActive: boolean }) => ({
    backgroundColor: isActive ? '#6B6A1F' : 'transparent',
  });

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const element = e.currentTarget;
    if (element.style.backgroundColor === 'transparent' || !element.style.backgroundColor) {
      element.style.backgroundColor = '#5A591B';
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const element = e.currentTarget;
    if (element.style.backgroundColor !== '#6B6A1F') {
      element.style.backgroundColor = 'transparent';
    }
  };

  return (
    <div 
      className={`border-r transition-all duration-300 flex flex-col 
      ${isOpen ? 'w-60' : 'w-20'}`}
      style={{ backgroundColor: '#4C4B16', borderColor: '#6B6A1F' }}
    >
      <div className="p-4 border-b flex items-center justify-center" style={{ borderColor: '#6B6A1F' }}>
        <Coffee className="h-8 w-8 text-yellow-400" />
        {isOpen && (
          <div className="ml-2">
            <h1 className="text-xl font-bold text-yellow-200">Brew-Coffee</h1>
            <p className="text-xs text-gray-400">Admin panel</p>
          </div>
        )}
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-3 space-y-1">
          <NavLink 
            to="/dashboard" 
            className={({ isActive }) => 
              `flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                isActive 
                  ? 'text-white' 
                  : 'text-gray-300 hover:text-white'
              }`
            }
            style={navLinkStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            end
          >
            <LayoutDashboard className="mr-3 h-5 w-5" />
            {isOpen && <span>Dashboard</span>}
          </NavLink>
          
          <NavLink 
            to="/menu" 
            className={({ isActive }) => 
              `flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                isActive 
                  ? 'text-white' 
                  : 'text-gray-300 hover:text-white'
              }`
            }
            style={navLinkStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Coffee className="mr-3 h-5 w-5" />
            {isOpen && <span>Menu</span>}
          </NavLink>
          
          <NavLink 
            to="/orders" 
            className={({ isActive }) => 
              `flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                isActive 
                  ? 'text-white' 
                  : 'text-gray-300 hover:text-white'
              }`
            }
            style={navLinkStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <ClipboardList className="mr-3 h-5 w-5" />
            {isOpen && <span>Orders</span>}
          </NavLink>

          
          <NavLink 
            to="/reports" 
            className={({ isActive }) => 
              `flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                isActive 
                  ? 'text-white' 
                  : 'text-gray-300 hover:text-white'
              }`
            }
            style={navLinkStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <BarChart3 className="mr-3 h-5 w-5" />
            {isOpen && <span>Reports</span>}
          </NavLink>
          
          <NavLink 
            to="/inventory" 
            className={({ isActive }) => 
              `flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                isActive 
                  ? 'text-white' 
                  : 'text-gray-300 hover:text-white'
              }`
            }
            style={navLinkStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Package className="mr-3 h-5 w-5" />
            {isOpen && <span>Inventory</span>}
          </NavLink>
          
          <NavLink 
            to="/products" 
            className={({ isActive }) => 
              `flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                isActive 
                  ? 'text-white' 
                  : 'text-gray-300 hover:text-white'
              }`
            }
            style={navLinkStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <ShoppingBag className="mr-3 h-5 w-5" />
            {isOpen && <span>Products</span>}
          </NavLink>
          
          <NavLink 
            to="/settings" 
            className={({ isActive }) => 
              `flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                isActive 
                  ? 'text-white' 
                  : 'text-gray-300 hover:text-white'
              }`
            }
            style={navLinkStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Settings className="mr-3 h-5 w-5" />
            {isOpen && <span>Settings</span>}
          </NavLink>
          
          <NavLink 
            to="/about" 
            className={({ isActive }) => 
              `flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                isActive 
                  ? 'text-white' 
                  : 'text-gray-300 hover:text-white'
              }`
            }
            style={navLinkStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Info className="mr-3 h-5 w-5" />
            {isOpen && <span>About</span>}
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;