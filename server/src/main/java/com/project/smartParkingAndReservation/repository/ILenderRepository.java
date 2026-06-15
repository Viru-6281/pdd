package com.project.smartParkingAndReservation.repository;

import com.project.smartParkingAndReservation.entity.Lender;
import com.project.smartParkingAndReservation.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ILenderRepository extends JpaRepository<Lender,Long>
{
    boolean existsByEmail(String email);

    Lender findByEmail(String email);

    Lender findByEmailAndPassword(String email, String password);
}
