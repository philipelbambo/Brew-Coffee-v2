import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Coffee, 
  LayoutDashboard, 
  ClipboardList, 
  BarChart3, 
  Package, 
  Settings, 
  Info,
  ShoppingBag,
  LogOut
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

  const handleSignOut = () => {
    setShowModal(true); // Show confirmation modal
  };

  const confirmSignOut = () => {
    setLoading(true); // Show spinner
    setTimeout(() => {
      setLoading(false);
      setShowModal(false);
      // Clear session/localStorage if needed
      // localStorage.removeItem("token");
      navigate("/login"); // Redirect to login (or homepage)
    }, 1500); // 1.5 seconds delay before redirect
  };

  return (
    <>
      <div 
        className={`border-r transition-all duration-300 flex flex-col 
        ${isOpen ? 'w-60' : 'w-20'}`}
        style={{ backgroundColor: '#4C4B16', borderColor: '#282D4F' }}

      >
        <div className="p-4 border-b flex items-center justify-center" style={{ borderColor: '#6B6A1F' }}>
          <Coffee className="h-14 w-14 text-yellow-200" />
          {isOpen && (
            <div className="ml-2">
              <h1 className="text-xl font-bold text-yellow-200">Brew-Coffee</h1>
              <p className="text-xs text-white">Admin panel</p>
            </div>
          )}
        </div>
        
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-3 space-y-1">
            {/* Dashboard */}
            <NavLink 
              to="/dashboard" 
              className={({ isActive }) => 
                `flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  isActive ? 'text-white' : 'text-gray-300 hover:text-white'
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
            
            {/* Menu */}
            <NavLink 
              to="/menu" 
              className={({ isActive }) => 
                `flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  isActive ? 'text-white' : 'text-gray-300 hover:text-white'
                }`
              }
              style={navLinkStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Coffee className="mr-3 h-5 w-5" />
              {isOpen && <span>Menu</span>}
            </NavLink>
            
            {/* Orders */}
            <NavLink 
              to="/orders" 
              className={({ isActive }) => 
                `flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  isActive ? 'text-white' : 'text-gray-300 hover:text-white'
                }`
              }
              style={navLinkStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <ClipboardList className="mr-3 h-5 w-5" />
              {isOpen && <span>Orders</span>}
            </NavLink>

            {/* Reports */}
            <NavLink 
              to="/reports" 
              className={({ isActive }) => 
                `flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  isActive ? 'text-white' : 'text-gray-300 hover:text-white'
                }`
              }
              style={navLinkStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <BarChart3 className="mr-3 h-5 w-5" />
              {isOpen && <span>Reports</span>}
            </NavLink>
            
            {/* Inventory */}
            <NavLink 
              to="/inventory" 
              className={({ isActive }) => 
                `flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  isActive ? 'text-white' : 'text-gray-300 hover:text-white'
                }`
              }
              style={navLinkStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Package className="mr-3 h-5 w-5" />
              {isOpen && <span>Inventory</span>}
            </NavLink>
            
            {/* Products */}
            <NavLink 
              to="/products" 
              className={({ isActive }) => 
                `flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  isActive ? 'text-white' : 'text-gray-300 hover:text-white'
                }`
              }
              style={navLinkStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <ShoppingBag className="mr-3 h-5 w-5" />
              {isOpen && <span>Products</span>}
            </NavLink>
            
            {/* Settings */}
            <NavLink 
              to="/settings" 
              className={({ isActive }) => 
                `flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  isActive ? 'text-white' : 'text-gray-300 hover:text-white'
                }`
              }
              style={navLinkStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Settings className="mr-3 h-5 w-5" />
              {isOpen && <span>Settings</span>}
            </NavLink>
            
            {/* About */}
            <NavLink 
              to="/about" 
              className={({ isActive }) => 
                `flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  isActive ? 'text-white' : 'text-gray-300 hover:text-white'
                }`
              }
              style={navLinkStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Info className="mr-3 h-5 w-5" />
              {isOpen && <span>About</span>}
            </NavLink>

            {/* Sign Out */}
            <button
              onClick={handleSignOut}
              className="flex items-center w-full px-3 py-2 text-sm font-medium rounded-md text-gray-300 hover:text-white hover:bg-[#5A591B]"
            >
              <LogOut className="mr-3 h-5 w-5" />
              {isOpen && <span>Sign Out</span>}
            </button>
          </nav>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
            {!loading ? (
              <>
                <p className="text-lg font-semibold mb-4">Are you sure you want to sign out?</p>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={confirmSignOut}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                  >
                    No
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 border-4 border-gray-300 border-t-red-600 rounded-full animate-spin"></div>
                <p className="mt-3 text-sm text-gray-600">Signing out...</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
