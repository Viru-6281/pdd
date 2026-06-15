package com.project.smartParkingAndReservation.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Vehicle
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String vehicleName;
    private String vehicleNumber;
    private String vehicleImage;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User owner;
}