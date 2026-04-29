package com.cineAIStream.devSecOps.movie;

public record MovieRequest(
        String title,
        String genre,
        String description,
        String summary,
        String posterUrl
) {}