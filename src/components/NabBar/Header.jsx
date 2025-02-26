import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { logout } from "../../Redux/signUp/logIn/logInActions";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Get user from Redux auth state
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    setIsLoggedIn(!!user);
  }, [user]);

  // Extract properties (adjust structure as needed)
  const loggedInUserId = user?.user?.userName || "default-user";
  const userProfilePic = user?.profilePic || "/profile.png";
  // Assume user.user.roles is an array; take first role in lowercase
  const userType = user?.user?.roles?.[0]?.toLowerCase() || "guest";
  const displayName = user?.user?.userName || "User";

  const dispatch = useDispatch();

  // Logout function
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // Define navigation links using a Map
  const navLinksMap = new Map([
    [
      "customer",
      [
        { name: "About Us", path: "/about" },
        { name: "My Tickets", path: `/customers/tickets` },
        { name: "Notifications", path: "/customers/notification" },
        { name: "My Subscriptions", path: `/customers/payments` },
        { name: "Buy Subscription", path: `/customers/purchase` },
      ],
    ],
    [
      "employee",
      [{ name: "Colleagues", path: `/employees/colleague` }],
    ],
    [
      "manager",
      [{ name: "Colleagues", path: `/managers/colleague` }],
    ],
    [
      "admin",
      [{ name: "Dashboard", path: `/admins/employee` }],
    ],
    ["guest", []],
  ]);

  // Use a lookup object for logo link without if/else-if
  const logoLinks = {
    employee: "/employees",
    manager: "/managers",
    admin: "/admins",
    customer: "/customers",
  };
  const logoLink = logoLinks[userType] || "/";

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  // Navigate to profile using useNavigate instead of <Link>
  const handleViewProfile = () => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    navigate(`${logoLink}/profile`);
  };

  return (
    <nav className="bg-gradient-to-r from-[#00ccff] via-[#0077b6] to-[#003366]">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => navigate(logoLink)} className="flex items-center">
          <img src="/brillioLogo.png" alt="Logo" className="h-10" />
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-4 items-center">
          {navLinksMap.get(userType).map((link, index) => (
            <button
              key={index}
              onClick={() => navigate(link.path)}
              className="text-white font-bold relative px-3 whitespace-nowrap hover:border-b-2 hover:border-white"
            >
              {link.name}
            </button>
          ))}
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center gap-2 p-2 rounded hover:bg-white/20"
              >
                <img
                  src={userProfilePic}
                  alt="Profile"
                  className="w-9 h-9 rounded-full border-2 border-white object-cover"
                />
                <span className="text-white font-bold text-sm">
                  {displayName}
                </span>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg z-20">
                  <button
                    onClick={handleViewProfile}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => {
                      handleLogout();
                      setDropdownOpen(false);
                    }}
                    className="w-full text-left block px-4 py-2 text-sm text-red-600 font-bold hover:bg-red-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="text-white font-bold"
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button onClick={toggleMobileMenu} className="md:hidden text-white">
          <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path
                fillRule="evenodd"
                d="M18.3 5.71a1 1 0 00-1.42-1.42L12 9.17 7.12 4.29a1 1 0 00-1.42 1.42L10.83 12l-5.13 5.13a1 1 0 001.42 1.42L12 14.83l4.88 4.88a1 1 0 001.42-1.42L13.17 12l5.13-5.13z"
                clipRule="evenodd"
              />
            ) : (
              <path
                fillRule="evenodd"
                d="M4 5h16a1 1 0 010 2H4a1 1 0 110-2zm0 6h16a1 1 0 010 2H4a1 1 0 110-2zm0 6h16a1 1 0 010 2H4a1 1 0 110-2z"
                clipRule="evenodd"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gradient-to-r from-[#00ccff] via-[#0077b6] to-[#003366]">
          <div className="px-4 pt-2 pb-3 space-y-1">
            {navLinksMap.get(userType).map((link, index) => (
              <button
                key={index}
                onClick={() => {
                  navigate(link.path);
                  setMobileMenuOpen(false);
                }}
                className="block text-white font-bold py-2 hover:border-b-2 hover:border-white"
              >
                {link.name}
              </button>
            ))}
            {isLoggedIn ? (
              <div className="border-t border-white pt-2">
                <button
                  onClick={handleViewProfile}
                  className="block text-white font-bold py-2 hover:border-b-2 hover:border-white w-full text-left"
                >
                  View Profile
                </button>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="block text-red-600 font-bold py-2 hover:border-b-2 hover:border-red-600 w-full text-left"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  navigate("/login");
                  setMobileMenuOpen(false);
                }}
                className="block text-white font-bold py-2 hover:border-b-2 hover:border-white w-full text-left"
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
