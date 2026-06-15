package com.project.smartParkingAndReservation.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserUpdateDto
{
    private String name;
    private String email;
    private String password;
    private String mobileNumber;
    private String address;
    private MultipartFile image;
}
