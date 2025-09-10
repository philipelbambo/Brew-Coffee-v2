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

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center px-3 py-2 rounded-lg transition-colors duration-200
     ${isActive 
        ? 'bg-blue-50 text-blue-900 font-semibold' 
        : 'text-blue-900 hover:bg-blue-50'}
     ${isOpen ? 'text-[15px]' : 'justify-center'}`;

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
        className={`border-r transition-all duration-300 flex flex-col justify-between 
        ${isOpen ? 'w-64' : 'w-20'} bg-white border-gray-200`}
      >
        {/* Top Section */}
        <div>
          <div className="p-4 border-b border-gray-200 flex items-center justify-center">
            <img 
              src="/images/Gallery2/coffee.png" 
              alt="Logo" 
              className="h-14 w-14 object-contain" 
            />
            {isOpen && (
              <div className="ml-3">
                <h1 className="text-2xl font-extrabold text-blue-900 tracking-tight">Brew-Coffee</h1>
                <p className="text-sm text-blue-700 font-medium">Admin Panel</p>
              </div>
            )}
          </div>

          {/* Navigation */}
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
                <NavLink key={to} to={to} className={navLinkClass}>
                  <Icon className="mr-3 h-5 w-5 text-blue-900" />
                  {isOpen && <span className="font-medium">{label}</span>}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom Section (Sign Out) */}
        <div className="p-3 border-t border-gray-200">
          <button
            onClick={handleSignOut}
            className="flex items-center w-full px-3 py-2 rounded-lg text-blue-900 hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
          >
            <LogOut className="mr-3 h-5 w-5" />
            {isOpen && <span className="font-medium">Sign Out</span>}
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg p-6 w-80 text-center">
            {!loading ? (
              <>
                <p className="text-lg font-semibold mb-4 text-blue-900">Are you sure you want to sign out?</p>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={confirmSignOut}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-gray-200 text-blue-900 rounded-lg hover:bg-gray-300 transition"
                  >
                    No
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-900 rounded-full animate-spin"></div>
                <p className="mt-3 text-sm font-medium text-blue-900">Signing out...</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
