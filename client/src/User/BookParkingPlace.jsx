
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AxiosInstance from "../AxiosInstance";
import UserNavbar from "./UserNavbar";
import { toast } from "react-toastify";

const BookParkingPlace = () => {
  const { lenderId } = useParams();

  const [userId, setUserId] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.id) {
      setUserId(user.id);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setResponseMessage(null);

    try {
      const response = await AxiosInstance.post(
        `/booking/parking/${lenderId}/book?userId=${userId}&startTime=${startTime}&endTime=${endTime}`
      );

      if (response.data.success) {
        toast.success(response.data.msg);

        setResponseMessage({
          type: "success",
          message: response.data.msg,
        });
      } else {
        setResponseMessage({
          type: "error",
          message: response.data.msg,
        });
      }
    } catch (error) {
      setResponseMessage({
        type: "error",
        message:
          "An error occurred while booking the parking place.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black">
      <UserNavbar />

      <div className="max-w-3xl mx-auto px-6 py-10">

        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700 rounded-3xl shadow-2xl p-8">

          <div className="text-center mb-8">

            <div className="w-24 h-24 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white text-4xl mx-auto shadow-lg shadow-emerald-500/30">
              🅿️
            </div>

            <h1 className="text-4xl font-bold text-white mt-4">
              Book Parking Place
            </h1>

            <p className="text-slate-400 mt-2">
              Reserve your parking slot quickly and securely
            </p>

          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            <input type="hidden" value={lenderId} />
            <input type="hidden" value={userId} />

            <div>
              <label
                htmlFor="startTime"
                className="block text-slate-300 mb-2"
              >
                Start Time
              </label>

              <input
                type="datetime-local"
                id="startTime"
                value={startTime}
                onChange={(e) =>
                  setStartTime(e.target.value)
                }
                required
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label
                htmlFor="endTime"
                className="block text-slate-300 mb-2"
              >
                End Time
              </label>

              <input
                type="datetime-local"
                id="endTime"
                value={endTime}
                onChange={(e) =>
                  setEndTime(e.target.value)
                }
                required
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
                ? "Booking Parking Space..."
                : "Book Parking Place"}
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

export default BookParkingPlace;