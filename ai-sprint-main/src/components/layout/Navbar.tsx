import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HiSparkles } from "react-icons/hi";
import {
  FiUser,
  FiLogOut,
  FiMail,
  FiChevronDown,
} from "react-icons/fi";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { logout } from "../../features/auth/authSlice";

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setDropdownOpen(false);
    dispatch(logout());
    navigate("/login");
  };

  /** Generate initials avatar from username */
  const getInitials = (name?: string | null) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  const initials = getInitials(user?.username);

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-300/90">
      {/* Left Side: Logo & Brand */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 bg-[#7C5CFF] rounded-xl shadow-[0_4px_20px_rgba(124,92,255,0.25)]">
          <HiSparkles className="w-5 h-5 text-white" />
        </div>
        <div className="flex flex-col">
          <h1 className="text-xl font-bold leading-none text-gray-900 tracking-tight">
            AI-Sprint
          </h1>
          <span className="text-xs font-medium text-gray-500 mt-1">
            Project Management
          </span>
        </div>
      </div>

      {/* Right Side: Profile Dropdown & Logout */}
      {user ? (
        <div className="flex items-center gap-4">
          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors focus:outline-none"
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
            >
              {/* Avatar Circle */}
              <div className="w-8 h-8 rounded-full bg-linear-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white text-xs font-bold select-none shadow-sm">
                {initials}
              </div>
              <span className="text-sm font-medium hidden sm:block">
                {user?.username ?? "Profile"}
              </span>
              <FiChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Dropdown Panel */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-gray-100 z-50 overflow-hidden animate-fadeIn">
                {/* Account Details Header */}
                <div className="px-4 py-4 bg-linear-to-br from-purple-50 to-white border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    {/* Large Avatar */}
                    <div className="w-12 h-12 rounded-full bg-linear-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white text-sm font-bold shadow-md shrink-0">
                      {initials}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {user?.username ?? "—"}
                      </p>
                      <p className="text-xs text-gray-500 truncate flex items-center gap-1 mt-0.5">
                        <FiMail className="w-3 h-3 shrink-0" />
                        {user?.email ?? "—"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="py-1">
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate("/profile");
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors"
                  >
                    <FiUser className="w-4 h-4 text-gray-400" />
                    My Profile
                  </button>

                  {/* <button
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate("/settings");
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors"
                  >
                    <FiSettings className="w-4 h-4 text-gray-400" />
                    Settings
                  </button> */}

                  {/* <button
                    onClick={() => {
                      setDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors"
                  >
                    <FiShield className="w-4 h-4 text-gray-400" />
                    Security
                  </button> */}
                </div>

                {/* Divider */}
                <div className="border-t border-gray-100" />

                {/* Logout */}
                <div className="py-1">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <FiLogOut className="w-4 h-4" />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Vertical Divider */}
          <div className="w-px h-5 bg-gray-200" />

          {/* Quick Logout Icon */}
          <button
            onClick={handleLogout}
            className="text-gray-400 transition-colors hover:text-red-500"
            aria-label="Logout"
            title="Sign out"
          >
            <FiLogOut className="w-5 h-5" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="flex items-center px-4 py-2.5 text-sm text-gray-900 font-semibold hover:bg-purple-50 hover:text-purple-700 transition-colors cursor-pointer"
        >
          Login
        </button>
      )}
    </header>
  );
};

export default Navbar;
