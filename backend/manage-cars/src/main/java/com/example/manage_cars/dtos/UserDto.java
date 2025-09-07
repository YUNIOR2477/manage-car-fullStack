package com.example.manage_cars.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {

    private Long id;

    @NotBlank(message = "El nombre no puede estar vacío")
    @Size(min = 3, max = 50, message = "El nombre debe tener entre 3 y 50 caracteres")
    @Pattern(regexp = "^[A-Za-záéíóúÁÉÍÓÚüÜñÑ\\s-]+$", message = "El nombre solo puede contener letras, espacios y guiones")
    private String name;

    @NotBlank(message = "El apellido no puede estar vacío")
    @Size(min = 5, max = 50, message = "El apellido debe tener entre 5 y 50 caracteres")
    @Pattern(regexp = "^[A-Za-záéíóúÁÉÍÓÚüÜñÑ\\s-]+$", message = "El apellido solo puede contener letras, espacios y guiones")
    private String surname;

    @NotBlank(message = "El correo electronico no puede estar vacío")
    @Email(message = "Formato de correo electrónico inválido")
    private String email;

    private List<Long> carsId = new ArrayList<>();

    private String role;

    private Date createdAt;

    private Date lastLogin;
}
