package com.project.smartParkingAndReservation.service.impl;

import com.project.smartParkingAndReservation.entity.ParkingPlace;
import com.project.smartParkingAndReservation.repository.IParkingRepository;
import com.project.smartParkingAndReservation.service.IParkingPlaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ParkingPlaceService implements IParkingPlaceService
{
    @Autowired
    private IParkingRepository repository;

    @Override
    public void addParkingPlaces(ParkingPlace parkingPlace)
    {
        repository.save(parkingPlace);
    }

    @Override
    public List<ParkingPlace> getAllParkingPlaces() {
        return repository.findAll();
    }

    @Override
    public ParkingPlace findById(Long id) {
        return repository.findById(id).get();
    }

    @Override
    public void deleteParkingPlaceById(Long id) {
        repository.deleteById(id);
    }

    @Override
    public List<ParkingPlace> getParkingPlaceByLenderId(Long lenderId) {
        return repository.getParkingPlaceByLenderId(lenderId);
    }

    @Override
    public ParkingPlace findParkingPlaceByLenderId(Long lenderId) {
        return repository.findFirstByLenderId(lenderId);
    }

    @Override
    public ParkingPlace getParkingPlaceById(Long parkingPlaceId) {
        return repository.findById(parkingPlaceId).get();
    }

    @Override
    public ParkingPlace findByPlaceName(String areaName) {
        return repository.findByPlaceName(areaName);
    }
}
