package com.project.smartParkingAndReservation.controller;

import com.project.smartParkingAndReservation.entity.Booking;
import com.project.smartParkingAndReservation.entity.ParkingPlace;
import com.project.smartParkingAndReservation.entity.User;
import com.project.smartParkingAndReservation.service.IBookingService;
import com.project.smartParkingAndReservation.service.ILenderService;
import com.project.smartParkingAndReservation.service.IParkingPlaceService;
import com.project.smartParkingAndReservation.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/booking")
@CrossOrigin("*")
public class BookingController
{
    @Autowired
    private IBookingService service;

    @Autowired
    private ILenderService lenderService;

    @Autowired
    private IParkingPlaceService parkingPlaceService;

    @Autowired
    private IUserService userService;

    @PostMapping("/parking/{lenderId}/book")
    public ResponseEntity<?> bookParkingPlace(
            @PathVariable Long lenderId,
            @RequestParam Long userId,
            @RequestParam LocalDateTime startTime,
            @RequestParam LocalDateTime endTime) {

        HashMap<String, Object> res = new HashMap<>();
        try {
            ParkingPlace parkingPlace = parkingPlaceService.findParkingPlaceByLenderId(lenderId);

            User user = userService.getUserById(userId);

            Booking booking = service.bookParkingPlace(parkingPlace,user,startTime, endTime);

            res.put("success", true);
            res.put("msg", "Parking place booked successfully.");
            res.put("bookingId", booking.getId());
            return ResponseEntity.status(HttpStatus.CREATED).body(res);

        } catch (IllegalStateException e) {
            res.put("success", false);
            res.put("msg", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);
        } catch (Exception e) {
            res.put("success", false);
            res.put("msg", "An error occurred while booking the parking place.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
        }
    }

    @PostMapping("/release/{bookingId}")
    public ResponseEntity<?> releaseParkingPlace(@PathVariable Long bookingId) {
        HashMap<String, Object> res = new HashMap<>();
        try {
            Booking booking = service.getBookingById(bookingId);
            service.releaseParkingPlace(booking);

            res.put("success", true);
            res.put("msg", "Parking place released successfully.");
            return ResponseEntity.status(HttpStatus.OK).body(res);

        } catch (IllegalArgumentException e) {
            res.put("success", false);
            res.put("msg", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(res);
        } catch (Exception e) {
            res.put("success", false);
            res.put("msg", "An error occurred while releasing the parking place.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
        }
    }

    @PostMapping("/update/status/{bookingId}")
    public ResponseEntity<?> updateBooking(@PathVariable Long bookingId,@RequestParam String status)
    {
        HashMap<String, Object> res = new HashMap<>();
        try {
            Booking booking = service.getBookingById(bookingId);
            booking.setStatus(status);
            service.updateBooking(booking);
            res.put("success", true);
            res.put("msg", "Booking Updated successfully.");
            return ResponseEntity.status(HttpStatus.OK).body(res);

        } catch (IllegalArgumentException e) {
            res.put("success", false);
            res.put("msg", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(res);
        } catch (Exception e) {
            res.put("success", false);
            res.put("msg", "An error occurred while booking the place.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getBookingsByUserId(@PathVariable Long userId)
    {
        HashMap<String,Object> res = new HashMap<>();
        try
        {
            List<Booking> bookings = service.findByUserId(userId);
            res.put("success",true);
            res.put("bookings",bookings);
            return ResponseEntity.status(HttpStatus.OK).body(res);
        }
        catch (Exception e)
        {
            res.put("success",false);
            res.put("err","Failed to fetch the user bookings"+userId);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(res);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllBookings() {
        HashMap<String,Object> res = new HashMap<>();
        try
        {
            List<Booking> bookings = service.getAllBookings();
            res.put("success",true);
            res.put("bookings",bookings);
            return ResponseEntity.status(HttpStatus.OK).body(res);
        }
        catch (Exception e)
        {
            res.put("success",false);
            res.put("err","Failed to fetch the user bookings");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBooking(@PathVariable Long id) {
        HashMap<String, Object> res = new HashMap<>();
        try {
            service.deleteBookingById(id);
            res.put("success", true);
            res.put("msg", "Booking deleted successfully.");
            return ResponseEntity.status(HttpStatus.OK).body(res);

        } catch (IllegalArgumentException e) {
            res.put("success", false);
            res.put("msg", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(res);
        } catch (Exception e) {
            res.put("success", false);
            res.put("msg", "An error occurred while deleting the booking.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
        }
    }

    @GetMapping("/lender/{lenderId}")
    public ResponseEntity<?> getBookingByLenderId(@PathVariable Long lenderId) {
        HashMap<String, Object> res = new HashMap<>();
        try {
            List<Booking> bookings = service.getBookingByLenderId(lenderId);
            res.put("success",true);
            res.put("bookings",bookings);
            return ResponseEntity.ok(res);
        } catch (IllegalArgumentException e) {
            res.put("success", false);
            res.put("msg", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(res);
        } catch (Exception e) {
            res.put("success", false);
            res.put("msg", "An error occurred while retrieving the booking.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getBookingById(@PathVariable Long id) {
        HashMap<String, Object> res = new HashMap<>();
        try {
            Booking booking = service.getBookingById(id);
            return ResponseEntity.ok(booking);
        } catch (IllegalArgumentException e) {
            res.put("success", false);
            res.put("msg", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(res);
        } catch (Exception e) {
            res.put("success", false);
            res.put("msg", "An error occurred while retrieving the booking.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
        }
    }
}
