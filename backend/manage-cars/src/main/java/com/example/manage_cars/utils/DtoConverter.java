package com.example.manage_cars.utils;

import com.example.manage_cars.dtos.UserDto;
import com.example.manage_cars.dtos.CarDto;
import com.example.manage_cars.models.Car;
import com.example.manage_cars.models.User;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class DtoConverter {

    public UserDto toUserDto(User user) {
        if (user == null) {
            throw new IllegalArgumentException("El usuario no puede ser nulo");
        }
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setSurname(user.getSurname());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole().getName());
        dto.setCarsId(user.getCars() != null ? user.getCars().stream().map(Car::getId).toList() : new ArrayList<>());
        dto.setCreatedAt(user.getCreatedAt());
        dto.setLastLogin(user.getLastLogin());
        return dto;
    }

    public Page<UserDto> toUserDtoPage(Page<User> user) {
        return user.map(this::toUserDto);
    }

    public CarDto toCarDto(Car car) {
        if (car == null) {
            throw new IllegalArgumentException("El carro no puede ser nulo");
        }
        CarDto dto = new CarDto();
        dto.setId(car.getId());
        dto.setBrand(car.getBrand());
        dto.setColor(car.getColor());
        dto.setModel(car.getModel());
        dto.setYear(car.getYear());
        dto.setPlateNumber(car.getPlateNumber());
        dto.setRegisterAt(car.getRegisterAt());
        dto.setUserId(car.getUser().getId());
        return dto;
    }

    public Page<CarDto> toCarDtoPage(Page<Car> car) {
        return car.map(this::toCarDto);
    }


}
