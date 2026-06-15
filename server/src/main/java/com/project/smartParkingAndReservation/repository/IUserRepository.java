package com.project.smartParkingAndReservation.repository;

import com.project.smartParkingAndReservation.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IUserRepository extends JpaRepository<User,Long> {
    boolean existsByEmail(String email);

    User findByEmail(String email);

    User findByEmailAndPassword(String email,String password);
}
