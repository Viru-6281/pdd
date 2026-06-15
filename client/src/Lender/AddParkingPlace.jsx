import React, { useState } from "react";
import Navbar from "./Navbar";
import AxiosInstance from "../AxiosInstance";

const AddParkingPlace = () => {
  const [placeName, setPlaceName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [areaName, setAreaName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!placeName || !latitude || !longitude || !areaName) {
      setMessage("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("placeName", placeName);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("areaName", areaName);
    formData.append("description", description);

    if (image) {
      formData.append("image", image);
    }

    const lender = JSON.parse(localStorage.getItem("lender"));
    const lenderId = lender.id;

    try {
      setLoading(true);

      const response = await AxiosInstance.post(
        `/parking/${lenderId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage(response.data.msg);
    } catch (error) {
      setMessage("An error occurred while adding the parking place.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-10">

        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700 shadow-2xl rounded-3xl p-8">

          <div className="text-center mb-8">

            <div className="w-20 h-20 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-3xl mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-emerald-500/30">
              P
            </div>

            <h1 className="text-4xl font-bold text-white">
              Add Parking Place
            </h1>

            <p className="text-slate-400 mt-2">
              Register a new parking location for customers
            </p>

          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Place Name
              </label>

              <input
                type="text"
                value={placeName}
                onChange={(e) => setPlaceName(e.target.value)}
                placeholder="Enter place name"
                className="w-full px-4 py-3.5 bg-slate-800/70 border border-slate-700 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Latitude
                </label>

                <input
                  type="text"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  placeholder="Enter latitude"
                  className="w-full px-4 py-3.5 bg-slate-800/70 border border-slate-700 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Longitude
                </label>

                <input
                  type="text"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  placeholder="Enter longitude"
                  className="w-full px-4 py-3.5 bg-slate-800/70 border border-slate-700 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Area Name
              </label>

              <input
                type="text"
                value={areaName}
                onChange={(e) => setAreaName(e.target.value)}
                placeholder="Enter area name"
                className="w-full px-4 py-3.5 bg-slate-800/70 border border-slate-700 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Description
              </label>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe this parking location"
                className="w-full min-h-[120px] px-4 py-3 bg-slate-800/70 border border-slate-700 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Upload Image (Optional)
              </label>

              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                className="w-full text-slate-300 bg-slate-800 border border-slate-700 rounded-2xl p-4"
              />
            </div>

            {message && (
              <div className="bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 p-4 rounded-2xl">
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-emerald-500/25"
            >
              {loading ? "Adding Parking Place..." : "Add Parking Place"}
            </button>

          </form>

        </div>

      </div>
    </div>
  );
};

export default AddParkingPlace;