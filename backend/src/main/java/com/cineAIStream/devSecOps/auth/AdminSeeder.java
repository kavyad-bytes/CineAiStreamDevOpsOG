package com.cineAIStream.devSecOps.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AdminSeeder implements CommandLineRunner {

    private final AppUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {

        String adminEmail = "admin@cineai.com";

        if (userRepository.existsByEmail(adminEmail)) {
            return;
        }

        AppUser admin = AppUser.builder()
                .email(adminEmail)
                .password(passwordEncoder.encode("admin123"))
                .role(Role.ADMIN)
                .build();

        userRepository.save(admin);

        System.out.println("✅ Admin user created:");
        System.out.println("Email: admin@cineai.com");
        System.out.println("Password: admin123");
    }
}