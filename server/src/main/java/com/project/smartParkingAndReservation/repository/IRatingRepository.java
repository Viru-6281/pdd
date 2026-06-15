package com.project.smartParkingAndReservation.repository;

import com.project.smartParkingAndReservation.entity.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IRatingRepository extends JpaRepository<Rating,Long>
{
    List<Rating> findByParkingPlaceId(Long parkingPlaceId);
    List<Rating> findByUserId(Long userId);
}
