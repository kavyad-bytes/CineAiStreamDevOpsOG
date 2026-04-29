import { useEffect, useState } from "react";
import api from "../api/api";
import MovieCard from "../components/MovieCard";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");

  const loadMovies = async () => {
    const res = await api.get("/movies");
    setMovies(res.data);
  };

  const searchMovies = async (value) => {
    setQuery(value);

    if (!value.trim()) {
      loadMovies();
      return;
    }

    const res = await api.get(`/movies/search?q=${encodeURIComponent(value)}`);
    setMovies(res.data);
  };

  useEffect(() => {
    loadMovies();
  }, []);

  const heroMovie = movies[0];

  return (
    <main className="min-h-screen bg-black text-white">
      {heroMovie && (
        <section className="relative h-[70vh]">
          <img
            src={heroMovie.posterUrl}
            alt={heroMovie.title}
            className="h-full w-full object-cover opacity-40"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

          <div className="absolute bottom-20 left-8 max-w-2xl">
            <h1 className="mb-4 text-5xl font-black">{heroMovie.title}</h1>
            <p className="mb-6 text-lg text-zinc-200">
              {heroMovie.summary || heroMovie.description}
            </p>

            <a
              href={`/watch/${heroMovie.id}`}
              className="rounded bg-white px-6 py-3 font-bold text-black hover:bg-zinc-300"
            >
              ▶ Play
            </a>
          </div>
        </section>
      )}

      <section className="px-8 pb-12 pt-24">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h2 className="text-2xl font-bold">Popular Movies</h2>

          <input
            value={query}
            onChange={(e) => searchMovies(e.target.value)}
            placeholder="Search movies..."
            className="w-full rounded bg-zinc-900 px-4 py-3 text-white outline-none ring-1 ring-zinc-700 focus:ring-red-600 md:w-80"
          />
        </div>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
    </main>
  );
}