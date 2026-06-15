import React, { useState, useEffect } from "react";
import AxiosInstance from "../AxiosInstance";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const lenderData = localStorage.getItem("lender");
  let lenderId = null;

  useEffect(() => {
    if (lenderData) {
      try {
        const parsedLender = JSON.parse(lenderData);
        lenderId = parsedLender.id;

        setName(parsedLender.name || "");
        setEmail(parsedLender.email || "");
        setMobileNumber(parsedLender.mobileNumber || "");
        setAddress(parsedLender.address || "");
      } catch (e) {
        console.error("Failed to parse lender data", e);
        setErrorMsg("Invalid lender data. Please log in again.");
        navigate("/lenderLogin");
      }
    } else {
      setErrorMsg("Lender not found. Please log in.");
      navigate("/lenderLogin");
    }
  }, []);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !mobileNumber || !address) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);

    if (password) {
      formData.append("password", password);
    }

    formData.append("mobileNumber", mobileNumber);
    formData.append("address", address);

    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await AxiosInstance.put(
        `/lender/update/${lenderId}`,
        formData
      );

      if (response.status === 200 && response.data.success) {
        setSuccessMsg(
          response.data.message || "Profile updated successfully."
        );

        const updatedLender = {
          ...JSON.parse(lenderData),
          name,
          email,
          mobileNumber,
          address,
          image: image
            ? image.name
            : JSON.parse(lenderData).image,
        };

        localStorage.setItem(
          "lender",
          JSON.stringify(updatedLender)
        );
      } else {
        setErrorMsg(
          response.data.message ||
            "Failed to update profile."
        );
      }
    } catch (error) {
      if (error.response) {
        setErrorMsg(
          error.response.data.msg ||
            "Failed to update profile."
        );
      } else if (error.request) {
        setErrorMsg(
          "No response from server. Please try again later."
        );
      } else {
        setErrorMsg(
          "An error occurred. Please try again."
        );
      }

      console.error("Update profile error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-10">

        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700 rounded-3xl shadow-2xl p-8">

          <div className="text-center mb-8">

            <div className="w-24 h-24 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto shadow-lg shadow-emerald-500/30">
              {name ? name.charAt(0).toUpperCase() : "L"}
            </div>

            <h1 className="text-4xl font-bold text-white mt-4">
              Lender Profile
            </h1>

            <p className="text-slate-400 mt-2">
              Update your account information
            </p>

          </div>

          {successMsg && (
            <div className="bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 p-4 rounded-2xl mb-6">
              {successMsg}
            </div>
          )}

          {errorMsg && (
            <div className="bg-red-500/10 border border-red-500/40 text-red-400 p-4 rounded-2xl mb-6">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block text-slate-300 mb-2">
                Full Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-2">
                Email Address
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-2">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Leave blank to keep current password"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-2">
                Mobile Number
              </label>

              <input
                type="tel"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                required
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-2">
                Address
              </label>

              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows="4"
                required
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-2">
                Profile Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-3 text-slate-300"
              />

              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Selected"
                  className="mt-4 w-32 h-32 rounded-full object-cover border-4 border-emerald-500"
                />
              ) : (
                JSON.parse(lenderData)?.image && (
                  <img
                    src={`http://localhost:8080/images/${JSON.parse(lenderData).image}`}
                    alt="Profile"
                    className="mt-4 w-32 h-32 rounded-full object-cover border-4 border-emerald-500"
                  />
                )
              )}
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
                ? "Updating..."
                : "Update Profile"}
            </button>

          </form>

        </div>

      </div>
    </div>
  );
};

export default Profile;