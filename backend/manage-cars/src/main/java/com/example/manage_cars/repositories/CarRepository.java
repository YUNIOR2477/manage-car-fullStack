package com.example.manage_cars.repositories;

import com.example.manage_cars.models.Car;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CarRepository extends JpaRepository<Car, Long> {
    Optional<Car> findByPlateNumber(String plateNumber);

    Page<Car> findByYear(String year, Pageable pageable);

    Page<Car> findByBrand(String brand, Pageable pageable);

    Page<Car> findByUserId(Long userId, Pageable pageable);

    Page<Car> findByModel(String model, Pageable pageable);

    @Query("SELECT COUNT(c) FROM Car c")
    long countAllCars();

    @Query("SELECT COUNT(c) FROM Car c WHERE c.user.id = :userId")
    long countCarsByUserId(Long userId);


}
