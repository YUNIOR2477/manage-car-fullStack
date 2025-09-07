package com.example.manage_cars.controllers;

import com.example.manage_cars.dtos.CarDto;
import com.example.manage_cars.services.car.ICarService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/api/v1/cars")
public class CarController {

    private final ICarService carService;

    public CarController(ICarService carService) {
        this.carService = carService;
    }

    @PostMapping
    public ResponseEntity<CarDto> saveCar(@Valid @RequestBody CarDto carDto) {
        CarDto saveCar = carService.saveCar(carDto);
        URI location = URI.create("/api/v1/cars/" + saveCar.getId());
        return ResponseEntity.created(location).body(saveCar);
    }

    @PutMapping("/{carId}")
    public ResponseEntity<CarDto> updateCar(@PathVariable Long carId, @Valid @RequestBody CarDto carDto) {
        return ResponseEntity.ok(carService.updateCar(carId, carDto));
    }

    @DeleteMapping("/{carId}")
    public ResponseEntity<Void> deleteCar(@PathVariable Long carId) {
        carService.deleteCar(carId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{carId}")
    public ResponseEntity<CarDto> getCardById(@PathVariable Long carId) {
        return ResponseEntity.ok(carService.getCarById(carId));
    }

    @GetMapping
    public ResponseEntity<Page<CarDto>> getAllCars(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(carService.getAllCars(page, size));
    }

    @GetMapping("/plate/{plateNumber}")
    public ResponseEntity<CarDto> getByPlateNumber(@PathVariable String plateNumber) {
        return ResponseEntity.ok(carService.getByPlateNumber(plateNumber));
    }

    @GetMapping("/year/{year}")
    public ResponseEntity<Page<CarDto>> getByYear(@PathVariable String year, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(carService.getByYear(year, page, size));
    }

    @GetMapping("/brand/{brand}")
    public ResponseEntity<Page<CarDto>> getByBrand(@PathVariable String brand, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(carService.getByBrand(brand, page, size));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Page<CarDto>> getByUserId(@PathVariable Long userId, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(carService.getByUserId(userId, page, size));
    }

    @GetMapping("/model/{model}")
    public ResponseEntity<Page<CarDto>> getByModel(@PathVariable String model, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(carService.getByModel(model, page, size));
    }

    @GetMapping("/count")
    public ResponseEntity<Long> countAllCars() {
        return ResponseEntity.ok(carService.getTotalCars());
    }

    @GetMapping("/count/{userId}")
    public ResponseEntity<Long> countAllCarsByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(carService.getTotalCarsByUserId(userId));
    }
}
