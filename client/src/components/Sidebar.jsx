/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import {
  RiFileTextLine,
  RiHome5Line,
  RiLogoutBoxLine,
  RiSaveLine,
  RiUserLine,
  RiSettingsLine,
  RiArrowRightSLine,
  RiCloseLine,
  RiMenuLine,
  RiUser3Line,
} from "@remixicon/react";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login", { state: { from: location.pathname } });
          return;
        }

        const savedUser = localStorage.getItem("userData");
        if (savedUser) {
          const userData = JSON.parse(savedUser);
          setUser({
            ...userData,
            firstName: userData.firstName || "",
            lastName: userData.lastName || "",
            role: userData.role || "Job Seeker",
            email: userData.email || "",
            phone: userData.phone || "",
            country: userData.country || "",
            city: userData.city || "",
            profileImage: userData.profileImage || null,
            createdAt: userData.createdAt || new Date().toISOString(),
          });
          setImageError(false);
        } else {
          setImageLoading(true);
          const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
          const response = await fetch(`${baseUrl}/api/auth/profile`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          const text = await response.text();
          let userData;
          try {
            userData = text ? JSON.parse(text) : {};
          } catch (err) {
            throw new Error("Invalid server response: Not valid JSON");
          }

          if (!response.ok) {
            throw new Error(userData.msg || `HTTP error! Status: ${response.status}`);
          }

          const normalizedUser = {
            ...userData,
            firstName: userData.firstName || "",
            lastName: userData.lastName || "",
            role: userData.role || "Job Seeker",
            email: userData.email || "",
            phone: userData.phone || "",
            country: userData.country || "",
            city: userData.city || "",
            profileImage: userData.profileImage || null,
            createdAt: userData.createdAt || new Date().toISOString(),
          };
          setUser(normalizedUser);
          setImageError(false);
          localStorage.setItem("userData", JSON.stringify(normalizedUser));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
        navigate("/login", { state: { from: location.pathname } });
      } finally {
        setImageLoading(false);
      }
    };

    fetchUserData();

    const handleProfileUpdate = (event) => {
      if (event.detail && event.detail.user) {
        const normalizedUser = {
          ...event.detail.user,
          firstName: event.detail.user.firstName || "",
          lastName: event.detail.user.lastName || "",
          role: event.detail.user.role || "Job Seeker",
          email: event.detail.user.email || "",
          phone: event.detail.user.phone || "",
          country: event.detail.user.country || "",
          city: event.detail.user.city || "",
          profileImage: event.detail.user.profileImage || null,
          createdAt: event.detail.user.createdAt || new Date().toISOString(),
        };
        setUser(normalizedUser);
        setImageError(false);
        setImageLoading(false);
        localStorage.setItem("userData", JSON.stringify(normalizedUser));
      }
    };

    const handleImageUploadStart = () => {
      setImageLoading(true);
      setImageError(false);
    };

    const handleImageUploadComplete = (event) => {
      if (event.detail && event.detail.user) {
        const normalizedUser = {
          ...event.detail.user,
          firstName: event.detail.user.firstName || "",
          lastName: event.detail.user.lastName || "",
          role: event.detail.user.role || "Job Seeker",
          email: event.detail.user.email || "",
          phone: event.detail.user.phone || "",
          country: event.detail.user.country || "",
          city: event.detail.user.city || "",
          profileImage: event.detail.user.profileImage || null,
          createdAt: event.detail.user.createdAt || new Date().toISOString(),
        };
        setUser(normalizedUser);
        setImageError(false);
        localStorage.setItem("userData", JSON.stringify(normalizedUser));
      }
      setImageLoading(false);
    };

    const handleImageUploadError = () => {
      setImageError(true);
      setImageLoading(false);
    };

    window.addEventListener("profileUpdated", handleProfileUpdate);
    window.addEventListener("profileImageUploadStart", handleImageUploadStart);
    window.addEventListener("profileImageUploadComplete", handleImageUploadComplete);
    window.addEventListener("profileImageUploadError", handleImageUploadError);

    return () => {
      window.removeEventListener("profileUpdated", handleProfileUpdate);
      window.removeEventListener("profileImageUploadStart", handleImageUploadStart);
      window.removeEventListener("profileImageUploadComplete", handleImageUploadComplete);
      window.removeEventListener("profileImageUploadError", handleImageUploadError);
    };
  }, [navigate, location.pathname]);

  const menuItems = [
    { icon: RiHome5Line, label: "Home", path: "/" },
    { icon: RiFileTextLine, label: "My Applications", path: "/applications" },
    { icon: RiSaveLine, label: "Saved Jobs", path: "/saved" },
    { icon: RiUserLine, label: "My Profile", path: "/profile" },
    { icon: RiSettingsLine, label: "Settings", path: "/settings" },
  ];

  const isActivePath = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
      navigate("/login", { state: { from: location.pathname } });
    }
  };

  const handleProfileImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleProfileImageLoad = () => {
    setImageError(false);
    setImageLoading(false);
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
      <div
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-64 bg-gradient-to-b from-gray-900 to-gray-800 shadow-xl
          transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center space-x-4">
            <div className="relative">
              {user?.profileImage && !imageError ? (
                <div className="relative">
                  <img
                    src={user.profileImage}
                    alt="Profile"
                    className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-md mx-auto"
                    onError={handleProfileImageError}
                    onLoad={handleProfileImageLoad}
                  />
                  {imageLoading && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-2xl flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="relative w-24 h-24 rounded-2xl border-4 border-white shadow-md mx-auto bg-gray-100 flex items-center justify-center">
                  <RiUser3Line size={40} className="text-gray-400" />
                  {imageLoading && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-2xl flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-white font-bold truncate">
                {user
                  ? `${user.firstName || ""} ${user.lastName || ""}`.trim() || "User"
                  : "Loading..."}
              </h2>
              <p className="text-gray-400 text-sm truncate">{user?.role || "Job Seeker"}</p>
              {imageLoading && (
                <p className="text-gray-400 text-xs mt-1">Updating image...</p>
              )}
            </div>
          </div>
        </div>
        <div className="p-4">
          <nav className="space-y-1">
            {menuItems.map((item, index) => {
              const isActive = isActivePath(item.path);
              return (
                <button
                  key={index}
                  onClick={() => handleNavigation(item.path)}
                  className={`cursor-pointer w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 group ${
                    isActive
                      ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                      : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon
                      size={22}
                      className={
                        isActive
                          ? "text-blue-400"
                          : "text-gray-400 group-hover:text-white"
                      }
                    />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {isActive && (
                    <RiArrowRightSLine size={18} className="text-blue-400" />
                  )}
                </button>
              );
            })}
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