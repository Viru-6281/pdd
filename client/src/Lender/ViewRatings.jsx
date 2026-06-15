
import React, { useEffect, useState } from "react";
import AxiosInstance from "../AxiosInstance";
import Navbar from "./Navbar";

const ViewRatings = () => {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const lender = JSON.parse(localStorage.getItem("lender"));
  const lenderId = lender.id;

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await AxiosInstance.get(
          `/rating/parking/${lenderId}`
        );

        setRatings(response.data.ratings);
        setError(null);
      } catch (error) {
        setError(
          "Failed to fetch ratings. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRatings();
  }, []);

  const renderStars = (ratingValue) => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={
            i <= ratingValue
              ? "text-yellow-400 text-xl"
              : "text-slate-600 text-xl"
          }
        >
          ★
        </span>
      );
    }

    return stars;
  };

  const averageRating =
    ratings.length > 0
      ? (
          ratings.reduce(
            (sum, rating) => sum + rating.ratingValue,
            0
          ) / ratings.length
        ).toFixed(1)
      : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white">
            Customer Ratings
          </h1>

          <p className="text-slate-400 mt-2">
            View customer feedback and reviews for your parking locations.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-slate-900/80 border border-slate-700 rounded-3xl p-6">
            <h3 className="text-slate-400 text-sm">
              Total Reviews
            </h3>

            <p className="text-4xl font-bold text-white mt-2">
              {ratings.length}
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-700 rounded-3xl p-6">
            <h3 className="text-slate-400 text-sm">
              Average Rating
            </h3>

            <p className="text-4xl font-bold text-yellow-400 mt-2">
              {averageRating}
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-700 rounded-3xl p-6">
            <h3 className="text-slate-400 text-sm">
              Five Star Reviews
            </h3>

            <p className="text-4xl font-bold text-emerald-400 mt-2">
              {
                ratings.filter(
                  (rating) => rating.ratingValue === 5
                ).length
              }
            </p>
          </div>

        </div>

        {/* Content */}
        {loading ? (
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-10 text-center">
            <p className="text-slate-400">
              Loading ratings...
            </p>
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/40 text-red-400 p-4 rounded-2xl">
            {error}
          </div>
        ) : ratings.length === 0 ? (
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-10 text-center">
            <p className="text-slate-400">
              No ratings found.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

            {ratings.map((rating) => (
              <div
                key={rating.id}
                className="bg-slate-900/80 backdrop-blur-xl border border-slate-700 rounded-3xl p-6 hover:border-emerald-500/50 transition-all duration-300"
              >

                <div className="flex items-center justify-between mb-4">

                  <div>
                    <h2 className="text-lg font-semibold text-white">
                      {rating.user.name}
                    </h2>

                    <p className="text-slate-400 text-sm">
                      Customer Review
                    </p>
                  </div>

                  <div className="bg-slate-800 px-3 py-1 rounded-xl">
                    <span className="text-yellow-400 font-bold">
                      {rating.ratingValue}/5
                    </span>
                  </div>

                </div>

                <div className="flex mb-4">
                  {renderStars(rating.ratingValue)}
                </div>

                <div className="bg-slate-800/50 rounded-2xl p-4 mb-4">

                  <p className="text-slate-300">
                    {rating.comment
                      ? rating.comment
                      : "No comment provided."}
                  </p>

                </div>

                <div className="border-t border-slate-700 pt-4">

                  <p className="text-sm text-slate-400">
                    Reviewed on
                  </p>

                  <p className="text-slate-300">
                    {new Date(
                      rating.createdAt
                    ).toLocaleString()}
                  </p>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
};

export default ViewRatings;
