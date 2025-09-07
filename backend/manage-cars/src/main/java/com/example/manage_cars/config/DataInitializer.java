package com.example.manage_cars.config;

import com.example.manage_cars.models.Car;
import com.example.manage_cars.models.Role;
import com.example.manage_cars.models.User;
import com.example.manage_cars.repositories.CarRepository;
import com.example.manage_cars.repositories.RoleRepository;
import com.example.manage_cars.repositories.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataInitializer {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final CarRepository carRepository;
    private final PasswordEncoder passwordEncoder;


    @PostConstruct
    public void initData() {
        Role roleUser = roleRepository.findByName("ROLE_USER")
                .orElseGet(() -> roleRepository.save(new Role(null, "ROLE_USER")));

        List<User> users = List.of(
                new User(null, "Yunior", "Gonzalez", "yunior@gmail.com", passwordEncoder.encode("123456789"), new ArrayList<>(), roleUser, new Date(), new Date()),
                new User(null, "Jesus", "Murillo", "jesus@gmail.com", passwordEncoder.encode("123456789"), new ArrayList<>(), roleUser, new Date(), new Date()),
                new User(null, "Carlos", "Perez", "carlos@gmail.com", passwordEncoder.encode("123456789"), new ArrayList<>(), roleUser, new Date(), new Date()),
                new User(null, "Miguel", "Lopez", "miguel@gmail.com", passwordEncoder.encode("123456789"), new ArrayList<>(), roleUser, new Date(), new Date()),
                new User(null, "Luis", "Paz", "luis@gmail.com", passwordEncoder.encode("123456789"), new ArrayList<>(), roleUser, new Date(), new Date()),
                new User(null, "Fernando", "Arias", "fernando@gmail.com", passwordEncoder.encode("123456789"), new ArrayList<>(), roleUser, new Date(), new Date()),
                new User(null, "Andres", "Alzate", "andres@gmail.com", passwordEncoder.encode("123456789"), new ArrayList<>(), roleUser, new Date(), new Date()),
                new User(null, "Alejandro", "Gomez", "alejandro@gmail.com", passwordEncoder.encode("123456789"), new ArrayList<>(), roleUser, new Date(), new Date())
        );

        userRepository.saveAll(users);

        List<Car> cars = List.of(
                new Car(null, "Mazda", "CX-30", "2023", "ABC101", "Blanco", users.get(0), new Date()),
                new Car(null, "Toyota", "Hilux", "2022", "XYZ202", "Gris", users.get(1), new Date()),
                new Car(null, "Chevrolet", "Onix", "2021", "LMN303", "Rojo", users.get(2), new Date()),
                new Car(null, "Renault", "Kwid", "2020", "JKL404", "Azul", users.get(3), new Date()),
                new Car(null, "Ford", "Escape", "2023", "QWE505", "Negro", users.get(4), new Date()),
                new Car(null, "Kia", "Sportage", "2022", "RTY606", "Verde", users.get(5), new Date()),
                new Car(null, "Hyundai", "Tucson", "2021", "UIO707", "Plata", users.get(6), new Date()),
                new Car(null, "Nissan", "Versa", "2020", "PAS808", "Amarillo", users.get(7), new Date()),
                new Car(null, "Volkswagen", "T-Cross", "2023", "ZXC909", "Naranja", users.get(0), new Date()),
                new Car(null, "Peugeot", "2008", "2022", "BNM010", "Vino", users.get(1), new Date()),
                new Car(null, "Subaru", "Forester", "2021", "HJK111", "Azul", users.get(2), new Date()),
                new Car(null, "BMW", "X1", "2020", "CVB212", "Blanco", users.get(3), new Date()),
                new Car(null, "Audi", "Q3", "2023", "MNB313", "Gris", users.get(4), new Date()),
                new Car(null, "Mercedes", "GLA", "2022", "POI414", "Negro", users.get(5), new Date()),
                new Car(null, "Jeep", "Renegade", "2021", "LKJ515", "Verde", users.get(6), new Date()),
                new Car(null, "Honda", "HR-V", "2020", "GHJ616", "Rojo", users.get(7), new Date()),
                new Car(null, "Fiat", "Pulse", "2023", "TRE717", "Azul", users.get(0), new Date()),
                new Car(null, "Citroën", "C4 Cactus", "2022", "YUI818", "Plata", users.get(1), new Date()),
                new Car(null, "Suzuki", "Vitara", "2021", "ASD919", "Naranja", users.get(2), new Date()),
                new Car(null, "Mitsubishi", "Outlander", "2020", "FGH020", "Blanco", users.get(3), new Date()),
                new Car(null, "Chery", "Tiggo 7 Pro", "2023", "VBN121", "Gris", users.get(4), new Date()),
                new Car(null, "BYD", "Song Plus", "2022", "MLO222", "Rojo", users.get(5), new Date()),
                new Car(null, "JAC", "JS4", "2021", "KIM323", "Verde", users.get(6), new Date()),
                new Car(null, "Dodge", "Journey", "2020", "WER424", "Negro", users.get(7), new Date()),
                new Car(null, "Tesla", "Model 3", "2023", "TES525", "Blanco", users.get(0), new Date()),
                new Car(null, "Volvo", "XC40", "2022", "VOL626", "Azul", users.get(1), new Date()),
                new Car(null, "MG", "ZS", "2021", "MGG727", "Gris", users.get(2), new Date()),
                new Car(null, "Geely", "Coolray", "2020", "GEE828", "Rojo", users.get(3), new Date()),
                new Car(null, "Seat", "Arona", "2023", "SEA929", "Naranja", users.get(4), new Date()),
                new Car(null, "Alfa Romeo", "Tonale", "2022", "ALF030", "Vino", users.get(5), new Date())
        );

        carRepository.saveAll(cars);

        System.out.println("✅ Datos iniciales cargados: " + users.size() + " usuarios, " + cars.size() + " autos.");
    }
}
