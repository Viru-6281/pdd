
import React, { useState } from "react";
import UserNavbar from "./UserNavbar";

const SearchParking = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black">
      <UserNavbar />

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="text-center mb-10">

          <div className="w-24 h-24 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white text-4xl mx-auto shadow-lg shadow-emerald-500/30">
            🔍
          </div>

          <h1 className="text-4xl font-bold text-white mt-4">
            Search Parking
          </h1>

          <p className="text-slate-400 mt-2">
            Find available parking spaces near you
          </p>

        </div>

        {/* Search Box */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700 rounded-3xl p-6 mb-8">

          <input
            type="text"
            placeholder="Search by area name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-4 bg-slate-800 border border-slate-700 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />

        </div>

        {/* Sample Results */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          <div className="bg-slate-900/80 border border-slate-700 rounded-3xl overflow-hidden">

            <img
              src="https://via.placeholder.com/400x250"
              alt="Parking"
              className="w-full h-52 object-cover"
            />

            <div className="p-5">

              <h2 className="text-xl font-bold text-white">
                City Center Parking
              </h2>

              <p className="text-slate-400 mt-2">
                MG Road, Bangalore
              </p>

              <div className="mt-4 flex justify-between items-center">

                <span className="text-emerald-400 font-semibold">
                  Available
                </span>

                <button className="bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2 rounded-xl text-white font-medium">
                  Book Now
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default SearchParking;