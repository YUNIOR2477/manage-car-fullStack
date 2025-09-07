package com.example.manage_cars.services.auth;

import com.example.manage_cars.dtos.auth.LoginDto;
import com.example.manage_cars.dtos.auth.NewUserDto;
import com.example.manage_cars.jwt.JwtUtil;
import com.example.manage_cars.models.Role;
import com.example.manage_cars.models.User;
import com.example.manage_cars.repositories.RoleRepository;
import com.example.manage_cars.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Date;

@Service
public class AuthService {

    private final AuthUserService authUserService;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    @Autowired
    public AuthService(AuthUserService userService, AuthUserService authUserService, UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil, AuthenticationManagerBuilder authenticationManagerBuilder) {
        this.authUserService = authUserService;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
    }

    public String authenticate(LoginDto loginDto) {
        try {
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword());
            Authentication authResult = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
            SecurityContextHolder.getContext().setAuthentication(authResult);

            User authUser = userRepository.findByEmail(loginDto.getEmail()).orElseThrow(() -> new EntityNotFoundException("No se encontró ningún usuario con el correo: " + loginDto.getEmail() + ". Verifica que el correo este correcto y vuelve a intentarlo."));

            authUser.setLastLogin(new Date());
            authUserService.save(authUser);

            return jwtUtil.generateToken(authResult);
        } catch (BadCredentialsException e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Usuario o contraseña incorrectos. Inténtalo nuevamente.");
        }
    }


    public void registerUser(NewUserDto newUserDto) {
        if (authUserService.existsByUserName(newUserDto.getEmail())) {
            throw new IllegalArgumentException("Este correo electronico ya existe en nuestra base de datos, inicie sesion o registrate con un nuevo correo electronico.");
        }

        Role userRole = roleRepository.findByName(newUserDto.getRole()).orElseThrow(() -> new RuntimeException("Rol no encontrado"));

        User authUser = new User();
        authUser.setEmail(newUserDto.getEmail());
        authUser.setPassword(passwordEncoder.encode(newUserDto.getPassword()));
        authUser.setName(newUserDto.getName());
        authUser.setSurname(newUserDto.getSurname());
        authUser.setLastLogin(new Date());
        authUser.setCreatedAt(new Date());
        authUser.setRole(userRole);
        authUserService.save(authUser);
    }
}

