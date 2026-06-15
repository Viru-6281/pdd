import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import AxiosInstance from "../AxiosInstance";

const LenderHome = () => {
  const [parkingSpaces, setParkingSpaces] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updateError, setUpdateError] = useState("");

  const navigate = useNavigate();

  const lenderData = localStorage.getItem("lender");
  let lenderId = null;

  if (lenderData) {
    try {
      lenderId = JSON.parse(lenderData).id;
    } catch (e) {
      navigate("/lenderLogin");
    }
  }

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
      setUpdateError("Failed to update booking status.");
    }
  };

  useEffect(() => {
    if (!lenderId) return;

    const fetchData = async () => {
      try {
        const parkingResponse = await AxiosInstance.get(
          `/parking/place/${lenderId}`
        );

        if (parkingResponse.data.success) {
          setParkingSpaces(parkingResponse.data.parkingPlaces);
        }

        const bookingResponse = await AxiosInstance.get(
          `/booking/lender/${lenderId}`
        );

        if (bookingResponse.data.success) {
          setBookings(bookingResponse.data.bookings);
        }
      } catch (err) {
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [lenderId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white">
            Lender Dashboard
          </h1>
          <p className="text-slate-400 mt-2">
            Manage your parking locations and reservations.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-slate-900/80 border border-slate-700 rounded-3xl p-6">
            <h3 className="text-slate-400">Parking Spaces</h3>
            <p className="text-4xl font-bold text-white mt-2">
              {parkingSpaces.length}
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-700 rounded-3xl p-6">
            <h3 className="text-slate-400">Bookings</h3>
            <p className="text-4xl font-bold text-white mt-2">
              {bookings.length}
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-700 rounded-3xl p-6">
            <h3 className="text-slate-400">Active</h3>
            <p className="text-4xl font-bold text-emerald-400 mt-2">
              {bookings.filter((b) => b.active).length}
            </p>
          </div>

        </div>

        {/* Add Parking Button */}
        <div className="mb-8">
          <Link to="/addParkingPlace">
            <button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 py-3 rounded-2xl font-semibold">
              Add New Parking Space
            </button>
          </Link>
        </div>

        {/* Parking Spaces */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-5">
            Your Parking Spaces
          </h2>

          {loading ? (
            <p className="text-slate-400">Loading...</p>
          ) : parkingSpaces.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {parkingSpaces.map((space) => (
                <div
                  key={space.id}
                  className="bg-slate-900/80 border border-slate-700 rounded-3xl overflow-hidden"
                >
                  {space.image && (
                    <img
                      src={`http://localhost:8080/images/${space.image}`}
                      alt={space.placeName}
                      className="w-full h-52 object-cover"
                    />
                  )}

                  <div className="p-5">
                    <h3 className="text-xl font-bold text-white">
                      {space.placeName}
                    </h3>

                    <p className="text-slate-400 mt-2">
                      {space.description}
                    </p>

                    <div className="mt-4 space-y-2 text-slate-300">
                      <p>
                        <strong>Area:</strong> {space.areaName}
                      </p>

                      <p>
                        <strong>Status:</strong>{" "}
                        {space.available ? (
                          <span className="text-emerald-400">
                            Available
                          </span>
                        ) : (
                          <span className="text-red-400">
                            Occupied
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-400">
              No parking spaces found.
            </p>
          )}
        </div>

        {/* Bookings */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-5">
            Bookings
          </h2>

          {error && (
            <div className="bg-red-500/10 border border-red-500/40 text-red-400 p-4 rounded-2xl mb-4">
              {error}
            </div>
          )}

          {updateError && (
            <div className="bg-red-500/10 border border-red-500/40 text-red-400 p-4 rounded-2xl mb-4">
              {updateError}
            </div>
          )}

          <div className="bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden">

            <div className="overflow-x-auto">

              <table className="w-full text-slate-200">

                <thead className="bg-slate-800">
                  <tr>
                    <th className="p-4">ID</th>
                    <th className="p-4">Parking</th>
                    <th className="p-4">User</th>
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
                      className="border-t border-slate-800 text-center"
                    >
                      <td className="p-4">{booking.id}</td>

                      <td className="p-4">
                        {booking.parkingPlace.placeName}
                      </td>

                      <td className="p-4">
                        {booking.user.name}
                      </td>

                      <td className="p-4">
                        <select
                          value={booking.status}
                          onChange={(e) =>
                            updateBookingStatus(
                              booking.id,
                              e.target.value
                            )
                          }
                          className="bg-slate-800 border border-slate-700 rounded-xl p-2"
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
                        {booking.active ? "Yes" : "No"}
                      </td>
                    </tr>
                  ))}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default LenderHome;