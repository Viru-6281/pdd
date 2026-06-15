package com.project.smartParkingAndReservation.service.impl;

import com.project.smartParkingAndReservation.entity.User;
import com.project.smartParkingAndReservation.repository.IUserRepository;
import com.project.smartParkingAndReservation.service.IUserService;
import jakarta.transaction.Transactional;
import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

@Service
public class UserService implements IUserService {

    @Autowired
    private IUserRepository repository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Value("${user.image.directory}")
    private String imageDirectory;

    @Override
    public User userSignUp(String name,
                           String email,
                           String password,
                           String mobileNumber,
                           String address,
                           MultipartFile image) throws Exception {

        if (repository.existsByEmail(email)) {
            throw new IllegalArgumentException("Email already in use.");
        }

        String encodedPassword = passwordEncoder.encode(password);

        String imageUrl = null;

        if (image != null && !image.isEmpty()) {
            imageUrl = saveImage(image);
        }

        User user = User.builder()
                .name(name)
                .email(email)
                .password(encodedPassword)
                .mobileNumber(mobileNumber)
                .address(address)
                .image(imageUrl)
                .build();

        return repository.save(user);
    }

    @Override
    public User findByEmail(String email) {
        return repository.findByEmail(email);
    }

    @Override
    public User userLogin(String email, String password) {

        User user = repository.findByEmail(email);

        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
            return user;
        }

        return null;
    }

    private String saveImage(MultipartFile image) throws IOException {

        if (imageDirectory == null || imageDirectory.trim().isEmpty()) {
            throw new RuntimeException("Image directory is not configured.");
        }

        Path directoryPath = Paths.get(imageDirectory);

        if (!Files.exists(directoryPath)) {
            Files.createDirectories(directoryPath);
        }

        String originalFilename = image.getOriginalFilename();
        String fileExtension = "";

        if (originalFilename != null && originalFilename.contains(".")) {
            fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
        }

        String uniqueFilename = UUID.randomUUID() + fileExtension;

        Path imagePath = directoryPath.resolve(uniqueFilename);

        Files.copy(
                image.getInputStream(),
                imagePath,
                StandardCopyOption.REPLACE_EXISTING
        );

        return uniqueFilename;
    }

    @Override
    public List<User> getAllUsers() {
        return repository.findAll();
    }

    @Override
    public User getUserById(Long userId) {

        return repository.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found with ID: " + userId
                        )
                );
    }

    @Override
    @Transactional
    public void updateUserById(Long userId,
                               String name,
                               String email,
                               String password,
                               String mobileNumber,
                               String address,
                               MultipartFile image) throws IOException {

        User existingUser = repository.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found with ID: " + userId
                        )
                );

        if (name != null && !name.trim().isEmpty()) {
            existingUser.setName(name.trim());
        }

        if (email != null && !email.trim().isEmpty()) {

            String trimmedEmail = email.trim();

            if (!existingUser.getEmail().equals(trimmedEmail)
                    && repository.existsByEmail(trimmedEmail)) {

                throw new IllegalArgumentException(
                        "Email is already in use by another user."
                );
            }

            existingUser.setEmail(trimmedEmail);
        }

        if (password != null && !password.trim().isEmpty()) {
            existingUser.setPassword(
                    passwordEncoder.encode(password.trim())
            );
        }

        if (mobileNumber != null && !mobileNumber.trim().isEmpty()) {
            existingUser.setMobileNumber(mobileNumber.trim());
        }

        if (address != null && !address.trim().isEmpty()) {
            existingUser.setAddress(address.trim());
        }

        if (image != null && !image.isEmpty()) {
            existingUser.setImage(saveImage(image));
        }

        repository.save(existingUser);
    }

    @Override
    public void deleteUserById(Long id) {

        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException(
                    "User not found with ID: " + id
            );
        }

        repository.deleteById(id);
    }
}