import React, { useEffect, useState } from "react";
import AxiosInstance from "../AxiosInstance";
import UserNavbar from "./UserNavbar";

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [releaseError, setReleaseError] = useState(null);
  const [releaseSuccess, setReleaseSuccess] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user.id : null;

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await AxiosInstance.get(
          `/booking/user/${userId}`
        );

        setBookings(response.data.bookings);
        setError(null);
      } catch (error) {
        setError(
          "Failed to fetch bookings. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchBookings();
    } else {
      setLoading(false);
      setError("User ID not found. Please log in.");
    }
  }, [userId]);

  const releaseParkingPlace = async (bookingId) => {
    try {
      const response = await AxiosInstance.post(
        `/booking/release/${bookingId}`
      );

      if (response.data.success) {
        setReleaseSuccess(
          `Parking place for booking ${bookingId} released successfully.`
        );

        setBookings((prevBookings) =>
          prevBookings.filter(
            (booking) => booking.id !== bookingId
          )
        );

        setReleaseError(null);
      } else {
        setReleaseError(response.data.msg);
      }
    } catch (error) {
      setReleaseError(
        "An error occurred while releasing the parking place."
      );
    }
  };

const activeBookings = bookings.filter(
  (booking) =>
    booking.status === "Accepted" ||
    booking.status === "Pending"
).length;

const releasedBookings = bookings.filter(
  (booking) => booking.status === "Released"
).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black">
      <UserNavbar />

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white">
            My Bookings
          </h1>

          <p className="text-slate-400 mt-2">
            Manage and track your parking reservations.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">

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
              Active Bookings
            </h3>

            <p className="text-4xl font-bold text-emerald-400 mt-2">
              {activeBookings}
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-700 rounded-3xl p-6">
            <h3 className="text-slate-400 text-sm">
              Released
            </h3>

            <p className="text-4xl font-bold text-cyan-400 mt-2">
  {releasedBookings}
</p>
          </div>

        </div>

        {/* Alerts */}
        {releaseSuccess && (
          <div className="mb-6 bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 p-4 rounded-2xl">
            {releaseSuccess}
          </div>
        )}

        {releaseError && (
          <div className="mb-6 bg-red-500/10 border border-red-500/40 text-red-400 p-4 rounded-2xl">
            {releaseError}
          </div>
        )}

        {/* Content */}
        {loading ? (
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-10 text-center">
            <p className="text-slate-400">
              Loading bookings...
            </p>
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/40 text-red-400 p-4 rounded-2xl">
            {error}
          </div>
        ) : bookings.length === 0 ? (
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-10 text-center">
            <p className="text-slate-400">
              No bookings found.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-slate-900/80 backdrop-blur-xl border border-slate-700 rounded-3xl p-6 hover:border-emerald-500/50 transition-all duration-300"
              >

                <div className="flex justify-between items-center mb-4">

                  <h2 className="text-xl font-bold text-white">
                    Booking #{booking.id}
                  </h2>

              <span
  className={`px-3 py-1 rounded-xl text-sm font-medium ${
    booking.status === "Accepted"
      ? "bg-emerald-500/20 text-emerald-400"
      : booking.status === "Pending"
      ? "bg-yellow-500/20 text-yellow-400"
      : booking.status === "Released"
      ? "bg-cyan-500/20 text-cyan-400"
      : "bg-red-500/20 text-red-400"
  }`}
>
  {booking.status}
</span>

                </div>

                <div className="space-y-3 text-slate-300">

                  <p>
                    <strong>Parking:</strong>{" "}
                    {booking.parkingPlace.placeName}
                  </p>

                  <p>
                    <strong>Area:</strong>{" "}
                    {booking.parkingPlace.areaName}
                  </p>

                  <p>
                    <strong>Lender:</strong>{" "}
                    {booking.parkingPlace.lender.name}
                  </p>

                  <p>
                    <strong>Reserved:</strong><br />
                    {new Date(
                      booking.reservationTime
                    ).toLocaleString()}
                  </p>

                  <p>
                    <strong>Start:</strong><br />
                    {new Date(
                      booking.startTime
                    ).toLocaleString()}
                  </p>

                  <p>
                    <strong>End:</strong><br />
                    {new Date(
                      booking.endTime
                    ).toLocaleString()}
                  </p>

                </div>

                {(
  booking.status === "Accepted" ||
  booking.status === "Pending"
) && (
                  <button
                    onClick={() =>
                      releaseParkingPlace(booking.id)
                    }
                    className="mt-6 w-full bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white font-semibold py-3 rounded-2xl transition-all duration-300"
                  >
                    Release Parking Place
                  </button>
                )}

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
};

export default UserBookings;