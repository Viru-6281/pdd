import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import AxiosInstance from "../AxiosInstance";
import UserNavbar from "./UserNavbar";
import "../User/ViewMaps.css";

const ViewMap = () => {
  const [loadingLocation, setLoadingLocation] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [error, setError] = useState(null);
  const [parkingPlaces, setParkingPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [loadingPlaces, setLoadingPlaces] = useState(true);
  const [placeName, setPlaceName] = useState("");
  const [mapCenter, setMapCenter] = useState(null);
  const [mapInstance, setMapInstance] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCUA3uUquQ88On7YaIFbBpByARvNj64GAU",
  });

  const fetchParkingPlaces = async () => {
  try {
    const response = await AxiosInstance.get("/parking");

    console.log("========== PARKING RESPONSE ==========");
    console.log(response.data);
    console.log("Parking Places:", response.data.parkingPlace);

    if (response.data.success) {
      setParkingPlaces(response.data.parkingPlace || []);
      setFilteredPlaces(response.data.parkingPlace || []);
      setError(null);
    } else {
      setError("Failed to load parking places.");
    }
  } catch (err) {
    console.error("PARKING ERROR:", err);
    setError("An error occurred while fetching parking places.");
  } finally {
    setLoadingPlaces(false);
  }
};

  const fetchParkingPlacesByArea = async () => {
    setLoadingPlaces(true);

    const foundPlaces = parkingPlaces.filter((place) =>
      place.placeName
        .toLowerCase()
        .includes(placeName.toLowerCase())
    );

    if (foundPlaces.length > 0) {
      setFilteredPlaces(foundPlaces);
      setError(null);

      const firstPlace = foundPlaces[0];

      setMapCenter({
        lat: parseFloat(firstPlace.latitude),
        lng: parseFloat(firstPlace.longitude),
      });

      if (mapInstance) {
        mapInstance.setCenter({
          lat: parseFloat(firstPlace.latitude),
          lng: parseFloat(firstPlace.longitude),
        });

        placeMarkers(mapInstance);
      }
    } else {
      setFilteredPlaces([]);
      setError("No parking places found.");
    }

    setLoadingPlaces(false);
  };

  useEffect(() => {
    fetchParkingPlaces();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLoc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          setUserLocation(userLoc);
          setMapCenter(userLoc);
          setLoadingLocation(false);
        },
        () => {
          setError("Unable to retrieve location.");
          setLoadingLocation(false);
        }
      );
    } else {
      setError(
        "Geolocation is not supported by this browser."
      );
      setLoadingLocation(false);
    }
  }, []);

  const onMapLoad = (map) => {
    setMapInstance(map);

    if (userLocation) {
      new window.google.maps.Marker({
        position: userLocation,
        map: map,
        title: "Your Location",
      });
    }

    placeMarkers(map);
  };

  const placeMarkers = (map) => {
    filteredPlaces.forEach((place) => {
      const lat = parseFloat(place.latitude);
      const lng = parseFloat(place.longitude);

      const marker = new window.google.maps.Marker({
        position: { lat, lng },
        map: map,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: "#10b981",
          fillOpacity: 1,
          strokeWeight: 2,
          strokeColor: "#ffffff",
        },
        title: place.placeName || "Parking Place",
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="width:220px;padding:10px;">
            <h3 style="font-size:16px;font-weight:bold;margin-bottom:10px;">
              ${place.placeName}
            </h3>

            <img
              src="${
                place.image
                  ? `http://localhost:8080/images/${place.image}`
                  : "https://via.placeholder.com/200"
              }"
              style="width:100%;height:120px;object-fit:cover;border-radius:8px;"
            />

            <p style="margin-top:10px;">
              ${place.description || "No description available"}
            </p>

            <p>
              <strong>Area:</strong>
              ${place.areaName || "Unknown"}
            </p>

            <button
              onclick="navigateToBooking(${place.lender.id})"
              style="
                width:100%;
                margin-top:10px;
                background:#10b981;
                color:white;
                border:none;
                padding:10px;
                border-radius:8px;
                cursor:pointer;
              "
            >
              Book Parking
            </button>
          </div>
        `,
      });

      window.navigateToBooking = (lenderId) => {
        window.location.href = `/book-parking/${lenderId}`;
      };

      marker.addListener("click", () => {
        infoWindow.open({
          anchor: marker,
          map,
          shouldFocus: false,
        });
      });
    });
  };

  const handleSearch = () => {
    fetchParkingPlacesByArea();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black">
      <UserNavbar />

      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="text-center mb-10">
          <div className="w-24 h-24 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white text-4xl mx-auto shadow-lg">
            🗺️
          </div>

          <h1 className="text-5xl font-bold text-white mt-5">
            Smart Parking Map
          </h1>

          <p className="text-slate-400 mt-3 text-lg">
            Find and reserve parking spaces near you
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">

          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6">
            <h3 className="text-slate-400">
              Available Parking
            </h3>

            <p className="text-4xl font-bold text-emerald-400 mt-2">
              {filteredPlaces.length}
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6">
            <h3 className="text-slate-400">
              Search Status
            </h3>

            <p className="text-4xl font-bold text-cyan-400 mt-2">
              Active
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6">
            <h3 className="text-slate-400">
              Location Service
            </h3>

            <p className="text-4xl font-bold text-purple-400 mt-2">
              ON
            </p>
          </div>

        </div>

        <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 mb-8">

          <div className="flex flex-col md:flex-row gap-4">

            <input
              type="text"
              value={placeName}
              onChange={(e) =>
                setPlaceName(e.target.value)
              }
              placeholder="Search parking place..."
              className="flex-1 px-5 py-4 bg-slate-800 border border-slate-700 rounded-2xl text-white placeholder-slate-500"
            />

            <button
              onClick={handleSearch}
              className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl font-semibold"
            >
              Search
            </button>

          </div>

        </div>

        {loadingLocation || loadingPlaces ? (
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-10 text-center">
            <p className="text-slate-300 text-lg">
              Loading parking map...
            </p>
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/40 text-red-400 p-6 rounded-3xl">
            {error}
          </div>
        ) : userLocation && isLoaded ? (
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-4">

            <GoogleMap
              mapContainerStyle={{
                width: "100%",
                height: "75vh",
                borderRadius: "20px",
              }}
              center={mapCenter || userLocation}
              zoom={12}
              onLoad={onMapLoad}
            />

          </div>
        ) : (
          <div className="bg-yellow-500/10 border border-yellow-500/40 text-yellow-400 p-6 rounded-3xl">
            Unable to retrieve location
          </div>
        )}

      </div>
    </div>
  );
};

export default ViewMap;