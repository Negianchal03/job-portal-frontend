import React, { useEffect, useState } from "react";
import { User } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Header() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [open, setOpen] = useState(false);

  // 🔥 Load + Listen for updates
  useEffect(() => {
    const loadData = () => {
      const storedUser = localStorage.getItem("user");
      const savedImage = localStorage.getItem("profileImage");

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }

      setProfileImage(savedImage);
    };

    loadData();

    window.addEventListener("profileUpdated", loadData);
    return () => {
      window.removeEventListener("profileUpdated", loadData);
    };
  }, []);

  // 🔥 ROLE BASED PATH (MAIN FIX)
  const role = user?.role || "employee";

  const basePath =
    role === "employer"
      ? "/employer-dashboard"
      : "/employee-dashboard";

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("profileImage");

    window.dispatchEvent(new Event("profileUpdated"));
    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between px-8 py-4 shadow-lg bg-gradient-to-r from-[#1b0022] via-[#3b0764] to-[#1e0035] text-white">
      
      {/* LEFT - Logo */}
      <div className="flex items-center space-x-3">
        <img src={logo} alt="Logo" className="h-20 w-30" />
        <h1 className="text-purple-400 text-2xl font-bold">
          HireNest
        </h1>
      </div>

      {/* ✅ CENTER - Navigation (FIXED) */}
      <nav className="flex space-x-12 text-white font-semibold text-lg">
        <Link to={basePath} className="hover:text-purple-300">Home</Link>
        <Link to={`${basePath}/about`} className="hover:text-purple-300">About</Link>
        <Link to={`${basePath}/contact`} className="hover:text-purple-300">Contact</Link>
        <Link to={`${basePath}/pricing`} className="hover:text-purple-300">Pricing</Link>
      </nav>

      {/* RIGHT - User */}
      <div className="relative">
        <div
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          {/* Profile Image */}
          <div className="w-10 h-10 rounded-full overflow-hidden bg-purple-600 flex items-center justify-center">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <User size={20} />
            )}
          </div>

          {/* User Info */}
          {user && (
            <div className="flex flex-col text-sm">
              
              <div className="flex items-center gap-2">
                <span className="font-semibold">
                  {user?.firstName || user?.firstname || "User"}
                </span>
                <span className="font-semibold">
                  {user?.lastName || user?.lastname || ""}
                </span>
              </div>

              <span className="text-gray-300 text-xs">
                {user?.email}
              </span>

            </div>
          )}
        </div>

        {/* 🔥 DROPDOWN */}
        {open && (
          <div className="absolute right-0 mt-3 w-44 bg-zinc-900 border border-purple-700 rounded-lg shadow-lg overflow-hidden z-50">
            
            {/* ✅ Edit Profile (FIXED) */}
            <button
              onClick={() => {
                navigate(`${basePath}/settings`);
                setOpen(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-purple-600 transition"
            >
              Edit Profile
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 hover:bg-red-600 transition"
            >
              Logout
            </button>

          </div>
        )}
      </div>
    </header>
  );
}