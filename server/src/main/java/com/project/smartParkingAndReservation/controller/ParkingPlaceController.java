package com.project.smartParkingAndReservation.controller;

import com.project.smartParkingAndReservation.entity.Lender;
import com.project.smartParkingAndReservation.entity.ParkingPlace;
import com.project.smartParkingAndReservation.service.ILenderService;
import com.project.smartParkingAndReservation.service.IParkingPlaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/parking")
@CrossOrigin("*")
public class ParkingPlaceController
{
    @Autowired
    private IParkingPlaceService service;

    @Autowired
    private ILenderService lenderService;

    @PostMapping("/{lenderId}")
    public ResponseEntity<?> addParkingPlace(
            @PathVariable Long lenderId,
            @RequestParam String placeName,
            @RequestParam String latitude,
            @RequestParam String longitude,
            @RequestParam String areaName,
            @RequestParam String description,
            @RequestParam(required = false) MultipartFile image) {

        HashMap<String, Object> res = new HashMap<>();
        try {
            if (placeName.isEmpty() || latitude.isEmpty() || longitude.isEmpty() || areaName.isEmpty()) {
                res.put("success", false);
                res.put("msg", "Please fill in all required fields.");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);
            }

            Lender lender = lenderService.getLenderById(lenderId);
            if (lender == null)
            {
                res.put("success",false);
                res.put("msg","Lender is not found for provided id is"+lenderId);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(res);
            }

            String filepath = Paths.get("").toAbsolutePath().toString();
            Path imageFilePath = Paths.get(filepath, "src", "main", "resources", "static", "images", image.getOriginalFilename());
            String imageUrl = image.getOriginalFilename();
            image.transferTo(imageFilePath);

            // Create a new ParkingPlace object
            ParkingPlace parkingPlace = ParkingPlace.builder()
                    .placeName(placeName)
                    .areaName(areaName)
                    .description(description)
                    .latitude(latitude)
                    .longitude(longitude)
                    .isAvailable(true)
                    .image(imageUrl)
                    .lender(lender)
                    .build();

            service.addParkingPlaces(parkingPlace);

            res.put("success", true);
            res.put("msg", "Parking place added successfully.");
            return ResponseEntity.status(HttpStatus.CREATED).body(res);

        } catch (Exception e) {
    e.printStackTrace();

    res.put("success", false);
    res.put("msg", e.getMessage());

    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
}
    }

    @GetMapping
    private ResponseEntity<?> getAllParkingPlaces()
    {
        HashMap<String,Object> res = new HashMap<>();
        try
        {
            List<ParkingPlace> parkingPlaces = service.getAllParkingPlaces();
            res.put("success",true);
            res.put("parkingPlace",parkingPlaces);
            return ResponseEntity.status(HttpStatus.OK).body(res);
        }
        catch (Exception e)
        {
            res.put("success",false);
            res.put("err","Failed to fetch the parking places");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
        }
    }

    @GetMapping("/place/{lenderId}")
    private ResponseEntity<?> getParkingPlaceByLenderId(@PathVariable Long lenderId)
    {
        HashMap<String,Object> res = new HashMap<>();
        try
        {
            List<ParkingPlace> parkingPlaces = service.getParkingPlaceByLenderId(lenderId);
            res.put("success",true);
            res.put("parkingPlaces",parkingPlaces);
            return ResponseEntity.status(HttpStatus.OK).body(res);
        }
        catch (Exception e)
        {
            res.put("success",false);
            res.put("err","Parking places is not found for provided lender id is"+lenderId);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(res);
        }
    }

    @GetMapping("/area/{areaName}")
    public ResponseEntity<?> getParkingPlacesByArea(@PathVariable String areaName)
    {
        HashMap<String,Object> res = new HashMap<>();
        try
        {
            ParkingPlace parkingPlace = service.findByPlaceName(areaName);
            res.put("success",true);
            res.put("parkingPlace",parkingPlace);
            return ResponseEntity.status(HttpStatus.OK).body(res);
        }
        catch (Exception e)
        {
            res.put("success",false);
            res.put("err","Failed to found the parking place by provided parking place is"+areaName);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(res);
        }
    }

    @DeleteMapping("/delete/{id}")
    private ResponseEntity<?> deleteUserById(@PathVariable Long id)
    {
        HashMap<String,Object> res = new HashMap<>();
        try
        {
            service.deleteParkingPlaceById(id);
            res.put("success",true);
            res.put("msg","Parking Place deletes Successfully");
            return ResponseEntity.status(HttpStatus.OK).body(res);
        }
        catch (Exception e)
        {
            res.put("success",false);
            res.put("err","Failed to fetch the parking places for provided id is"+id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(res);
        }
    }

}
