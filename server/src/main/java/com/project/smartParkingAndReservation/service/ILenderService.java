package com.project.smartParkingAndReservation.service;

import com.project.smartParkingAndReservation.entity.Lender;
import jakarta.transaction.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ILenderService
{


    void lenderSignUp(String name,
                      String email,
                      String password,
                      String mobileNumber,
                      String address,
                      MultipartFile image) throws Exception;

    Lender lenderLogin(String email, String password);

    List<Lender> getAllLenders();

    Lender getLenderById(Long id);


    @Transactional
    void updateLenderById(Long lenderId,
                          String name,
                          String email,
                          String password,
                          String mobileNumber,
                          String address,
                          MultipartFile image) throws IOException;

    void deleteLenderById(Long id);

    Lender findByEmail(String email);
}
