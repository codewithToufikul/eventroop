import React, { useState, useEffect } from "react";
import { Menu, X, Home, Calendar, Plus, User, LogOut } from "lucide-react";
import { useAlert } from "./AlertContext";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Loading from "./Loading";

const mockUser = {
  name: "Toufikul Islam",
  photoURL: "https://randomuser.me/api/portraits/men/75.jpg",
  isLoggedIn: true,
};

function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeRoute, setActiveRoute] = useState("/");
  const { showAlert } = useAlert();
      const { user, userLoading, logout } = useAuth();

  useEffect(() => {
    const path = window.location.pathname;
    setActiveRoute(path);
  }, []);
    if (userLoading) {
    return (
      <Loading/>
    );
  }

  const handleLogout = () => {
    showAlert({
      message: "Are you sure you want to logout?",
      onConfirm: () => {
        logout();
        setDropdownOpen(false);
        setMobileMenuOpen(false);
      },
      onCancel: () => {
        console.log("logout cancelled");
      },
    });
  };

  const handleRouteClick = (route) => {
    setActiveRoute(route);
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  };

  const navigationItems = [
    { path: "/", label: "Home", icon: Home, showAlways: true },
    { path: "/events", label: "Events", icon: Calendar, showAlways: true },
    { path: "/add-event", label: "Add Event", icon: Plus, showAlways: false },
    { path: "/my-events", label: "My Events", icon: User, showAlways: false },
  ];

  const NavLink = ({ item, isMobile = false }) => {
    const isActive = activeRoute === item.path;
    const Icon = item.icon;

    if (!item.showAlways && !user) return null;

    return (
      <a
        href={item.path}
        onClick={(e) => {
          e.preventDefault();
          handleRouteClick(item.path);
        }}
        className={`
          ${
            isMobile
              ? `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-teal-600 text-white shadow-lg"
                    : "text-gray-700 hover:bg-teal-50 hover:text-teal-700"
                }`
              : `relative flex items-center space-x-1 px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-teal-600 text-white shadow-lg"
                    : "text-teal-100 hover:text-white hover:bg-teal-600"
                }`
          }
        `}
      >
        <Icon size={18} />
        <span>{item.label}</span>
        {!isMobile && isActive && (
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"></div>
        )}
      </a>
    );
  };

  return (
    <nav className="bg-gradient-to-r from-teal-700 to-teal-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3 cursor-pointer group">
            <div className="relative">
              <img
                src="https://cdn-icons-png.flaticon.com/512/190/190411.png"
                alt="Logo"
                className="w-9 h-9 transition-transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-white rounded-full opacity-0 group-hover:opacity-10 transition-opacity"></div>
            </div>
            <span className="font-bold text-xl select-none tracking-wide">
              Event<span className="text-teal-200">roop</span>
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-2">
            {navigationItems.map((item) => (
              <NavLink key={item.path} item={item} />
            ))}
          </div>

          <div className="hidden md:flex items-center">
            {!user ? (
              <Link
                to={"/login"}
                className="bg-white text-teal-700 font-semibold px-6 py-2 rounded-lg hover:bg-teal-50 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Sign In
              </Link>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 bg-teal-600 hover:bg-teal-500 px-3 py-2 rounded-lg transition-all duration-200 border border-teal-500"
                >
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="w-8 h-8 rounded-full border-2 border-white"
                  />
                  <span className="font-medium text-sm">
                    {user.name.split(" ")[0]}
                  </span>
                  <div
                    className={`transform transition-transform ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl py-2 z-50 border border-gray-200">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="font-semibold text-gray-800">{user.name}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-2 px-4 py-3 text-left text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center space-x-3">
            {user && (
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-8 h-8 rounded-full border-2 border-white"
              />
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-teal-600 transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-teal-200">
          <div className="px-4 py-4 space-y-2">
            {navigationItems.map((item) => (
              <NavLink key={item.path} item={item} isMobile />
            ))}

            <div className="pt-3 border-t border-gray-200">
              {!user ? (
                <Link
                  to={"/login"}
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center space-x-2 bg-teal-700 text-white font-semibold px-4 py-3 rounded-lg hover:bg-teal-600 transition-colors"
                >
                  <span>Sign In</span>
                </Link>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center space-x-3 px-4 py-3 bg-gray-50 rounded-lg">
                    <img
                      src={user.photoURL}
                      alt="Profile"
                      className="w-10 h-10 rounded-full border-2 border-teal-700"
                    />
                    <div>
                      <p className="font-semibold text-gray-800">{user.name}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
