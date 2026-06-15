package com.project.smartParkingAndReservation.controller;

import com.project.smartParkingAndReservation.entity.User;
import com.project.smartParkingAndReservation.entity.Vehicle;
import com.project.smartParkingAndReservation.service.IUserService;
import com.project.smartParkingAndReservation.service.IVehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/vehicle")
@CrossOrigin("*")
public class VehicleController
{
    @Autowired
    private IVehicleService vehicleService;

    @Autowired
    private IUserService userService;

    @PostMapping("/{userId}")
    private ResponseEntity<?> addVehicles(@PathVariable Long userId,
                                          String vehicleName,
                                          String vehicleNumber,
                                          MultipartFile image) throws IOException {
        HashMap<String,Object> res = new HashMap<>();
        try
        {
            User user = userService.getUserById(userId);
            if (user == null)
            {
                res.put("success",false);
                res.put("msg","User is not found for provided id is"+ userId);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(res);
            }

            String filepath = Paths.get("").toAbsolutePath().toString();
            Path imageFilePath = Paths.get(filepath, "src", "main", "resources", "static", "images", image.getOriginalFilename());
            String imageUrl = image.getOriginalFilename();
            image.transferTo(imageFilePath);

            Vehicle vehicle = Vehicle.builder()
                    .vehicleName(vehicleName)
                    .vehicleNumber(vehicleNumber)
                    .vehicleImage(imageUrl)
                    .owner(user)
                    .build();
            vehicleService.addVehicles(vehicle);

            res.put("success",true);
            res.put("msg","Vehicle Added Successfully");
            return ResponseEntity.status(HttpStatus.OK).body(res);

        }
        catch (Exception e)
        {
            res.put("success",false);
            res.put("msg","Failed to add the vehicle");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
        }
    }

    @GetMapping("/{userId}")
    private ResponseEntity<?> getUserVehicles(@PathVariable Long userId)
    {
        HashMap<String,Object> res = new HashMap<>();
        try
        {
            List<Vehicle> vehicles = vehicleService.getVehicleByUserId(userId);
            res.put("success",true);
            res.put("vehicles",vehicles);
            return ResponseEntity.status(HttpStatus.OK).body(res);
        }
        catch (Exception e)
        {
            res.put("success",false);
            res.put("msg","Failed to fetch the vehicles for provided user id is"+userId);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
        }
    }

    @DeleteMapping("/delete/{id}")
    private ResponseEntity<?> deleteVehicleByUserId(@PathVariable Long id)
    {
        HashMap<String,Object> res = new HashMap<>();
        try
        {
            vehicleService.deleteVehicleById(id);
            res.put("success",true);
            res.put("msg","Vehicle deleted successfully");
            return ResponseEntity.status(HttpStatus.OK).body(res);
        }
        catch (Exception e)
        {
            res.put("success",false);
            res.put("msg","Vehicle is not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(res);
        }
    }
}
