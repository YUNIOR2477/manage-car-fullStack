package com.example.manage_cars.dtos.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NewUserDto {

    @NotBlank(message = "La contraseña no puede estar vacía")
    @Size(min = 8, message = "La contraseña debe tener al menos 8 caracteres")
    private String password;

    @NotBlank(message = "El correo electronico no puede estar vacío")
    @Email(message = "Formato de correo electrónico inválido")
    private String email;

    @NotBlank(message = "El nombre no puede estar vacío")
    @Size(min = 3, max = 50, message = "El nombre debe tener entre 3 y 50 caracteres")
    @Pattern(regexp = "^[A-Za-záéíóúÁÉÍÓÚüÜñÑ\\s-]+$", message = "El nombre solo puede contener letras, espacios y guiones")
    private String name;

    @NotBlank(message = "El apellido no puede estar vacío")
    @Size(min = 5, max = 50, message = "El apellido debe tener entre 5 y 50 caracteres")
    @Pattern(regexp = "^[A-Za-záéíóúÁÉÍÓÚüÜñÑ\\s-]+$", message = "El apellido solo puede contener letras, espacios y guiones")
    private String surname;

    private String role = "ROLE_USER";
}
