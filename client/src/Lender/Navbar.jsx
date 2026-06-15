import React from "react";
import { Link, useNavigate } from "react-router-dom";

const CarParkingIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.8}
    stroke="currentColor"
    className="w-8 h-8"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 8h2a2 2 0 012 2v6a2 2 0 01-2 2H3m0 0v2a2 2 0 002 2h2a2 2 0 002-2v-2m0-10V4a2 2 0 00-2-2H3a2 2 0 00-2 2v2m16 0h2a2 2 0 012 2v6a2 2 0 01-2 2h-2m0 0v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2m0-10V4a2 2 0 012-2h2a2 2 0 012 2v2"
    />
  </svg>
);

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("lender");
    navigate("/lenderLogin");
  };

  return (
    <nav className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-xl border-b border-slate-800 shadow-lg">

      <div className="max-w-7xl mx-auto px-6">

        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link to="/lenderHome" className="flex items-center gap-3">

            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-3 rounded-2xl shadow-lg shadow-emerald-500/20">
              <CarParkingIcon />
            </div>

            <div>
              <h1 className="text-white font-bold text-xl">
                Smart Parking
              </h1>

              <p className="text-slate-400 text-xs">
                Reservation Platform
              </p>
            </div>

          </Link>

          {/* Navigation */}
          <div className="hidden md:flex items-center gap-2">

            <Link
              to="/lenderHome"
              className="px-4 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-all duration-300"
            >
              Dashboard
            </Link>

            <Link
              to="/addParkingPlace"
              className="px-4 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-all duration-300"
            >
              Parking Spaces
            </Link>

            <Link
              to="/viewHisBookings"
              className="px-4 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-all duration-300"
            >
              Bookings
            </Link>

            <Link
              to="/ratings"
              className="px-4 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-all duration-300"
            >
              Ratings
            </Link>

            <Link
              to="/lenderProfile"
              className="px-4 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-all duration-300"
            >
              Profile
            </Link>

            <button
              onClick={handleLogout}
              className="ml-3 px-5 py-2 rounded-xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium transition-all duration-300 shadow-lg shadow-red-500/20"
            >
              Logout
            </button>

          </div>

        </div>

      </div>

    </nav>
  );
};

export default Navbar;