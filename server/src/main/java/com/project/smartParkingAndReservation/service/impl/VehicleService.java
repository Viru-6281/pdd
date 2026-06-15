package com.project.smartParkingAndReservation.service.impl;

import com.project.smartParkingAndReservation.entity.Vehicle;
import com.project.smartParkingAndReservation.repository.IVehicleRepository;
import com.project.smartParkingAndReservation.service.IVehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VehicleService implements IVehicleService
{
    @Autowired
    private IVehicleRepository vehicleRepository;

    @Override
    public void addVehicles(Vehicle vehicle) {
        vehicleRepository.save(vehicle);
    }

    @Override
    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findAll();
    }

    @Override
    public Vehicle getVehicleById(Long id) {
        return vehicleRepository.findById(id).get();
    }

    @Override
    public List<Vehicle> getVehicleByUserId(Long userId) {
        return vehicleRepository.findByOwnerId(userId);
    }

    @Override
    public void deleteVehicleById(Long id) {
        vehicleRepository.deleteById(id);
    }
}
