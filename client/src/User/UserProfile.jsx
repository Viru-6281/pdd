import React, { useState, useEffect } from "react";
import AxiosInstance from "../AxiosInstance";
import UserNavbar from "./UserNavbar";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
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
  const [userId, setUserId] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const userData = localStorage.getItem("user");

  useEffect(() => {
    if (userData) {
      const user = JSON.parse(userData);
      setUserId(user.id);
      setName(user.name || "");
      setEmail(user.email || "");
      setMobileNumber(user.mobileNumber || "");
      setAddress(user.address || "");
    } else {
      navigate("/userLogin");
    }
  }, []);

  const handleImageChange = (e) => {
    if (e.target.files?.[0]) setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    if (password) formData.append("password", password);
    formData.append("mobileNumber", mobileNumber);
    formData.append("address", address);
    if (image) formData.append("image", image);

    try {
      setLoading(true);
      const response = await AxiosInstance.put(`/user/${userId}`, formData);

      if (response.data.success) {
        const updatedUser = {
          ...JSON.parse(userData),
          name,
          email,
          mobileNumber,
          address,
          image: image ? image.name : JSON.parse(userData).image,
        };

        localStorage.setItem("user", JSON.stringify(updatedUser));
        setSuccessMsg("Profile updated successfully");
        setEditMode(false);
      }
    } catch {
      setErrorMsg("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const profileImage =
    image
      ? URL.createObjectURL(image)
      : JSON.parse(userData || "{}")?.image
      ? `http://localhost:8080/images/${JSON.parse(userData).image}`
      : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black">
      <UserNavbar />

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid lg:grid-cols-3 gap-8">

          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8">
            <div className="text-center">
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="w-40 h-40 rounded-full object-cover border-4 border-emerald-500 mx-auto" />
              ) : (
                <div className="w-40 h-40 rounded-full bg-emerald-500 text-white text-6xl flex items-center justify-center mx-auto">
                  {name?.charAt(0)}
                </div>
              )}

              <h2 className="text-white text-3xl font-bold mt-4">{name}</h2>
              <p className="text-slate-400">{email}</p>

              <button
                onClick={() => setEditMode(!editMode)}
                className="mt-6 w-full bg-emerald-500 text-white py-3 rounded-xl"
              >
                {editMode ? "Cancel Editing" : "Edit Profile"}
              </button>
            </div>
          </div>

          <div className="lg:col-span-2 bg-slate-900 border border-slate-700 rounded-3xl p-8">
            {!editMode ? (
              <div>
                <h1 className="text-4xl font-bold text-white mb-8">My Profile</h1>

                <div className="grid md:grid-cols-2 gap-5">
                  <div className="bg-slate-800 p-5 rounded-2xl"><p className="text-slate-400">Name</p><h3 className="text-white">{name}</h3></div>
                  <div className="bg-slate-800 p-5 rounded-2xl"><p className="text-slate-400">Email</p><h3 className="text-white">{email}</h3></div>
                  <div className="bg-slate-800 p-5 rounded-2xl"><p className="text-slate-400">Mobile</p><h3 className="text-white">{mobileNumber}</h3></div>
                  <div className="bg-slate-800 p-5 rounded-2xl"><p className="text-slate-400">Address</p><h3 className="text-white">{address}</h3></div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h1 className="text-4xl font-bold text-white">Edit Profile</h1>
                <input className="w-full p-3 rounded-xl bg-slate-800 text-white" value={name} onChange={(e)=>setName(e.target.value)} />
                <input className="w-full p-3 rounded-xl bg-slate-800 text-white" value={email} onChange={(e)=>setEmail(e.target.value)} />
                <input type="password" className="w-full p-3 rounded-xl bg-slate-800 text-white" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Leave blank to keep password" />
                <input className="w-full p-3 rounded-xl bg-slate-800 text-white" value={mobileNumber} onChange={(e)=>setMobileNumber(e.target.value)} />
                <textarea className="w-full p-3 rounded-xl bg-slate-800 text-white" rows="4" value={address} onChange={(e)=>setAddress(e.target.value)} />
                <input type="file" accept="image/*" onChange={handleImageChange} className="w-full p-3 rounded-xl bg-slate-800 text-white" />

                <button type="submit" disabled={loading} className="w-full bg-emerald-500 text-white py-3 rounded-xl">
                  {loading ? "Updating..." : "Save Changes"}
                </button>
              </form>
            )}

            {successMsg && <p className="text-green-400 mt-4">{successMsg}</p>}
            {errorMsg && <p className="text-red-400 mt-4">{errorMsg}</p>}
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserProfile;
