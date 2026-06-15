package com.project.smartParkingAndReservation.service.impl;

import com.project.smartParkingAndReservation.entity.ParkingPlace;
import com.project.smartParkingAndReservation.entity.Rating;
import com.project.smartParkingAndReservation.entity.User;
import com.project.smartParkingAndReservation.repository.IRatingRepository;
import com.project.smartParkingAndReservation.service.IRatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class RatingService implements IRatingService
{
    @Autowired
    private IRatingRepository ratingRepository;

    @Override
    public Rating addRating(ParkingPlace parkingPlace, User user, int ratingValue, String comment) {
        Rating rating = new Rating();
        rating.setParkingPlace(parkingPlace);
        rating.setUser(user);
        rating.setRatingValue(ratingValue);
        rating.setComment(comment);
        rating.setCreatedAt(LocalDateTime.now());

        return ratingRepository.save(rating);
    }

    @Override
    public List<Rating> getAllRatings() {
        return ratingRepository.findAll();
    }

    @Override
    public List<Rating> getRatingsByParkingPlaceId(Long parkingPlaceId) {
        return ratingRepository.findByParkingPlaceId(parkingPlaceId);
    }

    @Override
    public List<Rating> getRatingsByUserId(Long userId) {
        return ratingRepository.findByUserId(userId);
    }

    @Override
    public void deleteRatingById(Long id) {
        ratingRepository.deleteById(id);
    }
}
