package com.example.manage_cars.services.car;

import com.example.manage_cars.dtos.CarDto;
import org.springframework.data.domain.Page;

public interface ICarService {
    CarDto saveCar(CarDto carDto);

    CarDto updateCar(Long carId, CarDto carDto);

    void deleteCar(Long carId);

    CarDto getCarById(Long carId);

    Page<CarDto> getAllCars(int page, int size);

    CarDto getByPlateNumber(String plateNumber);

    Page<CarDto> getByYear(String year,int page, int size);

    Page<CarDto> getByBrand(String brand,int page, int size);

    Page<CarDto> getByUserId(Long userId,int page, int size);

    Page<CarDto> getByModel(String model,int page, int size);

    long getTotalCars();

    long getTotalCarsByUserId(Long userId);
}
