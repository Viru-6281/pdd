package com.project.smartParkingAndReservation.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class LenderUpdateDto
{
    private String name;
    private String email;
    private String password;
    private String mobileNumber;
    private String address;
    private MultipartFile image;
}
