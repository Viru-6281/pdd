package com.project.smartParkingAndReservation.repository;

import com.project.smartParkingAndReservation.entity.ParkingPlace;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IParkingRepository extends JpaRepository<ParkingPlace,Long> {
    List<ParkingPlace> getParkingPlaceByLenderId(Long lenderId);

    ParkingPlace findFirstByLenderId(Long lenderId);

    ParkingPlace findByPlaceName(String placeName);
}
