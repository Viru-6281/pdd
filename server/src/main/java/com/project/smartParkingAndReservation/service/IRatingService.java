package com.project.smartParkingAndReservation.service;

import com.project.smartParkingAndReservation.entity.ParkingPlace;
import com.project.smartParkingAndReservation.entity.Rating;
import com.project.smartParkingAndReservation.entity.User;

import java.util.List;

public interface IRatingService
{

    Rating addRating(ParkingPlace parkingPlace, User user, int ratingValue, String comment);

    List<Rating> getAllRatings();

    List<Rating> getRatingsByParkingPlaceId(Long parkingPlaceId);

    List<Rating> getRatingsByUserId(Long userId);

    void deleteRatingById(Long id);
}
