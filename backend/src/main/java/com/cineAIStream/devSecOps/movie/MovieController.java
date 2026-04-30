package com.cineAIStream.devSecOps.movie;

import com.cineAIStream.devSecOps.storage.MinioService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/movies")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class MovieController {

    private final MovieService movieService;
    private final MinioService minioService;

    @GetMapping
    public ResponseEntity<?> getAllMovies() {
        return ResponseEntity.ok(movieService.getAllMovies());
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchMovies(@RequestParam String q) {
        return ResponseEntity.ok(movieService.searchMovies(q));
    }

    //upload
    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<MovieResponse> uploadMovie(
            @RequestPart("movie") MovieRequest request,
            @RequestPart("file") MultipartFile file
    ) {
        return ResponseEntity.ok(movieService.uploadMovie(request, file));
    }

    //Steam video
    @GetMapping("/stream/{id}")
    public ResponseEntity<InputStreamResource> streamMovie(@PathVariable Long id) {
        Movie movie = movieService.getMovieById(id);

        InputStreamResource resource =
                new InputStreamResource(minioService.getFile(movie.getMinioKey()));

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline")
                .body(resource);
    }
}