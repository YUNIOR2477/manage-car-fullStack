package com.example.manage_cars.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CarDto {
    private Long id;

    @NotBlank(message = "La marca del vehiculo no debe de estar vacia.")
    @Size(min = 3, max = 50, message = "La marca del vehiculo debe tener entre 3 y 50 caracteres")
    private String brand;

    @NotBlank(message = "El modelo del vehiculo no debe de estar vacio.")
    @Size(min = 3, max = 50, message = "El modelo del vehiculo debe tener entre 3 y 50 caracteres")
    private String model;

    @NotBlank(message = "El año del vehiculo no debe de estar vacio.")
    @Size(min = 4, max = 5, message = "El año del vehiculo debe tener entre 4 y 5 caracteres")
    private String year;

    @NotBlank(message = "La placa del vehiculo no debe de estar vacia.")
    @Size(min = 4, max = 20, message = "La placa del vehiculo debe tener entre 4 y 20 caracteres")
    private String plateNumber;

    @NotBlank(message = "El color del vehiculo no debe de estar vacio.")
    @Size(min = 3, max = 50, message = "El color del vehiculo debe tener entre 3 y 50 caracteres")
    private String color;

    private Long userId;

    private Date registerAt;


}
