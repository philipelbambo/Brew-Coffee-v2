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

  // Active link background
  const navLinkStyle = ({ isActive }: { isActive: boolean }) => ({
    backgroundColor: isActive ? '#3A271F' : 'transparent', // darker shade of #4B352A
  });

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const element = e.currentTarget;
    if (!element.style.backgroundColor || element.style.backgroundColor === 'transparent') {
      element.style.backgroundColor = '#5C4033'; // lighter hover shade
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const element = e.currentTarget;
    if (element.style.backgroundColor !== '#3A271F') {
      element.style.backgroundColor = 'transparent';
    }
  };

  const handleSignOut = () => setShowModal(true);

  const confirmSignOut = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowModal(false);
      navigate("/login");
    }, 1500);
  };

  return (
    <>
      <div 
        className={`border-r transition-all duration-300 flex flex-col 
        ${isOpen ? 'w-60' : 'w-20'}`}
        style={{ backgroundColor: '#4B352A', borderColor: '#4B352A' }}
      >
        <div className="p-4 border-b flex items-center justify-center" style={{ borderColor: '#3A271F' }}>
          {/* Replaced Coffee Icon with image.png */}
          <img 
            src="/images/Gallery1/cup-of-coffee.png" 
            alt="Logo" 
            className="h-14 w-14 object-contain" 
          />
          {isOpen && (
            <div className="ml-2">
              <h1 className="text-xl font-bold text-black">Brew-Coffee</h1>
              <p className="text-xs text-black">Admin panel</p>
            </div>
          )}
        </div>
        
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-3 space-y-1">
            {/* Reusable links */}
            {[
              { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
              { to: "/menu", label: "Menu", icon: Coffee },
              { to: "/orders", label: "Orders", icon: ClipboardList },
              { to: "/reports", label: "Reports", icon: BarChart3 },
              { to: "/inventory", label: "Inventory", icon: Package },
              { to: "/products", label: "Products", icon: ShoppingBag },
              { to: "/settings", label: "Settings", icon: Settings },
              { to: "/about", label: "About", icon: Info },
            ].map(({ to, label, icon: Icon }) => (
              <NavLink 
                key={to}
                to={to}
                className={({ isActive }) => 
                  `flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    isActive ? 'text-white' : 'text-gray-300 hover:text-white'
                  }`
                }
                style={navLinkStyle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Icon className="mr-3 h-5 w-5" />
                {isOpen && <span>{label}</span>}
              </NavLink>
            ))}

            {/* Sign Out */}
            <button
              onClick={handleSignOut}
              className="flex items-center w-full px-3 py-2 text-sm font-medium rounded-md text-gray-300 hover:text-white"
              style={{ backgroundColor: 'transparent' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#5C4033')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
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
