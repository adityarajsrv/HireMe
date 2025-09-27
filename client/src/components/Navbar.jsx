import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RiUser3Fill, RiMenuLine, RiCloseLine } from "@remixicon/react" 
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const closeAllMenus = () => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="flex items-center justify-between bg-[#212E7C] px-4 sm:px-6 lg:px-8 py-2 text-white shadow-lg relative">
        {/* Logo */}
        <Link to="/" onClick={closeAllMenus}>
          <img src={logo} alt="Logo" className="h-12 w-28 sm:h-16 sm:w-32 object-contain" />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center space-x-8 font-medium text-md">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/jobs" className="hover:underline">Find Jobs</Link>
          <Link to="/job-alerts" className="hover:underline">Job Alerts</Link>
          <Link to="/candidates" className="hover:underline">Find Candidates</Link>
          <Link to="/career-advice" className="hover:underline">Career Advice</Link>
        </div>

        {/* Desktop Auth Section */}
        <div className="hidden lg:flex items-center space-x-3">
          {!isLoggedIn ? (
            <Link to="/login">
              <button className="cursor-pointer px-6 py-2 bg-white text-[#212E7C] font-medium rounded-full shadow-md hover:scale-105 transition">
                Login
              </button>
            </Link>
          ) : (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen((p) => !p)}
                className="cursor-pointer flex items-center bg-white/10 hover:bg-white/20 px-3 py-2 rounded-xl transition"
              >
                <RiUser3Fill size={22} className="mr-2" />
                <svg
                  className={`w-4 h-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl text-gray-700 z-50">
                  <Link
                    to="/profile"
                    onClick={() => setIsDropdownOpen(false)}
                    className="cursor-pointer block px-4 py-2 hover:bg-blue-50 hover:text-[#212E7C]"
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="cursor-pointer w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden items-center space-x-3">
          {!isLoggedIn ? (
            <Link to="/login" className="sm:hidden">
              <button className="cursor-pointer px-4 py-1.5 bg-white text-[#212E7C] font-medium rounded-full shadow-md text-sm">
                Login
              </button>
            </Link>
          ) : (
            <div className="relative sm:hidden">
              <button
                onClick={() => setIsDropdownOpen((p) => !p)}
                className="cursor-pointer flex items-center bg-white/10 hover:bg-white/20 p-2 rounded-xl transition"
              >
                <RiUser3Fill size={20} />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-xl text-gray-700 z-50">
                  <Link
                    to="/profile"
                    onClick={() => setIsDropdownOpen(false)}
                    className="cursor-pointer block px-4 py-2 hover:bg-blue-50 hover:text-[#212E7C] text-sm"
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="cursor-pointer w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 text-sm"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
          
          <button
            onClick={() => setIsMobileMenuOpen((p) => !p)}
            className="cursor-pointer p-2 bg-white/10 hover:bg-white/20 rounded-xl transition"
          >
            {isMobileMenuOpen ? <RiCloseLine size={24} /> : <RiMenuLine size={24} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 z-40 lg:hidden"
            onClick={closeAllMenus}
          />
        )}
      </nav>

      {/* Mobile Menu */}
      <div className={`lg:hidden bg-[#212E7C] text-white transition-all duration-300 ease-in-out overflow-hidden ${
        isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
      }`}>
        <div className="px-4 py-3 space-y-4 border-t border-white/20">
          <Link
            to="/"
            onClick={closeAllMenus}
            className="block py-2 hover:bg-white/10 rounded-lg px-3 transition"
          >
            Home
          </Link>
          <Link
            to="/jobs"
            onClick={closeAllMenus}
            className="block py-2 hover:bg-white/10 rounded-lg px-3 transition"
          >
            Find Jobs
          </Link>
          <Link
            to="/job-alerts"
            onClick={closeAllMenus}
            className="block py-2 hover:bg-white/10 rounded-lg px-3 transition"
          >
            Job Alerts
          </Link>
          <Link
            to="/candidates"
            onClick={closeAllMenus}
            className="block py-2 hover:bg-white/10 rounded-lg px-3 transition"
          >
            Find Candidates
          </Link>
          <Link
            to="/career-advice"
            onClick={closeAllMenus}
            className="block py-2 hover:bg-white/10 rounded-lg px-3 transition"
          >
            Career Advice
          </Link>
          
          {/* Mobile Auth Section for larger mobile screens */}
          <div className="pt-4 border-t border-white/20 lg:hidden">
            {!isLoggedIn ? (
              <Link to="/login" onClick={closeAllMenus}>
                <button className="w-full cursor-pointer px-6 py-2.5 bg-white text-[#212E7C] font-medium rounded-full shadow-md hover:scale-105 transition">
                  Login
                </button>
              </Link>
            ) : (
              <div className="space-y-2">
                <Link
                  to="/profile"
                  onClick={closeAllMenus}
                  className="block py-2.5 text-center bg-white/10 hover:bg-white/20 rounded-full transition"
                >
                  My Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full cursor-pointer py-2.5 text-red-300 hover:bg-red-500/10 rounded-full transition font-medium"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Dropdown Overlay */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;