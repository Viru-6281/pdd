package com.project.smartParkingAndReservation.service;

import com.project.smartParkingAndReservation.entity.ParkingPlace;

import java.util.List;

public interface IParkingPlaceService
{
    void addParkingPlaces(ParkingPlace parkingPlace);

    List<ParkingPlace> getAllParkingPlaces();

    ParkingPlace findById(Long id);

    void deleteParkingPlaceById(Long id);

    List<ParkingPlace> getParkingPlaceByLenderId(Long lenderId);

    ParkingPlace findParkingPlaceByLenderId(Long lenderId);

    ParkingPlace getParkingPlaceById(Long parkingPlaceId);

    ParkingPlace findByPlaceName(String areaName);
}
