package com.project.smartParkingAndReservation.controller;

import com.project.smartParkingAndReservation.entity.ParkingPlace;
import com.project.smartParkingAndReservation.entity.Rating;
import com.project.smartParkingAndReservation.entity.User;
import com.project.smartParkingAndReservation.service.IParkingPlaceService;
import com.project.smartParkingAndReservation.service.IRatingService;
import com.project.smartParkingAndReservation.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/rating")
@CrossOrigin("*")
public class RatingController
{
    @Autowired
    private IRatingService ratingService;

    @Autowired
    private IParkingPlaceService parkingPlaceService;

    @Autowired
    private IUserService userService;

    @PostMapping("/add")
    public ResponseEntity<?> addRating(
            @RequestParam Long parkingPlaceId,
            @RequestParam Long userId,
            @RequestParam int ratingValue,
            @RequestParam String comment) {

        HashMap<String, Object> res = new HashMap<>();
        try {
            ParkingPlace parkingPlace = parkingPlaceService.getParkingPlaceById(parkingPlaceId);
            User user = userService.getUserById(userId);

            Rating rating = ratingService.addRating(parkingPlace, user, ratingValue, comment);

            res.put("success", true);
            res.put("msg", "Rating added successfully.");
            res.put("ratingId", rating.getId());
            return ResponseEntity.status(HttpStatus.CREATED).body(res);

        } catch (Exception e) {
            res.put("success", false);
            res.put("msg", "An error occurred while adding the rating.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<Rating>> getAllRatings() {
        List<Rating> ratings = ratingService.getAllRatings();
        return ResponseEntity.ok(ratings);
    }

    @GetMapping("/parking/{lenderId}")
    public ResponseEntity<HashMap<String, Object>> getRatingsByLenderId(@PathVariable Long lenderId) {
        HashMap<String, Object> res = new HashMap<>();
        try {
            // Fetch parking places associated with the lender ID
            List<ParkingPlace> parkingPlaces = parkingPlaceService.getParkingPlaceByLenderId(lenderId);

            // Initialize a list to hold ratings
            List<Rating> ratings = new ArrayList<>();

            // Fetch ratings for each parking place and add to the ratings list
            for (ParkingPlace parkingPlace : parkingPlaces) {
                List<Rating> placeRatings = ratingService.getRatingsByParkingPlaceId(parkingPlace.getId());
                ratings.addAll(placeRatings); // Combine ratings
            }

            // Add ratings to the response
            res.put("success", true);
            res.put("ratings", ratings);
            return ResponseEntity.ok(res);

        } catch (Exception e) {
            res.put("success", false);
            res.put("msg", "An error occurred while retrieving ratings.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
        }
    }


    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Rating>> getRatingsByUserId(@PathVariable Long userId) {
        List<Rating> ratings = ratingService.getRatingsByUserId(userId);
        return ResponseEntity.ok(ratings);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRating(@PathVariable Long id) {
        HashMap<String, Object> res = new HashMap<>();
        try {
            ratingService.deleteRatingById(id);
            res.put("success", true);
            res.put("msg", "Rating deleted successfully.");
            return ResponseEntity.status(HttpStatus.OK).body(res);
        } catch (Exception e) {
            res.put("success", false);
            res.put("msg", "An error occurred while deleting the rating.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
        }
    }
}
