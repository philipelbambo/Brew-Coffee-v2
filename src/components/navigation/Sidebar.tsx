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
    backgroundColor: isActive ? '#E5E5E5' : 'transparent', // light gray active background
    color: isActive ? 'black' : 'black',
  });

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
        style={{ backgroundColor: 'white', borderColor: '#E5E5E5' }}
      >
        <div className="p-4 border-b flex items-center justify-center" style={{ borderColor: '#E5E5E5' }}>
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
                className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100"
                style={navLinkStyle}
              >
                <Icon className="mr-3 h-5 w-5 text-black" />
                {isOpen && <span className="text-black">{label}</span>}
              </NavLink>
            ))}

            {/* Sign Out */}
            <button
              onClick={handleSignOut}
              className="flex items-center w-full px-3 py-2 text-sm font-medium rounded-md text-black hover:bg-gray-100"
              style={{ backgroundColor: 'transparent' }}
            >
              <LogOut className="mr-3 h-5 w-5 text-black" />
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
