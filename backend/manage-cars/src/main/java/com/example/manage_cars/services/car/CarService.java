package com.example.manage_cars.services.car;

import com.example.manage_cars.dtos.CarDto;
import com.example.manage_cars.models.Car;
import com.example.manage_cars.models.User;
import com.example.manage_cars.repositories.CarRepository;
import com.example.manage_cars.repositories.UserRepository;
import com.example.manage_cars.utils.DtoConverter;
import com.example.manage_cars.utils.GetCurrentUser;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class CarService implements ICarService {

    private final CarRepository carRepository;
    private final UserRepository userRepository;
    private final GetCurrentUser getCurrentUser;
    private final DtoConverter dtoConverter;

    public CarService(CarRepository carRepository, UserRepository userRepository, GetCurrentUser getCurrentUser, DtoConverter dtoConverter) {
        this.carRepository = carRepository;
        this.userRepository = userRepository;
        this.getCurrentUser = getCurrentUser;
        this.dtoConverter = dtoConverter;
    }

    @Transactional
    @Override
    public CarDto saveCar(CarDto carDto) {
        User user = getUser(getCurrentUser.getCurrentUserId());
        Car car = new Car();
        car.setBrand(carDto.getBrand());
        car.setColor(carDto.getColor());
        car.setModel(carDto.getModel());
        car.setYear(carDto.getYear());
        car.setPlateNumber(carDto.getPlateNumber());
        car.setRegisterAt(new Date());
        car.setUser(user);
        return dtoConverter.toCarDto(carRepository.save(car));
    }

    @Transactional
    @Override
    public CarDto updateCar(Long carId, CarDto carDto) {
        User user = getUser(getCurrentUser.getCurrentUserId());
        Car car = getCar(carId);
        if (user != car.getUser()) {
            throw new AccessDeniedException("No puedes modificar este carro porque no está asignado a tu cuenta.");
        }
        car.setBrand(carDto.getBrand());
        car.setColor(carDto.getColor());
        car.setModel(carDto.getModel());
        car.setYear(carDto.getYear());
        car.setPlateNumber(carDto.getPlateNumber());
        return dtoConverter.toCarDto(carRepository.save(car));
    }

    @Override
    public void deleteCar(Long carId) {
        User user = getUser(getCurrentUser.getCurrentUserId());
        Car car = getCar(carId);
        if (user != car.getUser()) {
            throw new AccessDeniedException("No puedes eliminar este carro porque no está asignado a tu cuenta.");
        }
        carRepository.delete(car);
    }

    @Override
    public CarDto getCarById(Long cardId) {
        return dtoConverter.toCarDto(getCar(cardId));
    }

    @Override
    public Page<CarDto> getAllCars(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return dtoConverter.toCarDtoPage(carRepository.findAll(pageable));
    }

    @Override
    public CarDto getByPlateNumber(String plateNumber) {
        return dtoConverter.toCarDto(carRepository.findByPlateNumber(plateNumber).orElseThrow(() -> new EntityNotFoundException("No se encontró ningún carro con la placa:" + plateNumber + ". Verifica que la placa este correcta y vuelve a intentarlo.")));

    }

    @Override
    public Page<CarDto> getByYear(String year, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return dtoConverter.toCarDtoPage(carRepository.findByYear(year, pageable));
    }

    @Override
    public Page<CarDto> getByBrand(String brand, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return dtoConverter.toCarDtoPage(carRepository.findByBrand(brand, pageable));
    }

    @Override
    public Page<CarDto> getByUserId(Long userId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return dtoConverter.toCarDtoPage(carRepository.findByUserId(userId, pageable));
    }

    @Override
    public Page<CarDto> getByModel(String model, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return dtoConverter.toCarDtoPage(carRepository.findByModel(model, pageable));
    }

    @Override
    public long getTotalCars() {
        return carRepository.countAllCars();
    }

    @Override
    public long getTotalCarsByUserId(Long userId) {
        return carRepository.countCarsByUserId(userId);
    }

    private User getUser(Long userId) {
        return userRepository.findById(userId).orElseThrow(() -> new EntityNotFoundException("No se encontró ningún usuario con el ID: " + userId + ". Verifica que el ID sea el correcto y vuelve a intentarlo."));
    }

    private Car getCar(Long carId) {
        return carRepository.findById(carId).orElseThrow(() -> new EntityNotFoundException("No se encontró ningún carro con el ID: " + carId + ". Verifica que el ID sea el correcto y vuelve a intentarlo."));
    }


}
