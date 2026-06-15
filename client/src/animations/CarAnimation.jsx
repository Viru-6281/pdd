import React, { useState, useEffect } from "react";
import Lottie from "react-lottie";
import animationData from "../animations/animation.json";
import newAnimationData from "../animations/CarAnimation1.json";
import "../animations/CarAnimation.css";
import { Link } from "react-router-dom";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const CarAnimation = () => {
  const [showHome, setShowHome] = useState(false);
  const [carPosition, setCarPosition] = useState("-100%");
  const [userLocation, setUserLocation] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(true);
  const [error, setError] = useState(null);
  const [showNewCarAnimation, setShowNewCarAnimation] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCarPosition("calc(100vw + 330px)");
    }, 100);

    const homeTimer = setTimeout(() => {
      setShowHome(true);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(homeTimer);
    };
  }, []);

  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
            setLoadingLocation(false);
          },
          (error) => {
            setError("Unable to retrieve your location. Please check your settings.");
            setLoadingLocation(false);
          }
        );
      } else {
        setError("Geolocation is not supported by your browser.");
        setLoadingLocation(false);
      }
    };

    getUserLocation();
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const newCarOptions = {
    loop: true,
    autoplay: true,
    animationData: newAnimationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  return (
    <div>
      {!showHome ? (
        <div className="car-container">
          <div
            className="car-animation"
            style={{
              transform: `translateX(${carPosition})`,
              transition: "transform 2.5s ease-in-out",
            }}
          >
            <Lottie options={defaultOptions} height={200} width={330} />
          </div>
        </div>
      ) : (
        <div className="flex flex-col min-h-screen bg-gray-100">
        <header className="bg-slate-950 border-b border-slate-800 text-white">
            <nav className="container mx-auto flex justify-between items-center p-4">
              <div className="text-2xl font-extrabold tracking-wide">
  Smart Parking
</div>
              <ul className="flex space-x-6 text-lg">
                <li>
                  <Link to="/" className="hover:text-yellow-400 transition">Home</Link>
                </li>
                <li>
                  <Link to="/lenderLogin" className="hover:text-yellow-400 transition">Lender</Link>
                </li>
                <li>
                  <Link to="/userLogin" className="hover:text-yellow-400 transition">User</Link>
                </li>
              </ul>
            </nav>
          </header>

          <main className="flex-grow">
            <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white py-20">
              <div className="container mx-auto flex flex-col lg:flex-row items-center p-8">
                <div className="w-full lg:w-1/2 lg:mb-0">
                  <h1 className="text-5xl font-bold mb-6">
                    Find and Reserve Parking Instantly
                  </h1>
                  <p className="mb-8 text-lg">
                    Save time and avoid hassle by reserving your parking spot before you arrive.
                  </p>
                  <button className="bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-4 rounded-2xl font-semibold shadow-lg shadow-emerald-500/30">
                    Get Started
                  </button>
                </div>

                <div className="w-full lg:w-1/2 flex justify-center items-center relative">
                  <div className="relative w-full max-w-md lg:max-w-full">
                    {showNewCarAnimation ? (
                      <Lottie options={newCarOptions} height={300} width={300} />
                    ) : (
                      <Lottie options={defaultOptions} height={300} width={500} />
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* Google Maps Section */}
            <section className="py-12">
              <div className="container mx-auto">
                {loadingLocation ? (
                  <div>Loading map...</div>
                ) : error ? (
                  <div>{error}</div>
                ) : userLocation ? (
                  <LoadScript googleMapsApiKey={"AIzaSyCUA3uUquQ88On7YaIFbBpByARvNj64GAU"}>
                    <GoogleMap
                      mapContainerStyle={containerStyle}
                      center={userLocation}
                      zoom={15}
                    >
                      <Marker position={userLocation} />
                    </GoogleMap>
                  </LoadScript>
                ) : (
                  <div>Unable to retrieve location</div>
                )}
              </div>
            </section>

            {/* Features Section */}
            <section className="container mx-auto px-4 py-12">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900">Features</h2>
              </div>
              <div className="flex flex-wrap -mx-4 space-y-6 md:space-y-0">
                <div className="w-full md:w-1/3 px-4">
                  <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition">
                    <h3 className="text-xl font-bold mb-4">Real-time Availability</h3>
                    <p>Check parking spot availability in real-time.</p>
                  </div>
                </div>
                <div className="w-full md:w-1/3 px-4">
                  <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition">
                    <h3 className="text-xl font-bold mb-4">Easy Reservations</h3>
                    <p>Reserve a spot with just a few clicks.</p>
                  </div>
                </div>
                <div className="w-full md:w-1/3 px-4">
                  <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition">
                    <h3 className="text-xl font-bold mb-4">Secure Payments</h3>
                    <p>Make payments securely through our platform.</p>
                  </div>
                </div>
              </div>
            </section>
          </main>

          <footer className="bg-blue-900 text-white py-6">
            <div className="container mx-auto text-center">
              &copy; {new Date().getFullYear()} Smart Parking. All rights reserved.
            </div>
          </footer>
        </div>
      )}
    </div>
  );
};

export default CarAnimation;
