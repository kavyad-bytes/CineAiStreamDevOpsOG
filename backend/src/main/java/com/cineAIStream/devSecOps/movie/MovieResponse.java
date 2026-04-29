package com.cineAIStream.devSecOps.movie;

import java.time.LocalDateTime;

public record MovieResponse(
        Long id,
        String title,
        String genre,
        String description,
        String summary,
        String posterUrl,
        LocalDateTime uploadedAt
) {}