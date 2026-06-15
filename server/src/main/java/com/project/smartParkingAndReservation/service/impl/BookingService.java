package com.project.smartParkingAndReservation.service.impl;

import com.project.smartParkingAndReservation.entity.Booking;
import com.project.smartParkingAndReservation.entity.ParkingPlace;
import com.project.smartParkingAndReservation.entity.User;
import com.project.smartParkingAndReservation.repository.IBookingRepository;
import com.project.smartParkingAndReservation.service.IBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class BookingService implements IBookingService
{
    @Autowired
    private IBookingRepository bookingRepository;

    @Override
    public Booking bookParkingPlace(ParkingPlace parkingPlace, User user, LocalDateTime startTime, LocalDateTime endTime)
    {
        if (!parkingPlace.isAvailable()) {
            throw new IllegalStateException("Parking place is not available for booking.");
        }

        Booking booking = new Booking();
        booking.setParkingPlace(parkingPlace);
        booking.setUser(user);
        booking.setReservationTime(LocalDateTime.now());
        booking.setStatus("Pending");
        booking.setStartTime(startTime);
        booking.setEndTime(endTime);

        bookingRepository.save(booking);

        parkingPlace.getBookings().add(booking);

        parkingPlace.setAvailable(false);

        return booking;
    }

    @Override
    public void releaseParkingPlace(Booking booking) {
        booking.getParkingPlace().setAvailable(true);
        bookingRepository.delete(booking);
    }

    @Override
    public void updateBooking(Booking booking) {
        bookingRepository.save(booking);
    }

    @Override
    public List<Booking> findByUserId(Long userId) {
        return bookingRepository.findByUserId(userId);
    }

    @Override
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @Override
    public void deleteBookingById(Long id) {
        bookingRepository.deleteById(id);
    }

    @Override
    public Booking getBookingById(Long bookingId) {
        return bookingRepository.findById(bookingId).get();
    }

    @Override
    public List<Booking> getBookingByLenderId(Long lenderId) {
        return bookingRepository.findByParkingPlace_Lender_Id(lenderId);
    }
}
