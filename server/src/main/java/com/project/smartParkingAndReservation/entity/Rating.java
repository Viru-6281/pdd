package com.project.smartParkingAndReservation.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Rating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int ratingValue;

    private String comment;

    @ManyToOne
    private User user;

    @ManyToOne
    private ParkingPlace parkingPlace;

    private LocalDateTime createdAt;
}
