package com.cineAIStream.devSecOps.movie;

import com.cineAIStream.devSecOps.storage.MinioService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MovieService {

    private final MovieRepository movieRepository;
    private final MinioService minioService;

    public List<MovieResponse> getAllMovies() {
        return movieRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public List<MovieResponse> searchMovies(String query) {
        return movieRepository
                .findByTitleContainingIgnoreCaseOrGenreContainingIgnoreCase(query, query)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public MovieResponse uploadMovie(
            MovieRequest request,
            MultipartFile file
    ) {
        String minioKey = minioService.uploadFile(file);

        Movie movie = Movie.builder()
                .title(request.title())
                .genre(request.genre())
                .description(request.description())
                .summary(request.summary())
                .posterUrl(request.posterUrl())
                .minioKey(minioKey)
                .uploadedAt(LocalDateTime.now())
                .build();

        Movie savedMovie = movieRepository.save(movie);

        return toResponse(savedMovie);
    }

    public Movie getMovieById(Long id) {
        return movieRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Movie not found"));
    }

    private MovieResponse toResponse(Movie movie) {
        return new MovieResponse(
                movie.getId(),
                movie.getTitle(),
                movie.getGenre(),
                movie.getDescription(),
                movie.getSummary(),
                movie.getPosterUrl(),
                movie.getUploadedAt()
        );
    }
}