package com.project.smartParkingAndReservation.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    private String password;
    private String mobileNumber;
    private String address;
    private String image;

    @OneToMany(mappedBy = "owner")
    @JsonIgnore
    private List<Vehicle> vehicles;

    @OneToMany
    @JsonIgnore
    private List<Rating> ratings;
}
