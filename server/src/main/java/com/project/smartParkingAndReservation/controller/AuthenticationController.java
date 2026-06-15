package com.project.smartParkingAndReservation.controller;

import com.project.smartParkingAndReservation.dto.LoginDto;
import com.project.smartParkingAndReservation.entity.Lender;
import com.project.smartParkingAndReservation.entity.User;
import com.project.smartParkingAndReservation.service.ILenderService;
import com.project.smartParkingAndReservation.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping("/login")
@CrossOrigin("*")
public class AuthenticationController
{
    @Autowired
    private IUserService userService;

    @Autowired
    private ILenderService lenderService;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostMapping("/user")
    public ResponseEntity<?> userLogin(@RequestBody LoginDto user) {
        HashMap<String, Object> res = new HashMap<>();
        try {
            String email = user.getEmail();
            String password = user.getPassword();

            if (email.isEmpty() || password.isEmpty()) {
                res.put("success", false);
                res.put("msg", "Please fill required fields to login");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);
            }

            User authenticatedUser = userService.findByEmail(email);

            if (authenticatedUser == null || !passwordEncoder.matches(password, authenticatedUser.getPassword())) {
                res.put("success", false);
                res.put("msg", "Invalid email or password");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(res);
            }

            res.put("success", true);
            res.put("msg", "Login successful");
            res.put("user", authenticatedUser);
            return ResponseEntity.status(HttpStatus.OK).body(res);

        } catch (Exception e) {
            res.put("success", false);
            res.put("msg", "An error occurred during login");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
        }
    }

    @PostMapping("/lender")
    public ResponseEntity<?> lenderLogin(@RequestBody LoginDto user) {
        HashMap<String, Object> res = new HashMap<>();
        try {
            String email = user.getEmail();
            String password = user.getPassword();

            if (email.isEmpty() || password.isEmpty()) {
                res.put("success", false);
                res.put("msg", "Please fill required fields to login");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);
            }

            // Fetch the lender by email from the database
            Lender authenticatedLender = lenderService.findByEmail(email);

            // Check if lender exists and if the password matches the stored password
            if (authenticatedLender == null || !passwordEncoder.matches(password, authenticatedLender.getPassword())) {
                res.put("success", false);
                res.put("msg", "Invalid email or password");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(res);
            }

            res.put("success", true);
            res.put("msg", "Login successful");
            res.put("lender", authenticatedLender);
            return ResponseEntity.status(HttpStatus.OK).body(res);

        } catch (Exception e) {
            res.put("success", false);
            res.put("msg", "An error occurred during login");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
        }
    }


}
