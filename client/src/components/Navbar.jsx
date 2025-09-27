import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RiUser3Fill } from "@remixicon/react" 
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
  };

  return (
    <nav className="flex items-center justify-between bg-[#212E7C] px-8 py-2 text-white shadow-lg relative">
      <Link to="/">
        <img src={logo} alt="Logo" className="h-16 w-32 object-contain" />
      </Link>
      <div className="flex items-center space-x-8 font-medium text-md">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/jobs" className="hover:underline">Find Jobs</Link>
        <Link to="/job-alerts" className="hover:underline">Job Alerts</Link>
        <Link to="/candidates" className="hover:underline">Find Candidates</Link>
        <Link to="/career-advice" className="hover:underline">Career Advice</Link>
      </div>
      <div className="flex items-center space-x-3">
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
      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
