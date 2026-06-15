
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AxiosInstance from "../AxiosInstance";

const UserLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const { email, password } = formData;

      if (!email || !password) {
        setError("Please fill out all required fields.");
        setLoading(false);
        return;
      }

      const response = await AxiosInstance.post("/login/user", {
        email,
        password,
      });

      if (response.data.success) {
        setMessage(response.data.msg);

        localStorage.setItem(
          "user",
          JSON.stringify(response.data.user)
        );

        navigate("/userHome");
      } else {
        setError(response.data.msg);
      }
    } catch (err) {
      setError("An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-950">

      {/* Left Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-600 p-12 text-white flex-col justify-center">

        <div className="max-w-lg">

          <h1 className="text-6xl font-bold leading-tight">
            Find &
            <br />
            Reserve Parking
          </h1>

          <p className="mt-6 text-lg text-slate-300">
            Discover available parking spaces, reserve instantly,
            and enjoy a hassle-free parking experience.
          </p>

          <div className="mt-10 bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/10">
            <h3 className="text-2xl font-semibold mb-3">
              Smart Parking Experience
            </h3>

            <p className="text-slate-300">
              Search, reserve and manage your parking bookings
              through a secure and intelligent platform.
            </p>
          </div>

        </div>

      </div>

      {/* Right Section */}
      <div className="flex-1 flex items-center justify-center p-6">

        <div className="w-full max-w-md">

          <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-8">

            <div className="text-center mb-8">

              <div className="w-16 h-16 bg-emerald-500 rounded-2xl mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                U
              </div>

              <h2 className="text-3xl font-bold text-white">
                User Login
              </h2>

              <p className="text-slate-400 mt-2">
                Login to your account
              </p>

            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Email Address
                </label>

                <input
                  autoComplete="off"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Password
                </label>

                <input
                  autoComplete="off"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                />
              </div>

              {message && (
                <div className="bg-green-500/10 border border-green-500/30 text-green-400 p-3 rounded-xl text-sm">
                  {message}
                </div>
              )}

              {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-xl text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg shadow-emerald-500/25"
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              <div className="text-center text-sm text-slate-400">
                Don't have an account?{" "}
                <Link
                  to="/userRegister"
                  className="text-emerald-400 font-semibold hover:text-emerald-300 transition"
                >
                  Register here
                </Link>
              </div>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
};

export default UserLogin;