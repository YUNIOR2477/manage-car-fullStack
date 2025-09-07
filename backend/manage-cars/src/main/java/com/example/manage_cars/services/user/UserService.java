package com.example.manage_cars.services.user;

import com.example.manage_cars.dtos.UserDto;
import com.example.manage_cars.dtos.auth.NewUserDto;
import com.example.manage_cars.models.Role;
import com.example.manage_cars.models.User;
import com.example.manage_cars.repositories.RoleRepository;
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

@Service
public class UserService implements IUserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final DtoConverter dtoConverter;
    private final GetCurrentUser getCurrentUser;

    public UserService(UserRepository userRepository, RoleRepository roleRepository, DtoConverter dtoConverter, GetCurrentUser getCurrentUser) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.dtoConverter = dtoConverter;
        this.getCurrentUser = getCurrentUser;
    }

    @Override
    public UserDto getMyProfile() {
        return dtoConverter.toUserDto(getUser(getCurrentUser.getCurrentUserId()));
    }

    @Transactional
    @Override
    public void changeRole(Long userId, String role) {
        User admin = getUser(getCurrentUser.getCurrentUserId());
        if (!admin.getRole().getName().equals("ROLE_ADMIN")) {
            throw new AccessDeniedException("Solo un usuario con rol de admin puede editar los roles de un usuario.");
        }
        Role rol = roleRepository.findByName(role).orElseThrow(() -> new EntityNotFoundException("Rol no encontrado."));
        User user = getUser(userId);
        user.setRole(rol);
        userRepository.save(user);
    }

    @Override
    public void deleteUser(Long userId) {
        User admin = getUser(getCurrentUser.getCurrentUserId());
        if (!admin.getRole().getName().equals("ROLE_ADMIN")) {
            throw new AccessDeniedException("Solo un usuario con rol de admin puede eliminar un usuario.");
        }
        userRepository.deleteById(userId);
    }

    @Override
    public UserDto getUserById(Long userid) {
        return dtoConverter.toUserDto(getUser(userid));
    }

    @Override
    public Page<UserDto> getAllUsers(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return dtoConverter.toUserDtoPage(userRepository.findAll(pageable));
    }

    @Transactional
    @Override
    public void updateProfile(UserDto user) {
        User userUpdate = getUser(getCurrentUser.getCurrentUserId());
        userUpdate.setName(user.getName());
        userUpdate.setEmail(user.getEmail());
        userUpdate.setSurname((user.getSurname()));
        userRepository.save(userUpdate);
    }

    private User getUser(Long userId) {
        return userRepository.findById(userId).orElseThrow(() ->
                new EntityNotFoundException("No se encontró ningún usuario con el ID: " + userId + ". Verifica que el ID sea el correcto y vuelve a intentarlo."));
    }
}
