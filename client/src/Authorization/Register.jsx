
import React, { useState } from "react";
import { Link } from "react-router-dom";
import AxiosInstance from "../AxiosInstance";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobileNumber: "",
    address: "",
    image: null,
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const {
        name,
        email,
        password,
        mobileNumber,
        address,
        image,
      } = formData;

      if (!name || !email || !password) {
        setError("Please fill out all required fields.");
        setLoading(false);
        return;
      }

      const data = new FormData();

      data.append("name", name);
      data.append("email", email);
      data.append("password", password);
      data.append("mobileNumber", mobileNumber);
      data.append("address", address);

      if (image) {
        data.append("image", image);
      }

      const response = await AxiosInstance.post(
        "lender/signup",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage(response.data.message);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "An error occurred during registration."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-950 via-slate-900 to-black">

      {/* Left Side */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-950 via-slate-900 to-teal-600 p-12 text-white flex-col justify-center">

        <div className="max-w-lg">

          <h1 className="text-6xl font-bold leading-tight">
            Become a
            <br />
            Parking Partner
          </h1>

          <p className="mt-6 text-lg text-slate-300">
            Register your parking locations, manage reservations,
            monitor customers and grow your parking business.
          </p>

          <div className="mt-10 bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
            <h3 className="text-2xl font-semibold mb-3">
              Smart Management
            </h3>

            <p className="text-slate-300">
              Create an account and start managing parking spaces
              through our intelligent reservation platform.
            </p>
          </div>

        </div>

      </div>

      {/* Right Side */}
      <div className="flex-1 flex items-center justify-center p-6">

        <div className="w-full max-w-lg">

          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.4)] p-8">

            <div className="text-center mb-8">

              <div className="w-20 h-20 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-3xl mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-emerald-500/30">
                P
              </div>

              <h2 className="text-4xl font-bold text-white tracking-tight">
                Lender Registration
              </h2>

              <p className="text-slate-400 mt-2">
                Create your lender account
              </p>

            </div>

            <form onSubmit={handleSubmit} className="space-y-4">

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  className="w-full px-4 py-3.5 bg-slate-800/70 border border-slate-700 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="w-full px-4 py-3.5 bg-slate-800/70 border border-slate-700 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  required
                  className="w-full px-4 py-3.5 bg-slate-800/70 border border-slate-700 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Mobile Number
                </label>

                <input
                  type="text"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  placeholder="Enter mobile number"
                  className="w-full px-4 py-3.5 bg-slate-800/70 border border-slate-700 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Address
                </label>

                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter address"
                  className="w-full px-4 py-3.5 bg-slate-800/70 border border-slate-700 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Profile Image
                </label>

                <input
                  type="file"
                  name="image"
                  onChange={handleFileChange}
                  className="w-full text-slate-300 bg-slate-800 border border-slate-700 rounded-2xl p-3"
                />
              </div>

              {message && (
                <div className="bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 p-3 rounded-xl">
                  {message}
                </div>
              )}

              {error && (
                <div className="bg-red-500/10 border border-red-500/40 text-red-400 p-3 rounded-xl">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold py-3 rounded-2xl transition-all duration-300 shadow-lg shadow-emerald-500/25"
              >
                {loading ? "Registering..." : "Create Account"}
              </button>

              <div className="text-center text-sm text-slate-400">
                Already have an account?{" "}
                <Link
                  to="/lenderLogin"
                  className="text-emerald-400 font-semibold hover:text-emerald-300 transition"
                >
                  Login here
                </Link>
              </div>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Register;
