import { useState } from "react";
import { RiFileTextLine, RiHome5Line, RiLogoutBoxLine, RiSaveLine, RiUserLine, RiSettingsLine, RiArrowRightSLine, RiCloseLine, RiMenuLine } from "@remixicon/react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { icon: RiHome5Line, label: "Home", path: "/dashboard", active: false },
    { icon: RiFileTextLine, label: "My Applications", path: "/applications", active: false },
    { icon: RiSaveLine, label: "Saved Jobs", path: "/saved", active: false },
    { icon: RiUserLine, label: "My Profile", path: "/profile", active: true },
    { icon: RiSettingsLine, label: "Settings", path: "/settings", active: false },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      console.log('Logging out...');
      navigate('/login');
    }
  };

  return (
    <>
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="cursor-pointer lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-900 rounded-lg text-white"
      >
        {isMobileMenuOpen ? <RiCloseLine size={24} /> : <RiMenuLine size={24} />}
      </button>
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-64 bg-gradient-to-b from-gray-900 to-gray-800 shadow-xl
        transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center space-x-4">
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face" 
              alt="Profile" 
              className="rounded-xl h-12 w-12 border-2 border-gray-600"
            />
            <div className="flex-1 min-w-0">
              <h2 className="text-white font-bold truncate">John Doe</h2>
              <p className="text-gray-400 text-sm truncate">Job Seeker</p>
            </div>
          </div>
        </div>
        <div className="p-4">
          <nav className="space-y-1">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleNavigation(item.path)}
                className={`cursor-pointer w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 group ${
                  item.active 
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                    : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <item.icon 
                    size={22} 
                    className={item.active ? "text-blue-400" : "text-gray-400 group-hover:text-white"} 
                  />
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.active && (
                  <RiArrowRightSLine size={18} className="text-blue-400" />
                )}
              </button>
            ))}
          </nav>
        </div>
        <div className="absolute bottom-6 left-0 right-0 px-4">
          <button 
            onClick={handleLogout}
            className="cursor-pointer w-full flex items-center space-x-3 p-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all duration-200 group"
          >
            <RiLogoutBoxLine size={22} className="group-hover:text-red-300" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;