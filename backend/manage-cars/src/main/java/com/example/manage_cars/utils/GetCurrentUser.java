package com.example.manage_cars.utils;

import com.example.manage_cars.models.User;
import com.example.manage_cars.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class GetCurrentUser {

    private final UserRepository userRepository;

    public GetCurrentUser(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Long getCurrentUserId() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado con correo: " + email));

        return user.getId();
    }
}
