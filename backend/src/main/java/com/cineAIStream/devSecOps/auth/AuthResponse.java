package com.cineAIStream.devSecOps.auth;

public record AuthResponse(
        String token,
        String email,
        Role role
) {}