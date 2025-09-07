package com.example.manage_cars.services.user;

import com.example.manage_cars.dtos.UserDto;
import org.springframework.data.domain.Page;

public interface IUserService {
    UserDto getMyProfile();

    void changeRole(Long userId, String role);

    void deleteUser(Long userId);

    UserDto getUserById(Long userid);

    Page<UserDto> getAllUsers(int page, int size);

    void updateProfile(UserDto user);
}
