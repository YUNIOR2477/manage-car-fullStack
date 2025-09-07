package com.example.manage_cars.controllers;


import com.example.manage_cars.dtos.auth.LoginDto;
import com.example.manage_cars.dtos.auth.NewUserDto;
import com.example.manage_cars.services.auth.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@Valid @RequestBody LoginDto loginDto) {
        String jwt = authService.authenticate(loginDto);
        return ResponseEntity.ok(jwt);
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@Valid @RequestBody NewUserDto newUserDto) {
        authService.registerUser(newUserDto);
        return ResponseEntity.status(HttpStatus.CREATED).body("Usuario registrado correctamente.");
    }
}
