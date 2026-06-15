package com.project.smartParkingAndReservation.service;

import com.project.smartParkingAndReservation.entity.Booking;
import com.project.smartParkingAndReservation.entity.ParkingPlace;
import com.project.smartParkingAndReservation.entity.User;

import java.time.LocalDateTime;
import java.util.List;

public interface IBookingService
{
    Booking bookParkingPlace(ParkingPlace parkingPlace, User user, LocalDateTime startTime, LocalDateTime endTime);

    void releaseParkingPlace(Booking booking);

    void updateBooking(Booking booking);

    List<Booking> findByUserId(Long userId);

    List<Booking> getAllBookings();

    void deleteBookingById(Long id);

    Booking getBookingById(Long bookingId);

    List<Booking> getBookingByLenderId(Long lenderId);
}
