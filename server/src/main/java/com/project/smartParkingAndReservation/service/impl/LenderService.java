package com.project.smartParkingAndReservation.service.impl;

import com.project.smartParkingAndReservation.entity.Lender;
import com.project.smartParkingAndReservation.repository.ILenderRepository;
import com.project.smartParkingAndReservation.service.ILenderService;
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
public class LenderService implements ILenderService
{
    @Autowired
    private ILenderRepository repository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Value("${user.image.directory}")
    private String imageDirectory;

    @Override
    public void lenderSignUp(String name,
                             String email,
                             String password,
                             String mobileNumber,
                             String address,
                             MultipartFile image) throws Exception
    {
        if (repository.existsByEmail(email)) {
            throw new IllegalArgumentException("Email already in use.");
        }

        String encodedPassword = passwordEncoder.encode(password);

        String imageUrl = null;
        if (image != null && !image.isEmpty()) {
            imageUrl = saveImage(image);
        }

        Lender lender = Lender.builder()
                .name(name)
                .email(email)
                .password(encodedPassword)
                .mobileNumber(mobileNumber)
                .address(address)
                .image(imageUrl)
                .build();

        repository.save(lender);
    }

    private String saveImage(MultipartFile image) throws IOException {
        try {
            Path directoryPath = Paths.get(imageDirectory);
            if (!Files.exists(directoryPath)) {
                Files.createDirectories(directoryPath);
            }

            String originalFilename = image.getOriginalFilename();
            String fileExtension = "";

            if (originalFilename != null && originalFilename.contains(".")) {
                fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
            }

            String uniqueFilename = UUID.randomUUID().toString() + fileExtension;
            Path imagePath = directoryPath.resolve(uniqueFilename);

            Files.copy(image.getInputStream(), imagePath, StandardCopyOption.REPLACE_EXISTING);

            return uniqueFilename;
        } catch (IOException e) {
            throw new IOException("Error occurred while saving the image", e);
        }
    }


    @Override
    public Lender lenderLogin(String email, String password) {
        return repository.findByEmailAndPassword(email, password);
    }

    @Override
    public List<Lender> getAllLenders() {
        return repository.findAll();
    }

    @Override
    public Lender getLenderById(Long id) {
        return repository.findById(id).get();
    }

    @Override
    @Transactional
    public void updateLenderById(Long lenderId,
                               String name,
                               String email,
                               String password,
                               String mobileNumber,
                               String address,
                               MultipartFile image) throws IOException {
        Lender existingLender = repository.findById(lenderId)
                .orElseThrow(() -> new ResourceNotFoundException("Lender not found with ID: " + lenderId));


        if (name != null && !name.trim().isEmpty()) {
            existingLender.setName(name.trim());
        }

        if (email != null && !email.trim().isEmpty()) {
            String trimmedEmail = email.trim();
            if (!existingLender.getEmail().equals(trimmedEmail) && repository.existsByEmail(trimmedEmail)) {
                throw new IllegalArgumentException("Email is already in use by another user.");
            }
            existingLender.setEmail(trimmedEmail);
        }

        if (password != null && !password.trim().isEmpty()) {
            String encodedPassword = passwordEncoder.encode(password.trim());
            existingLender.setPassword(encodedPassword);
        }

        if (mobileNumber != null && !mobileNumber.trim().isEmpty()) {
            existingLender.setMobileNumber(mobileNumber.trim());
        }

        if (address != null && !address.trim().isEmpty()) {
            existingLender.setAddress(address.trim());
        }

        if (image != null && !image.isEmpty()) {
            String imageUrl = saveImage(image);
            existingLender.setImage(imageUrl);
        }

        repository.save(existingLender);
    }

    @Override
    public void deleteLenderById(Long id) {
        repository.deleteById(id);
    }

    @Override
    public Lender findByEmail(String email) {
        return repository.findByEmail(email);
    }
}
