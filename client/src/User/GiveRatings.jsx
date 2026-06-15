
import React, { useState, useEffect } from "react";
import AxiosInstance from "../AxiosInstance";
import UserNavbar from "./UserNavbar";

const GiveRatings = () => {
  const [parkingPlaces, setParkingPlaces] = useState([]);
  const [selectedParkingPlace, setSelectedParkingPlace] = useState("");
  const [ratingValue, setRatingValue] = useState(1);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user.id : null;

  useEffect(() => {
    const fetchParkingPlaces = async () => {
      try {
        const response = await AxiosInstance.get("/parking");
        setParkingPlaces(response.data.parkingPlace);
      } catch (error) {
        console.error("Error fetching parking places:", error);
      }
    };

    fetchParkingPlaces();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setResponseMessage(null);

    try {
      const response = await AxiosInstance.post(
        `/rating/add?parkingPlaceId=${selectedParkingPlace}&userId=${userId}&ratingValue=${ratingValue}&comment=${comment}`
      );

      if (response.data.success) {
        setResponseMessage({
          type: "success",
          message: response.data.msg,
        });

        setSelectedParkingPlace("");
        setRatingValue(1);
        setComment("");
      } else {
        setResponseMessage({
          type: "error",
          message: response.data.msg,
        });
      }
    } catch (error) {
      setResponseMessage({
        type: "error",
        message: "An error occurred while adding the rating.",
      });
    } finally {
      setLoading(false);
    }
  };

  const renderStars = () => {
    return (
      <div className="flex gap-1 mt-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            type="button"
            key={star}
            onClick={() => setRatingValue(star)}
            className={`text-3xl transition ${
              star <= ratingValue
                ? "text-yellow-400"
                : "text-slate-600"
            }`}
          >
            ★
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black">
      <UserNavbar />

      <div className="max-w-3xl mx-auto px-6 py-10">

        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700 rounded-3xl shadow-2xl p-8">

          <div className="text-center mb-8">

            <div className="w-24 h-24 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white text-4xl mx-auto shadow-lg shadow-emerald-500/30">
              ⭐
            </div>

            <h1 className="text-4xl font-bold text-white mt-4">
              Give Rating
            </h1>

            <p className="text-slate-400 mt-2">
              Share your experience and help others choose better parking spaces.
            </p>

          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            <div>
              <label className="block text-slate-300 mb-2">
                Parking Place
              </label>

              <select
                value={selectedParkingPlace}
                onChange={(e) =>
                  setSelectedParkingPlace(e.target.value)
                }
                required
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">
                  Select a Parking Place
                </option>

                {parkingPlaces.map((place) => (
                  <option
                    key={place.id}
                    value={place.id}
                  >
                    {place.placeName} - {place.areaName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-300 mb-2">
                Rating
              </label>

              {renderStars()}

              <p className="text-slate-400 mt-2">
                Selected Rating: {ratingValue}/5
              </p>
            </div>

            <div>
              <label className="block text-slate-300 mb-2">
                Comment
              </label>

              <textarea
                value={comment}
                onChange={(e) =>
                  setComment(e.target.value)
                }
                rows="5"
                required
                placeholder="Share your experience..."
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-emerald-500/25 ${
                loading
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              {loading
                ? "Submitting Rating..."
                : "Submit Rating"}
            </button>

          </form>

          {responseMessage && (
            <div
              className={`mt-6 p-4 rounded-2xl border ${
                responseMessage.type === "success"
                  ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400"
                  : "bg-red-500/10 border-red-500/40 text-red-400"
              }`}
            >
              {responseMessage.message}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default GiveRatings;
