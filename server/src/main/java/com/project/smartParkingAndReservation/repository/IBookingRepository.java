package com.project.smartParkingAndReservation.repository;

import com.project.smartParkingAndReservation.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IBookingRepository extends JpaRepository<Booking,Long> {
    List<Booking> findByParkingPlace_Lender_Id(Long lenderId);

    List<Booking> findByUserId(Long userId);
}
