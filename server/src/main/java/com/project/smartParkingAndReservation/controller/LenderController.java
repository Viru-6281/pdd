package com.project.smartParkingAndReservation.controller;

import com.project.smartParkingAndReservation.dto.ApiResponse;
import com.project.smartParkingAndReservation.dto.LenderUpdateDto;
import com.project.smartParkingAndReservation.dto.UserUpdateDto;
import com.project.smartParkingAndReservation.entity.Lender;
import com.project.smartParkingAndReservation.entity.User;
import com.project.smartParkingAndReservation.service.ILenderService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/lender")
@CrossOrigin("*")
public class LenderController
{
    @Autowired
    private ILenderService service;

    @PostMapping("/signup")
    public ResponseEntity<ApiResponse> lenderSignUp(
            @RequestParam("name") @Valid @NotBlank(message = "Name is mandatory") String name,
            @RequestParam("email") @Valid @Email(message = "Email should be valid") String email,
            @RequestParam("password") @Valid @Size(min = 8, message = "Password must be at least 8 characters") String password,
            @RequestParam(value = "mobileNumber", required = false) String mobileNumber,
            @RequestParam(value = "address", required = false) String address,
            @RequestParam(value = "image", required = false) MultipartFile image) {

        ApiResponse response = new ApiResponse();

        try {
            service.lenderSignUp(name, email, password, mobileNumber, address, image);
            response.setSuccess(true);
            response.setMessage("Lender Registration Successful");
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (IllegalArgumentException ex) {
            response.setSuccess(false);
            response.setMessage(ex.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        } catch (Exception ex) {
            response.setSuccess(false);
            response.setMessage("An error occurred during registration.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PutMapping("/update/{lenderId}")
    public ResponseEntity<ApiResponse> updateLender(
            @PathVariable Long lenderId,
            @ModelAttribute @Valid LenderUpdateDto lenderUpdateDTO) {
        ApiResponse response = new ApiResponse();

        try {
            service.updateLenderById(
                    lenderId,
                    lenderUpdateDTO.getName(),
                    lenderUpdateDTO.getEmail(),
                    lenderUpdateDTO.getPassword(),
                    lenderUpdateDTO.getMobileNumber(),
                    lenderUpdateDTO.getAddress(),
                    lenderUpdateDTO.getImage()
            );
            response.setSuccess(true);
            response.setMessage("lender updated successfully.");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (IllegalArgumentException ex) {
            response.setSuccess(false);
            response.setMessage(ex.getMessage());
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        } catch (Exception ex) {
            response.setSuccess(false);
            response.setMessage("An error occurred during the update.");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    private ResponseEntity<?> getAllLenders()
    {
        HashMap<String,Object> res = new HashMap<>();
        try
        {
            List<Lender> lenders = service.getAllLenders();
            res.put("success",true);
            res.put("lender",lenders);
            return ResponseEntity.status(HttpStatus.OK).body(res);
        }
        catch (Exception e)
        {
            res.put("success",false);
            res.put("msg","Failed to fetch the available lenders");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
        }
    }

    @GetMapping("/{id}")
    private ResponseEntity<?> getLenderById(@PathVariable Long id)
    {
        HashMap<String,Object> res = new HashMap<>();
        try
        {
            Lender lender = service.getLenderById(id);
            res.put("success",true);
            res.put("lender",lender);
            return ResponseEntity.status(HttpStatus.OK).body(res);
        }
        catch (Exception e)
        {
            res.put("success",false);
            res.put("msg","Lender is not found for provided id is"+id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(res);
        }
    }

    @DeleteMapping("/delete/{id}")
    private ResponseEntity<?> deleteLenderById(@PathVariable Long id)
    {
        HashMap<String,Object> res = new HashMap<>();
        try
        {
            service.deleteLenderById(id);
            res.put("success",true);
            res.put("msg","Lender Deleted Successfully");
            return ResponseEntity.status(HttpStatus.OK).body(res);
        }
        catch (Exception e)
        {
            res.put("success",false);
            res.put("msg","Lender not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(res);
        }
    }
}
