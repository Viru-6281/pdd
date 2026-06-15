
import React, { useState } from "react";
import AxiosInstance from "../AxiosInstance";
import { useNavigate } from "react-router-dom";
import UserNavbar from "./UserNavbar";
import { toast } from "react-toastify";

const AddVehicle = () => {
  const [vehicleName, setVehicleName] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!vehicleName || !vehicleNumber || !image) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    const formData = new FormData();
    formData.append("vehicleName", vehicleName);
    formData.append("vehicleNumber", vehicleNumber);
    formData.append("image", image);

    const userId = JSON.parse(localStorage.getItem("user")).id;

    try {
      const response = await AxiosInstance.post(
        `/vehicle/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.msg);

        setSuccessMsg(
          response.data.msg || "Vehicle added successfully."
        );

        setVehicleName("");
        setVehicleNumber("");
        setImage(null);
      } else {
        setErrorMsg(
          response.data.msg || "Failed to add vehicle."
        );
      }
    } catch (error) {
      if (error.response) {
        setErrorMsg(
          error.response.data.msg ||
            "Failed to add vehicle."
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

      console.error("Add vehicle error:", error);
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

            <div className="w-24 h-24 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white text-4xl font-bold mx-auto shadow-lg shadow-emerald-500/30">
              🚗
            </div>

            <h1 className="text-4xl font-bold text-white mt-4">
              Add Vehicle
            </h1>

            <p className="text-slate-400 mt-2">
              Register your vehicle for parking reservations
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
                Vehicle Name
              </label>

              <input
                type="text"
                value={vehicleName}
                onChange={(e) =>
                  setVehicleName(e.target.value)
                }
                required
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="e.g. Honda City"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-2">
                Vehicle Number
              </label>

              <input
                type="text"
                value={vehicleNumber}
                onChange={(e) =>
                  setVehicleNumber(e.target.value)
                }
                required
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="e.g. KA01AB1234"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-2">
                Vehicle Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required
                className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-3 text-slate-300"
              />

              {image && (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Vehicle Preview"
                  className="mt-4 w-40 h-40 object-cover rounded-2xl border-2 border-emerald-500"
                />
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
                ? "Adding Vehicle..."
                : "Add Vehicle"}
            </button>

          </form>

        </div>

      </div>
    </div>
  );
};

export default AddVehicle;
