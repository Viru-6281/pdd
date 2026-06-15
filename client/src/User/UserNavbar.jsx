import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const UserNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/userLogin");
  };

  const navLinkClass = (path) =>
    `px-4 py-2 rounded-xl transition-all duration-300 ${
      location.pathname === path
        ? "bg-emerald-500 text-white"
        : "text-slate-300 hover:bg-slate-800 hover:text-white"
    }`;

  return (
    <nav className="bg-slate-950 border-b border-slate-800 sticky top-0 z-50 backdrop-blur-xl">

      <div className="max-w-7xl mx-auto px-6">

        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link to="/userHome" className="flex items-center">

            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-emerald-500/30">
              P
            </div>

            <div className="ml-3">

              <h1 className="text-white font-bold text-xl">
                Smart Parking
              </h1>

              <p className="text-slate-400 text-xs">
                Online Reservation System
              </p>

            </div>

          </Link>

          {/* Navigation */}
          <div className="hidden lg:flex items-center gap-2">

            <Link
              to="/user/view-map"
              className={navLinkClass("/user/view-map")}
            >
              🗺️ Map
            </Link>

            <Link
              to="/user/viewBookings"
              className={navLinkClass("/user/viewBookings")}
            >
              📋 Bookings
            </Link>

            <Link
              to="/user/give-rating"
              className={navLinkClass("/user/give-rating")}
            >
              ⭐ Ratings
            </Link>

            <Link
              to="/user/add-vehicle"
              className={navLinkClass("/user/add-vehicle")}
            >
              🚗 Vehicle
            </Link>

            <Link
              to="/user/viewProfile"
              className={navLinkClass("/user/viewProfile")}
            >
              👤 Profile
            </Link>

          </div>

          {/* User Section */}
          <div className="flex items-center gap-4">

            <div className="hidden md:flex items-center">

              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
                {user?.name
                  ? user.name.charAt(0).toUpperCase()
                  : "U"}
              </div>

              <div className="ml-3">
                <p className="text-white text-sm font-medium">
                  {user?.name || "User"}
                </p>

                <p className="text-slate-400 text-xs">
                  Customer
                </p>
              </div>

            </div>

            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white px-4 py-2 rounded-xl font-medium transition-all duration-300"
            >
              Logout
            </button>

          </div>

        </div>

      </div>

    </nav>
  );
};

export default UserNavbar;