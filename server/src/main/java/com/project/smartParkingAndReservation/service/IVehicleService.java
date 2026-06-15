package com.project.smartParkingAndReservation.service;

import com.project.smartParkingAndReservation.entity.Vehicle;

import java.util.List;

public interface IVehicleService
{
    void addVehicles(Vehicle vehicle);

    List<Vehicle> getAllVehicles();

    Vehicle getVehicleById(Long id);

    List<Vehicle> getVehicleByUserId(Long userId);

    void deleteVehicleById(Long id);
}
