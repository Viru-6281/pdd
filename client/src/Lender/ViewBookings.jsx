
import React, { useState, useEffect } from "react";
import AxiosInstance from "../AxiosInstance";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const ViewBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updateError, setUpdateError] = useState("");

  const navigate = useNavigate();

  const lenderData = localStorage.getItem("lender");
  let lenderId = null;

  if (lenderData) {
    try {
      const parsedLender = JSON.parse(lenderData);
      lenderId = parsedLender.id;
    } catch (e) {
      navigate("/lenderLogin");
    }
  } else {
    navigate("/lenderLogin");
  }

  useEffect(() => {
    if (!lenderId) return;

    const fetchBookings = async () => {
      try {
        const response = await AxiosInstance.get(
          `/booking/lender/${lenderId}`
        );

        if (response.data.success) {
          setBookings(response.data.bookings);
        } else {
          setError(response.data.msg || "Failed to fetch bookings.");
        }
      } catch (err) {
        setError(
          err.response?.data?.msg ||
            "An error occurred while fetching bookings."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [lenderId]);

  const updateBookingStatus = async (bookingId, status) => {
    try {
      const response = await AxiosInstance.post(
        `/booking/update/status/${bookingId}?status=${status}`
      );

      if (response.data.success) {
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking.id === bookingId
              ? { ...booking, status: status }
              : booking
          )
        );

        setUpdateError("");
      } else {
        setUpdateError(response.data.msg);
      }
    } catch (error) {
      setUpdateError(
        "An error occurred while updating the status."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white">
            Booking Management
          </h1>

          <p className="text-slate-400 mt-2">
            Manage all customer parking reservations.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">

          <div className="bg-slate-900/80 border border-slate-700 rounded-3xl p-6">
            <h3 className="text-slate-400 text-sm">
              Total Bookings
            </h3>

            <p className="text-4xl font-bold text-white mt-2">
              {bookings.length}
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-700 rounded-3xl p-6">
            <h3 className="text-slate-400 text-sm">
              Accepted
            </h3>

            <p className="text-4xl font-bold text-emerald-400 mt-2">
              {
                bookings.filter(
                  (booking) =>
                    booking.status === "Accepted"
                ).length
              }
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-700 rounded-3xl p-6">
            <h3 className="text-slate-400 text-sm">
              Pending
            </h3>

            <p className="text-4xl font-bold text-yellow-400 mt-2">
              {
                bookings.filter(
                  (booking) =>
                    booking.status === "Pending"
                ).length
              }
            </p>
          </div>

        </div>

        {loading ? (
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-10 text-center text-slate-400">
            Loading bookings...
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/40 text-red-400 p-4 rounded-2xl">
            {error}
          </div>
        ) : bookings.length > 0 ? (
          <div className="bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden">

            <div className="overflow-x-auto">

              <table className="w-full text-slate-200">

                <thead className="bg-slate-800">
                  <tr>
                    <th className="p-4">ID</th>
                    <th className="p-4">Parking Place</th>
                    <th className="p-4">Customer</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Reservation</th>
                    <th className="p-4">Start</th>
                    <th className="p-4">End</th>
                    <th className="p-4">Active</th>
                  </tr>
                </thead>

                <tbody>

                  {bookings.map((booking) => (
                    <tr
                      key={booking.id}
                      className="border-t border-slate-800 text-center hover:bg-slate-800/30"
                    >
                      <td className="p-4">
                        {booking.id}
                      </td>

                      <td className="p-4">
                        {booking.parkingPlace.placeName}
                      </td>

                      <td className="p-4">
                        {booking.user.name}
                      </td>

                      <td className="p-4">
                        <select
                          className="bg-slate-800 border border-slate-700 rounded-xl p-2 text-white"
                          value={booking.status}
                          onChange={(e) =>
                            updateBookingStatus(
                              booking.id,
                              e.target.value
                            )
                          }
                        >
                          <option value="Pending">
                            Pending
                          </option>
                          <option value="Accepted">
                            Accepted
                          </option>
                          <option value="Rejected">
                            Rejected
                          </option>
                        </select>
                      </td>

                      <td className="p-4">
                        {new Date(
                          booking.reservationTime
                        ).toLocaleString()}
                      </td>

                      <td className="p-4">
                        {new Date(
                          booking.startTime
                        ).toLocaleString()}
                      </td>

                      <td className="p-4">
                        {new Date(
                          booking.endTime
                        ).toLocaleString()}
                      </td>

                      <td className="p-4">
                        {booking.active ? (
                          <span className="text-emerald-400 font-semibold">
                            Yes
                          </span>
                        ) : (
                          <span className="text-red-400 font-semibold">
                            No
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}

                </tbody>

              </table>

            </div>

          </div>
        ) : (
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-10 text-center text-slate-400">
            No bookings found.
          </div>
        )}

        {updateError && (
          <div className="mt-4 bg-red-500/10 border border-red-500/40 text-red-400 p-4 rounded-2xl">
            {updateError}
          </div>
        )}

      </div>
    </div>
  );
};

export default ViewBookings;
