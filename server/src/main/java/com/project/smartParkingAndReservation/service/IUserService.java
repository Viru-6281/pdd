package com.project.smartParkingAndReservation.service;

import com.project.smartParkingAndReservation.entity.User;
import jakarta.transaction.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface IUserService
{
    User userSignUp(String name,
                    String email,
                    String password,
                    String mobileNumber,
                    String address,
                    MultipartFile image) throws Exception;

    User findByEmail(String email);

    User userLogin(String email,String password);

    List<User> getAllUsers();

    User getUserById(Long userId);

    @Transactional
    void updateUserById(Long userId,
                        String name,
                        String email,
                        String password,
                        String mobileNumber,
                        String address,
                        MultipartFile image) throws IOException;

    void deleteUserById(Long id);
}
