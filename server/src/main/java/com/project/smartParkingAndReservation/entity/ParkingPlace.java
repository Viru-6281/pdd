package com.project.smartParkingAndReservation.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ParkingPlace
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String placeName;
    private String latitude;
    private String longitude;
    private String areaName;
    private boolean isAvailable;
    private String description;
    private String image;

    @ManyToOne
    private Lender lender;

    @OneToMany
    private List<Booking> bookings;

    @OneToMany
    private List<Rating> ratings;
}
