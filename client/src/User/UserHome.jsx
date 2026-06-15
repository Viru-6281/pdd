import React from "react";
import UserNav from "./UserNavbar";
import { Link } from "react-router-dom";

const UserHome = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black">
      <UserNav />

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Welcome Section */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700 rounded-3xl p-8 mb-8">

          <div className="flex flex-col md:flex-row items-center justify-between">

            <div>
              <h1 className="text-4xl font-bold text-white mb-3">
                Welcome Back 👋
              </h1>

              <p className="text-slate-400 text-lg">
                {user?.name || "User"}, manage your parking reservations
                and discover available parking spaces nearby.
              </p>
            </div>

            <div className="mt-6 md:mt-0">

              <div className="w-24 h-24 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg shadow-emerald-500/30">
                {user?.name
                  ? user.name.charAt(0).toUpperCase()
                  : "U"}
              </div>

            </div>

          </div>

        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-slate-900/80 border border-slate-700 rounded-3xl p-6">
            <div className="text-4xl mb-3">🗺️</div>

            <h3 className="text-white font-semibold text-xl">
              Parking Map
            </h3>

            <p className="text-slate-400 mt-2">
              Explore nearby parking locations.
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-700 rounded-3xl p-6">
            <div className="text-4xl mb-3">🔍</div>

            <h3 className="text-white font-semibold text-xl">
              Search Parking
            </h3>

            <p className="text-slate-400 mt-2">
              Find available parking instantly.
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-700 rounded-3xl p-6">
            <div className="text-4xl mb-3">📋</div>

            <h3 className="text-white font-semibold text-xl">
              My Bookings
            </h3>

            <p className="text-slate-400 mt-2">
              Manage your active reservations.
            </p>
          </div>

        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          {/* View Map */}
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700 rounded-3xl p-8 hover:border-emerald-500/50 transition-all duration-300">

            <div className="text-5xl mb-5">
              🗺️
            </div>

            <h2 className="text-2xl font-bold text-white mb-3">
              View Map
            </h2>

            <p className="text-slate-400 mb-6">
              Explore available parking locations on the map and
              discover nearby parking areas.
            </p>

            <Link to="/user/view-map">
              <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold py-3 rounded-2xl transition-all duration-300">
                Open Map
              </button>
            </Link>

          </div>

          {/* Search Parking */}
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700 rounded-3xl p-8 hover:border-emerald-500/50 transition-all duration-300">

            <div className="text-5xl mb-5">
              🔍
            </div>

            <h2 className="text-2xl font-bold text-white mb-3">
              Search Parking
            </h2>

            <p className="text-slate-400 mb-6">
              Search for available parking spaces and reserve
              them instantly.
            </p>

            <Link to="/user/search-parking">
              <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-3 rounded-2xl transition-all duration-300">
                Search Now
              </button>
            </Link>

          </div>

          {/* My Bookings */}
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700 rounded-3xl p-8 hover:border-emerald-500/50 transition-all duration-300">

            <div className="text-5xl mb-5">
              📋
            </div>

            <h2 className="text-2xl font-bold text-white mb-3">
              My Bookings
            </h2>

            <p className="text-slate-400 mb-6">
              View, manage and release your active parking
              reservations.
            </p>

            <Link to="/user/view-booked-parking">
              <button className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold py-3 rounded-2xl transition-all duration-300">
                View Bookings
              </button>
            </Link>

          </div>

        </div>

      </div>
    </div>
  );
};

export default UserHome;